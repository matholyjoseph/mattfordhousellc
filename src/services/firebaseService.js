import { 
  collection, doc, getDocs, getDoc, query, where, limit, 
  addDoc, setDoc, updateDoc, deleteDoc, serverTimestamp 
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Add created/updated timestamps to document data.
 * @param {Object} data 
 * @param {boolean} isNew 
 */
export const addTimestamps = (data, isNew = false) => {
  const current = serverTimestamp();
  if (isNew) {
    return {
      ...data,
      createdAt: current,
      updatedAt: current
    };
  }
  return {
    ...data,
    updatedAt: current
  };
};

/**
 * Get all documents in a collection.
 * @param {string} collectionName 
 */
export const getAllDocs = async (collectionName) => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error in getAllDocs for ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get a single document by its Firestore ID.
 * @param {string} collectionName 
 * @param {string} id 
 */
export const getDocById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error in getDocById for ${collectionName}/${id}:`, error);
    throw error;
  }
};

/**
 * Get a single document matching a field slug.
 * @param {string} collectionName 
 * @param {string} slug 
 */
export const getDocBySlug = async (collectionName, slug) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error in getDocBySlug for ${collectionName} with slug ${slug}:`, error);
    throw error;
  }
};

/**
 * Create a new document in a collection with auto ID.
 * @param {string} collectionName 
 * @param {Object} data 
 */
export const createDoc = async (collectionName, data) => {
  try {
    const colRef = collection(db, collectionName);
    const dataWithTime = addTimestamps(data, true);
    const docRef = await addDoc(colRef, dataWithTime);
    return docRef.id;
  } catch (error) {
    console.error(`Error in createDoc for ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Create or set a document in a collection with a specific custom ID (e.g. settings or UID).
 * @param {string} collectionName 
 * @param {string} id 
 * @param {Object} data 
 */
export const setDocWithId = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    const isNew = !docSnap.exists();
    const dataWithTime = addTimestamps(data, isNew);
    await setDoc(docRef, dataWithTime, { merge: true });
    return id;
  } catch (error) {
    console.error(`Error in setDocWithId for ${collectionName}/${id}:`, error);
    throw error;
  }
};

/**
 * Update an existing document fields.
 * @param {string} collectionName 
 * @param {string} id 
 * @param {Object} data 
 */
export const updateDocFields = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    const dataWithTime = addTimestamps(data, false);
    await updateDoc(docRef, dataWithTime);
    return true;
  } catch (error) {
    console.error(`Error in updateDocFields for ${collectionName}/${id}:`, error);
    throw error;
  }
};

/**
 * Delete a document from a collection.
 * @param {string} collectionName 
 * @param {string} id 
 */
export const deleteDocById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error in deleteDocById for ${collectionName}/${id}:`, error);
    throw error;
  }
};
