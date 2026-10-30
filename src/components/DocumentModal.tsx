import React, { useState } from 'react';
import { DocumentItem } from '../types/education';
import { X, Download, Copy, Check, FileText, ShieldAlert, BookOpen, Printer } from 'lucide-react';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!document) return null;

  const handleCopy = () => {
    const textToCopy = `
${document.content.officialHeader}
DOCUMENTO: ${document.code} - ${document.title}
EMENTA: ${document.content.ementa}

${document.content.chapters.map(c => `${c.title}\n${c.body.join('\n')}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Create a virtual download blob
    const content = `MUNICÍPIO DE BOMBINHAS - SECRETARIA DE EDUCAÇÃO\nDocumento: ${document.code}\nTítulo: ${document.title}\nData: ${document.publishedAt}\n\nEMENTA:\n${document.content.ementa}\n\nCONTEÚDO:\n${document.content.chapters.map(c => `\n${c.title}\n${c.body.join('\n')}`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.code}_BombinhasEduca.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl my-8 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top bar with official classification */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium tracking-wider text-emerald-400 uppercase">
              {document.code}
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-xs text-slate-300">
              {document.category}
            </span>
            {document.isRestricted && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                <ShieldAlert className="w-3 h-3" />
                Acesso Restrito ao Magistério
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
            aria-label="Fechar visualizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Content formatted as official municipal document */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 bg-slate-50/50">
          {/* Official Letterhead */}
          <div className="text-center pb-5 border-b border-slate-200 space-y-1">
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Estado de Santa Catarina · Município de Bombinhas
            </div>
            <div className="text-xs font-semibold text-slate-700 tracking-wider uppercase">
              Secretaria Municipal de Educação · Sistema Municipal de Ensino
            </div>
            <div className="text-[11px] text-slate-500">
              Portal Oficial de Consulta & Pesquisa Pedagógica
            </div>
          </div>

          {/* Title and metadata */}
          <div className="space-y-2">
            <h2 id="modal-title" className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {document.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
              <span>Etapa: <strong className="text-slate-800 font-medium">{document.stage}</strong></span>
              <span>·</span>
              <span>Ano: <strong className="text-slate-800 font-medium">{document.year}</strong></span>
              <span>·</span>
              <span>Publicado: <strong className="text-slate-800 font-medium">{document.publishedAt}</strong></span>
              <span>·</span>
              <span>Formato: <strong className="text-slate-800 font-medium">{document.format} ({document.fileSize})</strong></span>
            </div>
          </div>

          {/* Ementa Box (Legal & Administrative citation style) */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-4 text-xs md:text-sm text-slate-800 font-editorial italic leading-relaxed">
            <span className="font-sans not-italic font-bold text-amber-900 uppercase text-[11px] tracking-wider block mb-1">
              Ementa Oficial:
            </span>
            "{document.content.ementa}"
          </div>

          {/* Chapters and Articles */}
          <div className="space-y-6 pt-2">
            {document.content.chapters.map((chapter, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  {chapter.title}
                </h3>
                <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                  {chapter.body.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Guidelines for Teachers if available */}
          {document.content.practicalGuidelines && document.content.practicalGuidelines.length > 0 && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-5 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Orientações Práticas para o Docente
              </h4>
              <ul className="text-xs md:text-sm text-emerald-950 space-y-1.5 list-disc list-inside">
                {document.content.practicalGuidelines.map((guide, gIdx) => (
                  <li key={gIdx} className="leading-relaxed">{guide}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Annexes / Templates Included */}
          {document.content.templatesIncluded && document.content.templatesIncluded.length > 0 && (
            <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <span className="font-semibold text-slate-900 block">Modelos / Anexos Vinculados:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {document.content.templatesIncluded.map((t, tIdx) => (
                  <li key={tIdx}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <span>Expedido por: <strong>{document.author}</strong></span>
            <span>Vigência: Ano Letivo 2026 · Bombinhas/SC</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-white border-t border-slate-200 shrink-0">
          <div className="text-xs text-slate-500">
            Documento disponível para consulta e pesquisa pedagógica.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Arquivo Salvo!' : `Baixar (${document.format})`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
