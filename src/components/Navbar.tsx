import React from 'react';
import { Lock, UserCheck } from 'lucide-react';
import { TeacherUser } from '../types/education';

interface NavbarProps {
  currentTab: 'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor';
  onNavigate: (tab: 'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor') => void;
  activeTeacher: TeacherUser | null;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  activeTeacher,
  onOpenAuthModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-4">
        {/* Zone 1: Brand title, one line wordmark */}
        <button
          onClick={() => onNavigate('inicio')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
          <span>Bombinhas Educa</span>
        </button>

        {/* Zone 2: 4–5 single-line concise navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('inicio')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'inicio' ? 'text-emerald-800 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => onNavigate('proposta')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'proposta' ? 'text-emerald-800 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Proposta Curricular
          </button>

          <button
            onClick={() => onNavigate('escolas')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'escolas' ? 'text-emerald-800 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Rede de Ensino
          </button>

          <button
            onClick={() => onNavigate('calendario')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'calendario' ? 'text-emerald-800 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Calendário Escolar
          </button>

          <button
            onClick={() => onNavigate('pesquisa')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'pesquisa' ? 'text-emerald-800 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Pesquisa & Acervo
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeTeacher ? (
            <button
              onClick={() => onNavigate('professor')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'professor'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="truncate max-w-[130px] sm:max-w-none">{activeTeacher.name.split(' ')[0]} (Professor)</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Espaço do Professor</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav strip for smaller screens */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-3 text-xs font-medium text-slate-600 no-scrollbar">
        <button
          onClick={() => onNavigate('inicio')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'inicio' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''}`}
        >
          Início
        </button>
        <button
          onClick={() => onNavigate('proposta')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'proposta' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''}`}
        >
          Proposta Curricular
        </button>
        <button
          onClick={() => onNavigate('escolas')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'escolas' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''}`}
        >
          Rede de Ensino
        </button>
        <button
          onClick={() => onNavigate('calendario')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'calendario' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''}`}
        >
          Calendário
        </button>
        <button
          onClick={() => onNavigate('pesquisa')}
          className={`whitespace-nowrap shrink-0 py-1 ${currentTab === 'pesquisa' ? 'text-emerald-800 font-bold border-b-2 border-emerald-700' : ''}`}
        >
          Pesquisa & Acervo
        </button>
      </div>
    </header>
  );
};
