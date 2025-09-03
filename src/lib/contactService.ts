import { db } from './firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Timestamp;
}

export const submitContactForm = async (message: ContactMessage) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...message,
      createdAt: serverTimestamp(),
    });
    
    return {
      success: true,
      id: docRef.id,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}; 