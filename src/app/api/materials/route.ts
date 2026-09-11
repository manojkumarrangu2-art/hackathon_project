import { NextRequest, NextResponse } from 'next/server';
import { initialMaterials } from '@/lib/store/initialSeedData';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const runtime = 'nodejs';

function normalizeText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[^\S\n]+\n/g, '\n')
    .trim();
}

function splitIntoChunks(text: string, materialId: string, targetWords = 360, overlapWords = 60) {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: Array<{
    id: string;
    materialId: string;
    chunkIndex: number;
    content: string;
    keywords: string[];
    tokenCount: number;
  }> = [];

  if (!words.length) return chunks;

  let start = 0;
  let index = 0;
  while (start < words.length) {
    const end = Math.min(words.length, start + targetWords);
    const content = words.slice(start, end).join(' ').trim();
    const keywordCandidates = content
      .toLowerCase()
      .replace(/[^a-z0-9+#.-]+/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 5);

    const freq = new Map<string, number>();
    for (const word of keywordCandidates) freq.set(word, (freq.get(word) || 0) + 1);
    const keywords = [...freq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([word]) => word);

    chunks.push({
      id: `${materialId}_chunk_${index}`,
      materialId,
      chunkIndex: index,
      content,
      keywords,
      tokenCount: words.slice(start, end).length,
    });

    if (end >= words.length) break;
    start = Math.max(start + 1, end - overlapWords);
    index += 1;
  }

  return chunks;
}

async function extractDocumentText(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    const parsed = await pdfParse(buffer);
    return { text: normalizeText(parsed.text || ''), pageCount: parsed.numpages || undefined };
  }

  if (name.endsWith('.docx') || file.type.includes('wordprocessingml')) {
    const parsed = await mammoth.extractRawText({ buffer });
    return { text: normalizeText(parsed.value || ''), pageCount: undefined };
  }

  const text = new TextDecoder().decode(buffer);
  return { text: normalizeText(text), pageCount: undefined };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const subjectId = String(form.get('subjectId') || '');
    const subjectName = String(form.get('subjectName') || '');
    const title = String(form.get('title') || '');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'A document file is required.' }, { status: 400 });
    }
    if (!subjectId || !subjectName || !title) {
      return NextResponse.json({ error: 'subjectId, subjectName and title are required.' }, { status: 400 });
    }
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'File exceeds the 25MB limit.' }, { status: 413 });
    }

    const { text, pageCount } = await extractDocumentText(file);

    if (!text || text.length < 40) {
      return NextResponse.json(
        { error: 'No readable academic text was found in this document. If it is a scanned/image-only PDF, OCR is required.' },
        { status: 422 }
      );
    }

    const materialId = `mat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const chunks = splitIntoChunks(text, materialId);

    const material = {
      id: materialId,
      subjectId,
      subjectName,
      title,
      fileType: (file.name.split('.').pop()?.toUpperCase() || 'PDF') as 'PDF' | 'DOCX' | 'TXT' | 'NOTES',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSizeBytes: file.size,
      chunksCount: chunks.length,
      status: 'ready' as const,
      summary: `Extracted ${text.split(/\s+/).filter(Boolean).length} words from ${file.name} and created ${chunks.length} grounded chunks.`,
      sourceFileName: file.name,
      pageCount,
      chunks,
    };

    return NextResponse.json({ success: true, material });
  } catch (error: any) {
    console.error('Document extraction failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to extract the uploaded document.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const subject = searchParams.get('subject');

  let filtered = initialMaterials;
  if (subject) {
    filtered = filtered.filter(
      (m) => m.subjectId === subject || m.subjectName.toLowerCase().includes(subject.toLowerCase())
    );
  }

  const allChunks = filtered.flatMap((m) =>
    m.chunks.map((c) => ({
      ...c,
      materialTitle: m.title,
      subjectName: m.subjectName,
    }))
  );

  const results = query.trim()
    ? allChunks.filter(
        (c) =>
          c.content.toLowerCase().includes(query.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : allChunks;

  return NextResponse.json({ success: true, count: results.length, results });
}
