'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
  File as FileIcon,
  Check,
  FolderOpen,
} from 'lucide-react';
import { useExamAce } from '@/lib/store/examAceStore';
import { useToast } from '@/components/toast/ToastContext';
import { Material } from '@/lib/types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubjectId?: string;
}

export function DocumentUploadModal({
  isOpen,
  onClose,
  defaultSubjectId,
}: DocumentUploadModalProps) {
  const { subjects, addMaterial } = useExamAce();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedSubjectId, setSelectedSubjectId] = useState(
    defaultSubjectId || subjects[0]?.id || 'dsa'
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Keep the uploader subject synchronized with the Ask page. Without this,
  // React preserves the previous modal state and a new DSA upload could
  // accidentally be tagged as DBMS/OS/etc.
  useEffect(() => {
    if (isOpen && defaultSubjectId) {
      setSelectedSubjectId(defaultSubjectId);
    }
  }, [isOpen, defaultSubjectId]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    setSelectedFile(file);
    if (!docTitle) {
      setDocTitle(file.name);
    }
    // If it's a text file, read content
    if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomText(event.target.result as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sampleTitle: string, sampleContent: string) => {
    setDocTitle(sampleTitle);
    setCustomText(sampleContent);
    setSelectedFile(new File([sampleContent], sampleTitle, { type: 'application/pdf' }));
    toast.info('Sample Selected', `Loaded "${sampleTitle}".`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.warning('Document Required', 'Please select a PDF, DOCX, TXT, or Markdown file.');
      return;
    }
    if (!docTitle.trim()) {
      toast.warning('Document Title Required', 'Please enter a title for the document.');
      return;
    }

    const targetSub = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
    if (!targetSub) {
      toast.error('Subject Required', 'Please select an academic subject.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStage('Uploading the selected document...');

    try {
      // Sample buttons use an in-memory text file. Keep those samples lightweight,
      // but all real user files are extracted by the server so PDF bytes are actually read.
      const isSample = selectedFile.name.startsWith('MIT 6.006') ||
        selectedFile.name.startsWith('Silberschatz') ||
        selectedFile.name.startsWith('Navathe') ||
        selectedFile.name.startsWith('Tanenbaum');

      if (isSample && customText) {
        setUploadProgress(55);
        setUploadStage('Indexing sample academic text...');

        const materialId = `mat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        const words = customText.split(/\s+/).filter(Boolean);
        const chunks = [];
        for (let i = 0; i < words.length; i += 280) {
          chunks.push({
            id: `${materialId}_chunk_${chunks.length}`,
            materialId,
            chunkIndex: chunks.length,
            content: words.slice(Math.max(0, i - 40), i + 280).join(' '),
            keywords: [targetSub.name, ...customText.split(/\W+/).filter((w) => w.length > 5).slice(0, 10)],
            tokenCount: Math.min(320, words.length - Math.max(0, i - 40)),
          });
        }

        const material: Material = {
          id: materialId,
          subjectId: targetSub.id,
          subjectName: targetSub.name,
          title: docTitle,
          fileType: 'PDF',
          uploadDate: new Date().toISOString().split('T')[0],
          fileSizeBytes: selectedFile.size,
          chunksCount: chunks.length,
          status: 'ready',
          summary: `Sample academic material indexed into ${chunks.length} grounded chunks.`,
          sourceFileName: selectedFile.name,
          chunks,
        };

        addMaterial(material);
      } else {
        setUploadProgress(25);
        setUploadStage('Extracting text from the uploaded document...');

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('subjectId', targetSub.id);
        formData.append('subjectName', targetSub.name);
        formData.append('title', docTitle.trim());

        const response = await fetch('/api/materials', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Document extraction failed.');
        }

        setUploadProgress(70);
        setUploadStage(`Indexed ${data.material.chunksCount} document chunks...`);

        addMaterial(data.material as Material);
      }

      setUploadProgress(100);
      setUploadStage('Document is ready for grounded answers.');
      toast.success(
        'Document Indexed Successfully!',
        `"${docTitle}" is now the active source for ${targetSub.name} answers.`
      );

      // Reset transient form state before closing so the next upload is a clean document.
      setSelectedFile(null);
      setCustomText('');
      setDocTitle('');
      onClose();
    } catch (error: any) {
      console.error('Upload/indexing error:', error);
      toast.error('Document Indexing Failed', error?.message || 'Could not extract the uploaded document.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-5 text-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Upload &amp; Index Study Material
              </h3>
              <p className="text-xs text-slate-400">
                Ground ExamAce in your university syllabus, textbooks, or class notes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isUploading}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Academic Course
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>

          {/* Drag and drop zone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select File from Computer (PDF, DOCX, TXT, Notes)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.md,.notes"
              className="hidden"
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-indigo-400 bg-indigo-500/10'
                  : selectedFile
                  ? 'border-emerald-500/50 bg-emerald-950/20'
                  : 'border-slate-700 bg-slate-950/60 hover:border-slate-600 hover:bg-slate-950'
              }`}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FileIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-white block">{selectedFile.name}</span>
                    <span className="text-[11px] text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for extraction
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Click to Browse or Drag &amp; Drop Document Here
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Supports PDF, DOCX, TXT, and Markdown (up to 25MB)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Document Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Material Display Title
            </label>
            <input
              type="text"
              required
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Unit 3 Dynamic Programming Handout.pdf"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Quick Academic Samples for Testing */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Or Load Verified Academic Samples (1-Click):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('dsa');
                  handleSelectSample(
                    'MIT 6.006 DP & Memoization Master Class.pdf',
                    'Dynamic Programming breaks optimization problems into overlapping subproblems with optimal substructure. Standard marking criteria requires formal state definition, recurrence formula, base cases, and asymptotic complexity analysis.'
                  );
                }}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-left text-[11px] text-slate-300 hover:border-indigo-500/50 hover:text-white transition-colors"
              >
                <div className="font-semibold text-white">📄 MIT 6.006 DP Handout.pdf</div>
                <div className="text-[10px] text-slate-400">Data Structures &amp; Algorithms</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('os');
                  handleSelectSample(
                    'Silberschatz OS Chapter 6 Synchronization.pdf',
                    'The critical section problem requires mutual exclusion, progress, and bounded waiting. Peterson algorithm uses flag and turn variables. Semaphores provide wait() and signal() atomic primitives.'
                  );
                }}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-left text-[11px] text-slate-300 hover:border-indigo-500/50 hover:text-white transition-colors"
              >
                <div className="font-semibold text-white">📄 Silberschatz OS Ch6.pdf</div>
                <div className="text-[10px] text-slate-400">Operating Systems</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('dbms');
                  handleSelectSample(
                    'Navathe DBMS Normalization & BCNF.pdf',
                    'A relational schema R is in Boyce-Codd Normal Form (BCNF) if for every non-trivial functional dependency X -> Y, X is a superkey of R. Eliminates redundancy and anomaly.'
                  );
                }}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-left text-[11px] text-slate-300 hover:border-indigo-500/50 hover:text-white transition-colors"
              >
                <div className="font-semibold text-white">📄 Navathe DBMS Normalization.pdf</div>
                <div className="text-[10px] text-slate-400">Database Management</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedSubjectId('cn');
                  handleSelectSample(
                    'Tanenbaum Computer Networks TCP Congestion.pdf',
                    'TCP congestion control incorporates Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery. Window size cwnd doubles every RTT during exponential slow start.'
                  );
                }}
                className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-left text-[11px] text-slate-300 hover:border-indigo-500/50 hover:text-white transition-colors"
              >
                <div className="font-semibold text-white">📄 Tanenbaum TCP Congestion.pdf</div>
                <div className="text-[10px] text-slate-400">Computer Networks</div>
              </button>
            </div>
          </div>

          {/* Progress Indicator when uploading */}
          {isUploading && (
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-indigo-300 flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  {uploadStage}
                </span>
                <span className="text-white font-mono">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || !docTitle.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isUploading ? 'Indexing Vector Chunks...' : 'Upload & Index Material'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
