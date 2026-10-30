import React, { useState } from 'react';
import { CALENDAR_EVENTS } from '../data/portalData';
import { CalendarMilestone } from '../types/education';
import { Calendar, Clock, Download, CheckCircle, AlertCircle, Info, Bookmark } from 'lucide-react';

export const SchoolCalendar: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = CALENDAR_EVENTS.filter((event) => {
    if (filterType === 'all') return true;
    return event.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
          Ano Letivo 2026 · Decreto Municipal nº 3.421
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Calendário Escolar e Prazos Pedagógicos
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Cronograma regulamentar com os 200 dias letivos, organização dos quatro bimestres, paradas pedagógicas para planejamento, conselhos de classe e recessos escolares.
        </p>
      </div>

      {/* 4 Bimestres Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>1º BIMESTRE</span>
            <span className="text-emerald-700 font-semibold">51 Dias</span>
          </div>
          <div className="text-base font-bold text-slate-900">11 Fev a 24 Abr</div>
          <p className="text-xs text-slate-600">
            Jornada de abertura, diagnósticos iniciais de leitura e Conselho de Classe em 24/04.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>2º BIMESTRE</span>
            <span className="text-emerald-700 font-semibold">55 Dias</span>
          </div>
          <div className="text-base font-bold text-slate-900">27 Abr a 17 Jul</div>
          <p className="text-xs text-slate-600">
            Semana do Meio Ambiente/Oceanos e entrega de pareceres semestrais da Educação Infantil.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>3º BIMESTRE</span>
            <span className="text-emerald-700 font-semibold">45 Dias</span>
          </div>
          <div className="text-base font-bold text-slate-900">03 Ago a 02 Out</div>
          <p className="text-xs text-slate-600">
            Início pós-recesso de inverno, Mostra Cultural Açoriana e avaliações diagnósticas intermediárias.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>4º BIMESTRE</span>
            <span className="text-emerald-700 font-semibold">49 Dias</span>
          </div>
          <div className="text-base font-bold text-slate-900">05 Out a 17 Dez</div>
          <p className="text-xs text-slate-600">
            Conselho de Classe Final, fechamento de médias e encerramento oficial em 17 de dezembro.
          </p>
        </div>
      </div>

      {/* Recess Alert Strip */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-sky-700 shrink-0" />
          <div className="text-xs text-sky-950">
            <strong className="block text-sky-900 font-semibold">Recesso Escolar de Inverno:</strong>
            De 20 a 31 de Julho de 2026 para todos os alunos e professores da Rede Municipal de Bombinhas.
          </div>
        </div>
      </div>

      {/* Timeline of events */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            Marcos do Calendário 2026
          </h2>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Filtrar:</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('bimestre')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'bimestre' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Bimestres
            </button>
            <button
              onClick={() => setFilterType('jornada')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'jornada' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Jornadas
            </button>
            <button
              onClick={() => setFilterType('conselho')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                filterType === 'conselho' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Conselhos
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors"
            >
              <div className="w-32 shrink-0">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {evt.date}
                </span>
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 capitalize shrink-0">
                {evt.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
