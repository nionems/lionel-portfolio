export const getResumeUrl = async (): Promise<string | null> => {
  try {
    const { storage } = await import('./firebase');
    const { ref, getDownloadURL } = await import('firebase/storage');
    
    const resumeRef = ref(storage, 'resume/resume.pdf');
    const url = await getDownloadURL(resumeRef);
    return url;
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return null;
  }
}; 