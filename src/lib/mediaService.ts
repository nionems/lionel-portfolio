import { Timestamp, FieldValue } from 'firebase/firestore';

export interface MediaItem {
  id?: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  projectId?: string; // Assign to specific project
  projectName?: string; // Project name for display
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export const uploadMedia = async (file: File, title: string, description: string, projectId?: string, projectName?: string): Promise<MediaItem> => {
  try {
    // Dynamic imports to avoid build-time Firebase initialization
    const { db } = await import('./firebase');
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    
    const storage = getStorage();
    
    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `media/${fileName}`);

    // Upload file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Determine media type
    const type = file.type.startsWith('image/') ? 'image' : 'video';

    // Create media item data
    const mediaData: Omit<MediaItem, 'id'> = {
      title,
      description,
      type,
      url: downloadURL,
      projectId,
      projectName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'media'), mediaData);

    return {
      id: docRef.id,
      ...mediaData,
    };
  } catch (error) {
    console.error('Error uploading media:', error);
    throw new Error('Failed to upload media');
  }
};

export const getMediaItems = async (): Promise<MediaItem[]> => {
  try {
    const { db } = await import('./firebase');
    const { collection, getDocs } = await import('firebase/firestore');
    
    const querySnapshot = await getDocs(collection(db, 'media'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as MediaItem[];
  } catch (error) {
    console.error('Error fetching media:', error);
    throw new Error('Failed to fetch media items');
  }
};

export const getMediaByProject = async (projectId: string): Promise<MediaItem[]> => {
  try {
    const { db } = await import('./firebase');
    const { collection, getDocs } = await import('firebase/firestore');
    
    const querySnapshot = await getDocs(collection(db, 'media'));
    const allMedia = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as MediaItem[];
    
    return allMedia.filter(media => media.projectId === projectId);
  } catch (error) {
    console.error('Error fetching project media:', error);
    throw new Error('Failed to fetch project media');
  }
};

export const deleteMediaItem = async (id: string): Promise<void> => {
  try {
    const { db } = await import('./firebase');
    const { deleteDoc, doc } = await import('firebase/firestore');
    
    await deleteDoc(doc(db, 'media', id));
  } catch (error) {
    console.error('Error deleting media:', error);
    throw new Error('Failed to delete media item');
  }
};

export const updateMediaProject = async (id: string, projectId: string, projectName: string): Promise<void> => {
  try {
    const { db } = await import('./firebase');
    const { updateDoc, doc, serverTimestamp } = await import('firebase/firestore');
    
    await updateDoc(doc(db, 'media', id), {
      projectId: projectId || null,
      projectName: projectName || null,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating media project:', error);
    throw new Error('Failed to update media project');
  }
}; 