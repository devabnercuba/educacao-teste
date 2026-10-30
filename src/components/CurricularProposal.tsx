import React from 'react';
import { EDUCATIONAL_PROJECTS } from '../data/portalData';
import { BookOpen, Compass, Waves, Anchor, Sparkles, Check, ArrowRight } from 'lucide-react';

interface CurricularProposalProps {
  onOpenTeacherArea: () => void;
  onOpenRepository: () => void;
}

export const CurricularProposal: React.FC<CurricularProposalProps> = ({
  onOpenTeacherArea,
  onOpenRepository,
}) => {
  return (
    <div className="space-y-10">
      {/* Intro Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
          Diretrizes Pedagógicas · Sistema Municipal de Ensino de Bombinhas
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Proposta Curricular e Territorialidade
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          A Proposta Pedagógica da Rede Municipal de Ensino de Bombinhas harmoniza a Base Nacional Comum Curricular (BNCC) e o Currículo Base do Território Catarinense (CBTC) com a vocação ecológica costeira e a herança sociocultural de nossa península.
        </p>
      </div>

      {/* 3 Core Curricular Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            BNCC & Currículo Catarinense
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Garantia dos direitos de aprendizagem e competências gerais fundamentais para todas as etapas: Educação Infantil (Campos de Experiências) e Ensino Fundamental (Áreas do Conhecimento).
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center">
            <Waves className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Território Costeiro & Ambiental
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            As 39 praias de Bombinhas, os costões rochosos e a proximidade com a Reserva Biológica Marinha do Arvoredo são incorporados como espaços vivos de pesquisa científica e ambiental.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
            <Anchor className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Cultura Açoriana & Caiçara
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Valorização da tradição da pesca artesanal da tainha, folclore açoriano (Boi de Mamão, Terno de Reis), história oral dos mestres locais e fortalecimento da identidade comunitária.
          </p>
        </div>
      </div>

      {/* Educational Projects Showcase */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Projetos Pedagógicos Integradores
            </h2>
            <p className="text-xs text-slate-500">
              Programas em desenvolvimento contínuo em todas as escolas e CEIs municipais
            </p>
          </div>

          <button
            onClick={onOpenTeacherArea}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver roteiros de planejamento pedagógico</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EDUCATIONAL_PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {idx === 0 && (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/projeto_marinho_bombinhas_1793318175184.jpg"
                    alt="Projeto Educar para o Mar em Bombinhas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Educação Científica e Costeira
                    </span>
                  </div>
                </div>
              )}

              {idx === 2 && (
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src="/src/assets/images/escolas_rede_bombinhas_1793318174717.jpg"
                    alt="Programa Bombinhas Alfabetiza"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Alfabetização na Idade Certa
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 space-y-4 flex-1">
                <div>
                  <span className="text-xs font-mono font-medium text-emerald-700">
                    {proj.targetAudience}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {proj.subtitle}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-slate-900 block">
                    Objetivos Específicos:
                  </span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {proj.objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
                Coordenação: <strong className="text-slate-700">{proj.coordinator}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
