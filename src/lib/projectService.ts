import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';

export interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  featuredMediaId?: string; // ID of the featured media item
  liveUrl?: string;
  githubUrl?: string;
  projectDate?: string; // Date when the project was completed/launched
  createdAt?: any;
  updatedAt?: any;
}

export const projects: Project[] = [
  {
    name: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Task Management App',
    description: 'Full-stack application with real-time updates',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'AI Chat Application',
    description: 'Intelligent chatbot with machine learning',
    technologies: ['Python', 'TensorFlow', 'FastAPI'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Mobile App',
    description: 'Cross-platform mobile application',
    technologies: ['React Native', 'Firebase', 'Redux'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Data Dashboard',
    description: 'Real-time analytics and visualization',
    technologies: ['Vue.js', 'D3.js', 'Express'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    name: 'Blockchain App',
    description: 'Decentralized application on Ethereum',
    technologies: ['Solidity', 'Web3.js', 'React'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    if (querySnapshot.empty) {
      // If no projects in database, return default projects
      return projects;
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to default projects
    return projects;
  }
};

export const createProject = async (project: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return {
      id: docRef.id,
      ...project,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

export const updateProject = async (id: string, updates: Partial<Project>): Promise<void> => {
  try {
    if (!id) {
      throw new Error('Project ID is required for update');
    }
    
    console.log('Updating project with ID:', id, 'Updates:', updates);
    
    // Check if the project exists first
    const projectDoc = await getDoc(doc(db, 'projects', id));
    if (!projectDoc.exists()) {
      throw new Error(`Project with ID ${id} does not exist`);
    }
    
    await updateDoc(doc(db, 'projects', id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error(`Failed to update project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 