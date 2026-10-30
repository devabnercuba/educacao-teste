import React, { useState } from 'react';
import { TeacherUser } from '../types/education';
import { INITIAL_TEACHERS } from '../data/portalData';
import { Lock, ShieldCheck, X, UserCheck, ArrowRight, Info } from 'lucide-react';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (teacher: TeacherUser) => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState(INITIAL_TEACHERS[0].id);
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState('Anos Iniciais (1º ao 5º)');
  const [mode, setMode] = useState<'quick' | 'manual'>('quick');

  if (!isOpen) return null;

  const handleQuickLogin = (teacher: TeacherUser) => {
    onLogin(teacher);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToUse = customEmail.trim() || 'professor.rede@edu.bombinhas.sc.gov.br';
    const newTeacher: TeacherUser = {
      id: `prof-custom-${Date.now()}`,
      name: emailToUse.split('@')[0].replace('.', ' ').toUpperCase(),
      registrationNumber: `MATR-${Math.floor(10000 + Math.random() * 90000)}/BMB`,
      email: emailToUse,
      school: 'Rede Municipal de Ensino de Bombinhas',
      role: 'Professor(a) Municipal Convidado(a)',
      teachingStage: customRole as any,
    };
    onLogin(newTeacher);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 id="auth-modal-title" className="text-sm font-semibold tracking-tight text-white">
                Espaço do Professor · Acesso Restrito
              </h3>
              <p className="text-[11px] text-slate-400">
                Secretaria Municipal de Educação de Bombinhas (SC)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Callout */}
        <div className="p-6 space-y-5 bg-slate-50/50">
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-lg flex items-start gap-3 text-xs text-sky-900">
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Área exclusiva para docentes e equipe pedagógica da rede municipal para consulta de <strong>modelos de planejamento, sequências didáticas e normativas específicas</strong>.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex rounded-lg bg-slate-200/70 p-1 text-xs font-medium">
            <button
              onClick={() => setMode('quick')}
              className={`flex-1 py-1.5 rounded-md transition-colors ${mode === 'quick' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Acesso Rápido por Perfil Docente
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`flex-1 py-1.5 rounded-md transition-colors ${mode === 'manual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Digitar E-mail Institucional
            </button>
          </div>

          {mode === 'quick' ? (
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Selecione um perfil de professor da rede para simular a consulta:
              </label>

              <div className="space-y-2">
                {INITIAL_TEACHERS.map((teacher) => (
                  <button
                    key={teacher.id}
                    onClick={() => handleQuickLogin(teacher)}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                        {teacher.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {teacher.role} · {teacher.school}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {teacher.email}
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  E-mail institucional (@edu.bombinhas.sc.gov.br) ou Matrícula:
                </label>
                <input
                  type="text"
                  placeholder="exemplo: professor@edu.bombinhas.sc.gov.br"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Etapa de Atuação Docente:
                </label>
                <select
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-slate-900"
                >
                  <option value="Educação Infantil">Educação Infantil (Creche e Pré-Escola)</option>
                  <option value="Anos Iniciais (1º ao 5º)">Anos Iniciais do Ensino Fundamental (1º ao 5º)</option>
                  <option value="Anos Finais (6º ao 9º)">Anos Finais do Ensino Fundamental (6º ao 9º)</option>
                  <option value="Educação Especial / AEE">Educação Especial / AEE</option>
                  <option value="EJA">Educação de Jovens e Adultos (EJA)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Entrar no Espaço do Professor</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Ambiente homologado SME Bombinhas</span>
          <span className="font-mono">Portaria 04/2026</span>
        </div>
      </div>
    </div>
  );
};
