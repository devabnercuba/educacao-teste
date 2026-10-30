import React, { useState, useMemo } from 'react';
import { TeacherUser, DocumentItem, EducationalStage } from '../types/education';
import { 
  FileText, Search, Download, Eye, Lock, 
  BookOpen, Sparkles, Filter, CheckCircle2, 
  HelpCircle, LogOut, ArrowRight, Bookmark,
  Calendar, Layers, ShieldCheck
} from 'lucide-react';

interface TeacherPedagogicalAreaProps {
  teacher: TeacherUser;
  documents: DocumentItem[];
  onSelectDocument: (doc: DocumentItem) => void;
  onLogout: () => void;
  onOpenCalendar: () => void;
}

export const TeacherPedagogicalArea: React.FC<TeacherPedagogicalAreaProps> = ({
  teacher,
  documents,
  onSelectDocument,
  onLogout,
  onOpenCalendar,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<EducationalStage | 'all'>('all');

  // Filter restricted documents only (and optionally public reference docs)
  const restrictedDocs = useMemo(() => {
    return documents.filter((doc) => doc.isRestricted);
  }, [documents]);

  // Filtered list based on search and category
  const filteredDocs = useMemo(() => {
    return restrictedDocs.filter((doc) => {
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
  }, [restrictedDocs, searchQuery, selectedCategory, selectedStage]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Teacher Authentication Top Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Ambiente Restrito do Magistério · SME Bombinhas</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Consulta e Pesquisa Pedagógica</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Espaço do Professor: Planejamentos & Normativas
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <span className="font-medium text-white">{teacher.name}</span>
              <span className="text-slate-600">·</span>
              <span>{teacher.school}</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-300 font-mono">{teacher.registrationNumber}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">{teacher.role}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenCalendar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prazos do Calendário</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-red-950/40 hover:text-red-300 rounded-lg transition-colors border border-slate-700/80"
              title="Encerrar sessão de consulta"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do Acesso Restrito</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual orientation card about the 3 core pedagogical pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => { setSelectedCategory('Planejamento Pedagógico'); setSelectedStage('all'); }}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            selectedCategory === 'Planejamento Pedagógico'
              ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Modelos 2026</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Planejamentos & Sequências
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Estruturas anuais e bimestrais padronizadas pela SME Bombinhas com códigos BNCC e habilidades regionais.
          </p>
        </div>

        <div 
          onClick={() => { setSelectedCategory('Normativa Específica'); setSelectedStage('all'); }}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            selectedCategory === 'Normativa Específica'
              ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Legislação SME</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Normativas do Magistério
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instruções normativas sobre diários de classe, cumprimento de 1/3 da hora-atividade e regimento escolar.
          </p>
        </div>

        <div 
          onClick={() => { setSelectedCategory('Critérios de Avaliação'); setSelectedStage('all'); }}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            selectedCategory === 'Critérios de Avaliação'
              ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-500 font-mono">Processual</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Avaliação & Recuperação
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Diretrizes do processo formativo contínuo e obrigatoriedade da recuperação paralela no decorrer do período.
          </p>
        </div>
      </div>

      {/* Search and Filters Strip */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por título, código (ex: IN-SME, MOD-PLAN), habilidade ou tema..."
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
              <option value="Educação Infantil">Educação Infantil</option>
              <option value="Anos Iniciais (1º ao 5º)">Anos Iniciais (1º ao 5º)</option>
              <option value="Anos Finais (6º ao 9º)">Anos Finais (6º ao 9º)</option>
              <option value="Educação Especial / AEE">Educação Especial / AEE</option>
            </select>
          </div>
        </div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 mr-2 text-[11px] font-semibold uppercase tracking-wider">
            Categoria:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Todos ({restrictedDocs.length})
          </button>
          <button
            onClick={() => setSelectedCategory('Planejamento Pedagógico')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Planejamento Pedagógico'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Planejamento Pedagógico
          </button>
          <button
            onClick={() => setSelectedCategory('Normativa Específica')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Normativa Específica'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Normativas Específicas
          </button>
          <button
            onClick={() => setSelectedCategory('Critérios de Avaliação')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Critérios de Avaliação'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Avaliação & Recuperação
          </button>
          <button
            onClick={() => setSelectedCategory('Matriz Curricular')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedCategory === 'Matriz Curricular'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Matrizes & Habilidades
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Exibindo <strong className="text-slate-900">{filteredDocs.length}</strong> documento(s) para consulta do magistério
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Uso exclusivo pedagógico · Bombinhas/SC
        </span>
      </div>

      {/* Documents List / Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">Nenhum documento encontrado</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Não encontramos documentos com os filtros aplicados. Tente ajustar o termo de pesquisa ou selecionar "Todos".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStage('all'); }}
            className="px-4 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-emerald-500/80 transition-all hover:shadow-xs flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                {/* Unboxed clean metadata (Zero-Pill discipline) */}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-medium text-emerald-700">{doc.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{doc.format}</span>
                </div>

                <h3 
                  onClick={() => onSelectDocument(doc)}
                  className="text-base font-bold text-slate-900 group-hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
                >
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>

                {doc.component && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                    <span className="font-medium text-slate-700">Área/Componente:</span>
                    <span>{doc.component}</span>
                  </div>
                )}
              </div>

              {/* Card Footer with actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-500">
                  <span>Etapa: <strong className="text-slate-700">{doc.stage}</strong></span>
                  <span className="mx-1">·</span>
                  <span>{doc.fileSize}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 font-medium text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    title="Consultar teor completo do documento"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Consultar</span>
                  </button>

                  <button
                    onClick={() => onSelectDocument(doc)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 font-medium text-xs text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
                    title="Baixar modelo ou norma"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Normative Reference Quick Box for Teachers */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-700" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Orientações Centrais para o Magistério Municipal de Bombinhas
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Prazos de Entrega de Planejamento:</span>
            <p className="leading-relaxed text-slate-600">
              O plano bimestral de ensino deve ser submetido à Coordenação Pedagógica da sua unidade com no mínimo 10 dias de antecedência do início de cada bimestre letivo.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Recuperação Paralela Contínua:</span>
            <p className="leading-relaxed text-slate-600">
              Conforme a IN nº 02/2026, a recuperação deve ocorrer imediatamente após a constatação da defasagem no decorrer das aulas quinzenais, nunca restrita apenas ao término do bimestre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
