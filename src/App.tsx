import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CurricularProposal } from './components/CurricularProposal';
import { SchoolDirectory } from './components/SchoolDirectory';
import { SchoolCalendar } from './components/SchoolCalendar';
import { PublicRepository } from './components/PublicRepository';
import { TeacherPedagogicalArea } from './components/TeacherPedagogicalArea';
import { TeacherAuthModal } from './components/TeacherAuthModal';
import { DocumentModal } from './components/DocumentModal';
import { Footer } from './components/Footer';
import { DOCUMENTS_DATA } from './data/portalData';
import { DocumentItem, TeacherUser } from './types/education';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor'>('inicio');
  const [activeTeacher, setActiveTeacher] = useState<TeacherUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);

  const handleNavigate = (tab: 'inicio' | 'proposta' | 'escolas' | 'calendario' | 'pesquisa' | 'professor') => {
    if (tab === 'professor') {
      if (!activeTeacher) {
        setIsAuthModalOpen(true);
        return;
      }
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeacherLogin = (teacher: TeacherUser) => {
    setActiveTeacher(teacher);
    setCurrentTab('professor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeacherLogout = () => {
    setActiveTeacher(null);
    setCurrentTab('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeacherArea = () => {
    if (activeTeacher) {
      setCurrentTab('professor');
    } else {
      setIsAuthModalOpen(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Bar with Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        activeTeacher={activeTeacher}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentTab === 'inicio' && (
          <HeroSection
            onOpenTeacherArea={handleOpenTeacherArea}
            onNavigate={handleNavigate}
            onSearchFocus={() => handleNavigate('pesquisa')}
          />
        )}

        {currentTab === 'proposta' && (
          <CurricularProposal
            onOpenTeacherArea={handleOpenTeacherArea}
            onOpenRepository={() => handleNavigate('pesquisa')}
          />
        )}

        {currentTab === 'escolas' && (
          <SchoolDirectory />
        )}

        {currentTab === 'calendario' && (
          <SchoolCalendar />
        )}

        {currentTab === 'pesquisa' && (
          <PublicRepository
            documents={DOCUMENTS_DATA}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
            onOpenTeacherArea={handleOpenTeacherArea}
          />
        )}

        {currentTab === 'professor' && activeTeacher && (
          <TeacherPedagogicalArea
            teacher={activeTeacher}
            documents={DOCUMENTS_DATA}
            onSelectDocument={(doc) => setSelectedDocument(doc)}
            onLogout={handleTeacherLogout}
            onOpenCalendar={() => handleNavigate('calendario')}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Teacher Authentication Modal */}
      <TeacherAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleTeacherLogin}
      />

      {/* Document Reader Modal */}
      <DocumentModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
}
