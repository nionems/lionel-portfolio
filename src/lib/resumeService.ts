import { storage } from './firebase';
import { ref, getDownloadURL } from 'firebase/storage';

export const getResumeUrl = async (): Promise<string | null> => {
  try {
    const resumeRef = ref(storage, 'resume/resume.pdf');
    const url = await getDownloadURL(resumeRef);
    return url;
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return null;
  }
}; 