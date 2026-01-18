import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  UpdateData,
  serverTimestamp,
} from 'firebase/firestore';
import { db, BaseDocument } from './client';

// Collection names (centralized for type safety)
export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

// Generic CRUD operations factory
export function createCollectionHelper<T extends BaseDocument>(
  collectionName: CollectionName
) {
  const collectionRef = collection(db, collectionName);

  return {
    // Get single document
    async get(id: string): Promise<T | null> {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    },

    // Get all documents with optional constraints
    async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as T)
      );
    },

    // Create document
    async create(
      data: Omit<WithFieldValue<T>, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<string> {
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      } as DocumentData);
      return docRef.id;
    },

    // Update document
    async update(
      id: string,
      data: Partial<Omit<UpdateData<T>, 'id' | 'createdAt'>>
    ): Promise<void> {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      } as DocumentData);
    },

    // Delete document
    async delete(id: string): Promise<void> {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    },

    // Query helpers
    where,
    orderBy,
    limit,
  };
}

// Example: User collection helper
export interface User extends BaseDocument {
  email: string;
  name?: string;
}

export const usersCollection = createCollectionHelper<User>(COLLECTIONS.USERS);

// Example: Post collection helper
export interface Post extends BaseDocument {
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
}

export const postsCollection = createCollectionHelper<Post>(COLLECTIONS.POSTS);
