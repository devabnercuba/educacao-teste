import React from 'react';
import { MapPin, Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Institutional identification */}
          <div className="space-y-3 md:col-span-1">
            <div className="text-white font-bold text-base tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Bombinhas Educa</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Portal Oficial de Informações Educacionais e Apoio Pedagógico da Rede Municipal de Ensino de Bombinhas, Santa Catarina.
            </p>
            <div className="text-[11px] text-slate-500">
              CNPJ: 95.815.379/0001-02
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Navegação do Portal
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('proposta')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Proposta Pedagógica & Territorial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('escolas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Escolas e Centros Infantis (CEIs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendario')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calendário Escolar 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pesquisa')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Acervo Público de Normas e Editais
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Espaço do Professor */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Área Restrita ao Docente
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('professor')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 text-emerald-400 font-medium"
                >
                  <span>Modelos de Planejamento 2026</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('professor')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sequências Didáticas Homologadas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('professor')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Instruções Normativas do Magistério
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('professor')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Protocolo de PDI e Inclusão AEE
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts */}
          <div className="space-y-3">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              Secretaria de Educação
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Rua Baleia Jubarte, nº 328 - José Amândio, Bombinhas - SC, CEP 88215-000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span>(47) 3393-9500 / 3393-9530</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono text-[11px]">educacao@bombinhas.sc.gov.br</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                Atendimento: Segunda a Sexta, das 08h às 12h e das 13h30 às 17h30.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Município de Bombinhas · Secretaria Municipal de Educação. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Apenas para fins de pesquisa e consulta pedagógica</span>
            <span>·</span>
            <span>Transparência Pública</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
