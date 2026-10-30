import React, { useState } from 'react';
import { SCHOOL_UNITS } from '../data/portalData';
import { SchoolUnit } from '../types/education';
import { Building2, Phone, Mail, MapPin, Users, Clock, Award, Search } from 'lucide-react';

export const SchoolDirectory: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'EBM' | 'CEI' | 'Polo Especial'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchools = SCHOOL_UNITS.filter((school) => {
    const matchesType = filterType === 'all' || school.type === filterType;
    const matchesSearch = 
      school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.pedagogicalFocus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs uppercase tracking-widest text-emerald-700 font-semibold">
          Estrutura Educacional · Município de Bombinhas (SC)
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Rede Municipal de Ensino
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Conheça as Escolas Básicas Municipais (EBMs), Centros de Educação Infantil (CEIs) e o Polo de Atendimento Educacional Especializado (AEE) distribuídos pelos bairros da península.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por escola, bairro (ex: Centro, Bombas, Zimbros) ou projeto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors text-slate-900"
          />
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 text-xs font-medium">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas ({SCHOOL_UNITS.length})
          </button>
          <button
            onClick={() => setFilterType('EBM')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'EBM' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Escolas Básicas (EBMs)
          </button>
          <button
            onClick={() => setFilterType('CEI')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              filterType === 'CEI' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Centros Infantis (CEIs)
          </button>
        </div>
      </div>

      {/* School Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-600/60 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-emerald-800">{school.type}</span>
                    <span>·</span>
                    <span>Bairro {school.neighborhood}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900">
                    {school.name}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Direct Info */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{school.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px] text-slate-500">{school.email}</span>
                </div>
              </div>

              {/* Pedagogical Focus */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Destaque Pedagógico da Unidade:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {school.pedagogicalFocus}
                </p>
              </div>
            </div>

            {/* School Stats Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <div>
                Direção: <strong className="text-slate-700">{school.principal}</strong>
              </div>
              <div className="flex items-center gap-2">
                <span>Aprox. <strong className="text-slate-700">{school.studentsCount}</strong> estudantes</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
