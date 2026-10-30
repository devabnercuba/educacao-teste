export type EducationalStage = 
  | 'Todos'
  | 'Educação Infantil'
  | 'Anos Iniciais (1º ao 5º)'
  | 'Anos Finais (6º ao 9º)'
  | 'Educação Especial / AEE'
  | 'EJA';

export type DocumentCategory = 
  | 'Planejamento Pedagógico'
  | 'Normativa Específica'
  | 'Matriz Curricular'
  | 'Critérios de Avaliação'
  | 'Calendário Escolar'
  | 'Edital / Publicação Oficial'
  | 'Projeto Institucional';

export interface DocumentItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  category: DocumentCategory;
  stage: EducationalStage;
  component?: string;
  year: number;
  format: 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  isRestricted: boolean; // true = teacher restricted area, false = public consultation
  publishedAt: string;
  author: string;
  content: {
    officialHeader: string;
    ementa: string;
    chapters: {
      title: string;
      body: string[];
    }[];
    practicalGuidelines?: string[];
    templatesIncluded?: string[];
  };
}

export interface SchoolUnit {
  id: string;
  name: string;
  type: 'EBM' | 'CEI' | 'Polo Especial';
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  principal: string;
  stages: string[];
  studentsCount: number;
  shifts: string[];
  pedagogicalFocus: string;
}

export interface CalendarMilestone {
  id: string;
  date: string;
  title: string;
  type: 'bimestre' | 'feriado' | 'jornada' | 'conselho' | 'recesso';
  description: string;
}

export interface EducationalProject {
  id: string;
  title: string;
  subtitle: string;
  coordinator: string;
  targetAudience: string;
  description: string;
  objectives: string[];
  localConnection: string; // Connection to Bombinhas community and ecology
}

export interface TeacherUser {
  id: string;
  name: string;
  registrationNumber: string;
  email: string;
  school: string;
  role: string;
  teachingStage: EducationalStage;
}
