import React, { useState, useMemo } from 'react';
import { DocumentItem, EducationalStage } from '../types/education';
import { Search, FileText, Download, Eye, Calendar, Sparkles, Filter, Lock } from 'lucide-react';

interface PublicRepositoryProps {
  documents: DocumentItem[];
  onSelectDocument: (doc: DocumentItem) => void;
  onOpenTeacherArea: () => void;
}

export const PublicRepository: React.FC<PublicRepositoryProps> = ({
  documents,
  onSelectDocument,
  onOpenTeacherArea,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<EducationalStage | 'all'>('all');

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // Include all public docs, and if it's restricted, show it with a locked indicator or note
      const matchesSearch = 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doc.component && doc.component.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'all' || doc.category === selectedCategory;

      const matchesStage = 
        selectedStage === 'all' || doc.stage === selectedStage || doc.stage === 'Todos';

      return matchesSearch && matchesCategory && matchesStage;
    });
  }, [documents, searchQuery, selectedCategory, selectedStage]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
          Acervo Digital Oficial · Secretaria Municipal de Educação
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Central de Pesquisa e Documentos Educacionais
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Repositório unificado para consulta de normas, resoluções do Conselho Municipal de Educação (CME), editais públicos, diretrizes curriculares e projetos da rede de ensino de Bombinhas - SC.
        </p>
      </div>

      {/* Teacher Restrict Banner notification */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-amber-950">
              É professor ou coordenador pedagógico da Rede de Bombinhas?
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Modelos de planejamento anual, sequências didáticas e normativas específicas do magistério estão disponíveis no Espaço Restrito do Professor.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenTeacherArea}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shrink-0 shadow-xs"
        >
          <span>Acessar Espaço do Professor</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por assunto, palavra-chave, código de resolução, edital ou lei..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap">Etapa:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value as any)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            >
              <option value="all">Todas as Etapas</option>
              <option value="Todos">Diretrizes Gerais</option>
              <option value="Educação Infantil">Educação Infantil</option>
              <option value="Anos Iniciais (1º ao 5º)">Anos Iniciais (1º ao 5º)</option>
              <option value="Anos Finais (6º ao 9º)">Anos Finais (6º ao 9º)</option>
              <option value="Educação Especial / AEE">Educação Especial / AEE</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 mr-2 text-[11px] font-semibold uppercase tracking-wider">
            Tipo de Documento:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Todos os Documentos
          </button>
          <button
            onClick={() => setSelectedCategory('Calendário Escolar')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Calendário Escolar'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Calendários
          </button>
          <button
            onClick={() => setSelectedCategory('Normativa Específica')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Normativa Específica'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Normativas & Regimento
          </button>
          <button
            onClick={() => setSelectedCategory('Edital / Publicação Oficial')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Edital / Publicação Oficial'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Editais & Processos Seletivos
          </button>
          <button
            onClick={() => setSelectedCategory('Projeto Institucional')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Projeto Institucional'
                ? 'bg-emerald-800 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Projetos Pedagógicos
          </button>
        </div>
      </div>

      {/* Document Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>{filteredDocs.length} documentos disponíveis para consulta</span>
          <span>Formato oficial da SME Bombinhas</span>
        </div>

        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-600/70 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-medium text-emerald-800">{doc.code}</span>
                <span aria-hidden="true">·</span>
                <span>{doc.category}</span>
                <span aria-hidden="true">·</span>
                <span>Ano {doc.year}</span>
                {doc.isRestricted && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 font-medium">Acesso Restrito ao Professor</span>
                  </>
                )}
              </div>

              <h3 
                onClick={() => onSelectDocument(doc)}
                className="text-base font-bold text-slate-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
              >
                {doc.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {doc.summary}
              </p>

              <div className="text-[11px] text-slate-400 pt-1">
                Publicado em: {doc.publishedAt} · Autor: {doc.author}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => onSelectDocument(doc)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Visualizar</span>
              </button>

              <button
                onClick={() => onSelectDocument(doc)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
