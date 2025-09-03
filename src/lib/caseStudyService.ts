import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface CaseStudy {
  id?: string;
  title: string;
  subtitle: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  technologies: string[];
  featuredMediaId?: string | null;
  projectDate: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Default case studies data
export const defaultCaseStudies: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "ISP Website Redesign",
    subtitle: "Ripple Networks ISP",
    role: "Project Manager & Multimedia Specialist",
    description: "I led the full digital transformation of Ripple Networks, an Australian ISP, turning an outdated website into a competitive, sales-ready brand.",
    challenge: "Outdated site, no brand identity or SEO. No reviews/testimonials, weak lead generation. Low visibility vs. competitors like Aussie Broadband & Leaptel.",
    solution: "Managed a 3-person team (designer, marketer, developer) using Agile/Kanban. Created Ripple's 🧊 Yeti mascot + AI-driven videos & animations. Redesigned site: FAQs, testimonials, business plans, modem upsells, 3-step signup flow. Planned SEO/content strategy + sales funnels to improve visibility and conversions. Integrated Google Reviews and trust signals.",
    result: "Boosted visibility with SEO + optimized content. Higher conversions with CTAs, funnels, and modem upsells. Built brand personality through animated mascot. Positioned Ripple as a marketing-ready, competitive ISP. This project showcases my ability to lead teams, build brand identity, and align digital strategy with sales — combining project management with creative multimedia execution.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    projectDate: "2024-01-15"
  },
  {
    title: "AI-Powered Task Management",
    subtitle: "CS2",
    role: "Full-Stack Developer",
    description: "Built an intelligent task management system that uses AI to prioritize tasks, suggest optimal workflows, and automate routine processes.",
    challenge: "Manual task prioritization, inefficient workflows",
    solution: "ML-powered prioritization, automated workflows",
    result: "50% time savings, 30% productivity increase",
    technologies: ["Next.js", "TypeScript", "TensorFlow", "PostgreSQL"],
    projectDate: "2024-02-20"
  },
  {
    title: "Real-Time Analytics Dashboard",
    subtitle: "CS3",
    role: "Backend Developer",
    description: "Developed a comprehensive analytics platform that processes millions of data points in real-time and provides actionable insights through interactive visualizations.",
    challenge: "Large data volumes, real-time processing needs",
    solution: "Stream processing, optimized queries, caching",
    result: "Sub-second query times, 99.9% uptime",
    technologies: ["Vue.js", "D3.js", "Kafka", "Redis"],
    projectDate: "2024-03-10"
  }
];

// Get all case studies
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const q = query(collection(db, 'caseStudies'), orderBy('projectDate', 'desc'));
    const querySnapshot = await getDocs(q);
    const caseStudies: CaseStudy[] = [];
    
    querySnapshot.forEach((doc) => {
      caseStudies.push({ id: doc.id, ...doc.data() } as CaseStudy);
    });
    
    console.log('Fetched case studies:', caseStudies);
    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    throw error;
  }
};

// Create a new case study
export const createCaseStudy = async (caseStudyData: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const now = Timestamp.now();
    
    // Filter out undefined values before sending to Firestore
    const cleanData = Object.fromEntries(
      Object.entries(caseStudyData).filter(([, value]) => value !== undefined)
    );
    
    console.log('Clean data for Firestore:', cleanData);
    
    const docRef = await addDoc(collection(db, 'caseStudies'), {
      ...cleanData,
      createdAt: now,
      updatedAt: now
    });
    
    console.log('Case study created with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error creating case study:', error);
    throw error;
  }
};

// Update an existing case study
export const updateCaseStudy = async (id: string, caseStudyData: Partial<CaseStudy>): Promise<void> => {
  try {
    const caseStudyRef = doc(db, 'caseStudies', id);
    
    // Filter out undefined values before sending to Firestore
    const cleanData = Object.fromEntries(
      Object.entries(caseStudyData).filter(([, value]) => value !== undefined)
    );
    
    console.log('Clean update data for Firestore:', cleanData);
    
    await updateDoc(caseStudyRef, {
      ...cleanData,
      updatedAt: Timestamp.now()
    });
    
    console.log('Case study updated:', id);
  } catch (error) {
    console.error('Error updating case study:', error);
    throw error;
  }
};

// Delete a case study
export const deleteCaseStudy = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'caseStudies', id));
    console.log('Case study deleted:', id);
  } catch (error) {
    console.error('Error deleting case study:', error);
    throw error;
  }
};
