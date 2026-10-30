import React from 'react';
import { Search, Lock, BookOpen, Building2, Calendar, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenTeacherArea: () => void;
  onNavigate: (tab: 'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor') => void;
  onSearchFocus: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTeacherArea,
  onNavigate,
  onSearchFocus,
}) => {
  return (
    <div className="space-y-10">
      {/* Institutional Hero Banner with Generated Photography */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 min-h-[460px] flex items-center bg-slate-900">
        <img
          src="/src/assets/images/hero_bombinhas_educacao_1793318172540.jpg"
          alt="Centro Educacional Municipal de Bombinhas Santa Catarina"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* High contrast measured scrim as required by Section 1.F */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl p-6 sm:p-10 lg:p-12 space-y-6 text-white">
          <div className="space-y-2">
            <div className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              Prefeitura Municipal de Bombinhas · Secretaria de Educação
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Educação que Transforma Bombinhas
            </h1>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Portal oficial de informações educacionais, pesquisa documental e apoio pedagógico da península. Um ambiente estruturado para a comunidade escolar e com espaço exclusivo de consulta para os professores da rede municipal.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenTeacherArea}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Espaço Restrito do Professor</span>
            </button>

            <button
              onClick={() => onNavigate('pesquisa')}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all border border-white/20 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>Pesquisar Acervo & Editais</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
            <span>7 Unidades Educacionais</span>
            <span>·</span>
            <span>2.800+ Estudantes Atendidos</span>
            <span>·</span>
            <span>100% Alinhado à BNCC & CBTC</span>
          </div>
        </div>
      </div>

      {/* Fast Access Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Canais de Consulta Rápida
          </h2>
          <span className="text-xs text-slate-500">Acesso livre para consulta pública</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('professor')}
            className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 transition-all cursor-pointer shadow-xs group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 mb-1">
              Área do Professor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acesso restrito para consulta de planejamentos de aulas, matrizes de habilidades e normativas específicas do magistério.
            </p>
          </div>

          <div
            onClick={() => onNavigate('proposta')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 mb-1">
              Proposta Curricular
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diretrizes de ensino municipal integradas com projetos de ecologia marinha costeira e história açoriana.
            </p>
          </div>

          <div
            onClick={() => onNavigate('escolas')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 mb-1">
              Rede de Escolas & CEIs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Localização, contatos oficiais, turnos e corpo gestor das unidades escolares de Bombinhas.
            </p>
          </div>

          <div
            onClick={() => onNavigate('calendario')}
            className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center mb-3 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 mb-1">
              Calendário Escolar 2026
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Datas bimestrais oficiais, jornadas pedagógicas, recessos e conselhos de classe homologados.
            </p>
          </div>
        </div>
      </div>

      {/* Restrict Area Spotlight / Explanation for the user requirement */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Módulo de Consulta para Educadores da Rede</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Planejamentos e Normativas Específicas
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Como solicitado, o portal dispõe de um ambiente reservado aos professores para pesquisa direta: modelos anuais e bimestrais editáveis, diretrizes para elaboração de sequências didáticas, normas de avaliação contínua e regulamentação da hora-atividade.
          </p>
        </div>

        <button
          onClick={onOpenTeacherArea}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
        >
          <Lock className="w-4 h-4" />
          <span>Acessar Ambiente Restrito</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
