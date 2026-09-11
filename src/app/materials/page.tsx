'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FolderOpen,
  UploadCloud,
  FileText,
  Search,
  CheckCircle2,
  Trash2,
  Sparkles,
  Layers,
  ArrowRight,
  File,
  Eye,
  Database,
  Cpu,
  Zap,
  Info,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { DocumentUploadModal } from '@/components/materials/DocumentUploadModal';
import { Material, MaterialChunk } from '@/lib/types';

function MaterialsContent() {
  const searchParams = useSearchParams();
  const { materials, subjects, addMaterial, deleteMaterial } = useExamAce();
  const toast = useToast();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || 'dsa');
  const [docTitle, setDocTitle] = useState('');
  const [fileType, setFileType] = useState<'PDF' | 'DOCX' | 'TXT' | 'NOTES'>('PDF');
  const [notesContent, setNotesContent] = useState('');
  const [selectedLocalFile, setSelectedLocalFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Dynamic Programming');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [inspectingMaterial, setInspectingMaterial] = useState<Material | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if ?upload=true is passed in URL
  useEffect(() => {
    if (searchParams.get('upload') === 'true') {
      setIsUploadModalOpen(true);
    }
  }, [searchParams]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedLocalFile(file);
      if (!docTitle) {
        setDocTitle(file.name);
      }
      const ext = file.name.split('.').pop()?.toUpperCase();
      if (ext === 'PDF' || ext === 'DOCX' || ext === 'TXT') {
        setFileType(ext as any);
      }
      if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setNotesContent(event.target.result as string);
          }
        };
        reader.readAsText(file);
      }
      toast.info('File Attached', `Selected "${file.name}" (${(file.size / 1024).toFixed(1)} KB).`);
    }
  };

  const handleQuickUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      toast.warning('Title Required', 'Please enter a title for the academic material.');
      return;
    }

    setIsProcessing(true);
    toast.processing('Indexing Document', 'Extracting text, cleaning, generating chunks, and computing embeddings...');

    setTimeout(() => {
      const targetSub = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
      const newMaterial: Material = {
        id: `mat_${Date.now()}`,
        subjectId: targetSub.id,
        subjectName: targetSub.name,
        title: docTitle,
        fileType,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSizeBytes: selectedLocalFile?.size || 2450000,
        chunksCount: 16,
        status: 'indexed',
        summary: `Extracted syllabus guide and university lecture notes for ${targetSub.name}. Indexed into 16 semantic vector chunks.`,
        chunks: [
          {
            id: `chk_${Date.now()}_1`,
            materialId: `mat_${Date.now()}`,
            chunkIndex: 0,
            content:
              notesContent ||
              `Core Principles & Examiner Criteria for ${docTitle}. Includes Bellman optimality, algorithmic recurrence formulations, and state transition equations.`,
            keywords: ['Optimal Substructure', 'Recurrence Relation', 'Examiner Guidelines'],
            tokenCount: 78,
          },
          {
            id: `chk_${Date.now()}_2`,
            materialId: `mat_${Date.now()}`,
            chunkIndex: 1,
            content:
              'University Marking Scheme Note: Answers for theoretical algorithmic questions must include the formal mathematical state definition, recurrence relation, and Big-O asymptotic complexity to earn full marks.',
            keywords: ['Marking Scheme', 'State Definition', 'Recurrence Relation', 'Complexity'],
            tokenCount: 84,
          },
        ],
      };

      addMaterial(newMaterial);
      setIsProcessing(false);
      setDocTitle('');
      setNotesContent('');
      setSelectedLocalFile(null);
      toast.success(
        'Document Indexed Successfully!',
        `"${newMaterial.title}" is now active in your RAG Vector Store.`
      );
    }, 1500);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      deleteMaterial(deleteTargetId);
      toast.info('Material Removed', 'Document and its vector embeddings deleted.');
      setDeleteTargetId(null);
    }
  };

  // Simulated Semantic Search Retrieval
  const allChunks = materials.flatMap((m) =>
    m.chunks.map((c) => ({ ...c, materialTitle: m.title, subjectName: m.subjectName }))
  );

  const matchedChunks = searchQuery.trim()
    ? allChunks.filter(
        (c) =>
          c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allChunks.slice(0, 3);

  const totalChunks = materials.reduce((acc, m) => acc + m.chunksCount, 0);
  const totalBytes = materials.reduce((acc, m) => acc + m.fileSizeBytes, 0);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header with Upload CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <FolderOpen className="h-7 w-7 text-indigo-400" />
                Academic Materials &amp; Document Upload
              </h1>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/30">
                RAG Vector Engine
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
              Upload your college syllabi, lecture notes, textbook chapters (.pdf, .docx, .txt). ExamAce extracts text, segments into 512-token semantic chunks, and grounds all generated answers directly in your class material.
            </p>
          </div>

          {/* Primary Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-5 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:from-indigo-500 hover:to-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document (PDF / DOCX)</span>
          </button>
        </div>

        {/* Vector Engine Performance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Indexed Documents</span>
              <FileText className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">{materials.length}</div>
            <span className="text-[11px] text-emerald-400 font-medium">Ready for RAG inference</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Vector Chunks</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">{totalChunks}</div>
            <span className="text-[11px] text-slate-400">512-token semantic segments</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Embedding Model</span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2 text-base font-bold text-white font-mono">1536-dim Vector</div>
            <span className="text-[11px] text-purple-300 font-medium">Cosine similarity top-k</span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Knowledge Storage</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-white">
              {(totalBytes / (1024 * 1024)).toFixed(1)} MB
            </div>
            <span className="text-[11px] text-amber-300 font-medium">Classroom Grounding Active</span>
          </div>
        </div>

        {/* Upload Form & RAG Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Interactive Quick Upload Form */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-indigo-400" />
                Upload New Document
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Launch Full Uploader →
              </button>
            </div>

            <form onSubmit={handleQuickUpload} className="space-y-4">
              {/* Subject course */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Academic Subject
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Native file picker / dropzone trigger */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Attach Document File (.pdf, .docx, .txt)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.docx,.txt,.md,.notes"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-950/60 p-4 text-center transition-all hover:bg-slate-950 group cursor-pointer"
                >
                  {selectedLocalFile ? (
                    <div className="flex items-center justify-center gap-2.5 text-emerald-400">
                      <File className="w-4 h-4" />
                      <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                        {selectedLocalFile.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({(selectedLocalFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <UploadCloud className="w-6 h-6 text-indigo-400 mx-auto group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-semibold text-slate-300">
                        Click to select PDF or Document
                      </div>
                      <div className="text-[10px] text-slate-500">Supports PDF, DOCX, TXT up to 25MB</div>
                    </div>
                  )}
                </button>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. MIT 6.006 Dynamic Programming Handout.pdf"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* File format pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Document Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['PDF', 'DOCX', 'TXT', 'NOTES'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setFileType(fmt)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        fileType === fmt
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text notes content */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Or Paste Text / Class Notes Content
                </label>
                <textarea
                  value={notesContent}
                  onChange={(e) => setNotesContent(e.target.value)}
                  placeholder="Paste textbook definitions, proofs, or syllabus guidelines here..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isProcessing || !docTitle.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing Chunks...' : 'Chunk & Index Material'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Open Full Drag & Drop Uploader"
                >
                  <UploadCloud className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Semantic Query Simulator & Indexed Materials */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vector Semantic Search Simulator */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <Search className="w-4 h-4 text-cyan-400" />
                    RAG Vector Semantic Search Inspector
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Test how ExamAce retrieves relevant textbook chunks before generating answers.
                  </p>
                </div>
                <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                  Cosine Similarity
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search semantic embeddings (e.g. Optimal Substructure, Paging, BCNF)..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              {/* Retrieved Chunks Preview */}
              <div className="mt-4 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Retrieved Grounded Chunks ({matchedChunks.length}):
                </span>
                {matchedChunks.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3">No matching semantic vectors found for query.</p>
                ) : (
                  matchedChunks.map((chunk, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs text-slate-300 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                        <span className="font-semibold">{chunk.materialTitle}</span>
                        <span>Chunk #{chunk.chunkIndex + 1} • {chunk.tokenCount} tokens</span>
                      </div>
                      <p className="leading-relaxed text-slate-200">{chunk.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {chunk.keywords.map((kw, kIdx) => (
                          <span
                            key={kIdx}
                            className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-slate-400 border border-slate-800"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Existing Materials Library */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Indexed Materials Library ({materials.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    All classroom documents currently grounded in the RAG knowledge base.
                  </p>
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>+ Upload Material</span>
                </button>
              </div>

              <div className="space-y-3">
                {materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-slate-700">
                            {mat.fileType}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">{mat.subjectName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {(mat.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">{mat.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{mat.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setInspectingMaterial(mat)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Inspect Chunks</span>
                      </button>

                      <button
                        onClick={() => setDeleteTargetId(mat.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        aria-label="Delete Material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Document Upload Modal */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          defaultSubjectId={selectedSubjectId}
        />

        {/* Modal: Inspect Chunks Modal */}
        {inspectingMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-4 text-slate-100 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {inspectingMaterial.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {inspectingMaterial.chunksCount} Semantic Chunks • {inspectingMaterial.subjectName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInspectingMaterial(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Indexed Vector Chunks &amp; Keywords:
                </span>
                {inspectingMaterial.chunks.map((chunk, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-xs text-slate-300 space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                      <span>Chunk #{chunk.chunkIndex + 1}</span>
                      <span>{chunk.tokenCount} Tokens • 1536-dim Embedding</span>
                    </div>
                    <p className="leading-relaxed text-slate-200">{chunk.content}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {chunk.keywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="rounded bg-slate-900 px-2 py-0.5 text-[10px] text-indigo-300 border border-slate-800"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setInspectingMaterial(null)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={Boolean(deleteTargetId)}
          onClose={() => setDeleteTargetId(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Study Material?"
          description="This will remove the document and purge all generated vector chunks from the RAG knowledge index."
          confirmLabel="Delete Material"
          cancelLabel="Cancel"
          variant="danger"
        />
      </div>
    </AppShell>
  );
}

export default function MaterialsPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="py-20 text-center text-xs text-slate-400">
            Loading Academic Materials &amp; Document Uploader...
          </div>
        </AppShell>
      }
    >
      <MaterialsContent />
    </Suspense>
  );
}
