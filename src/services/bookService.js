import { 
  getAllDocs, getDocById, getDocBySlug, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "books";

export const getBooks = () => getAllDocs(COLLECTION);
export const getBookById = (id) => getDocById(COLLECTION, id);
export const getBookBySlug = (slug) => getDocBySlug(COLLECTION, slug);
export const createBook = (data) => createDoc(COLLECTION, data);
export const updateBook = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteBook = (id) => deleteDocById(COLLECTION, id);
