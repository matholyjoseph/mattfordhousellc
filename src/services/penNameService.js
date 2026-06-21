import { 
  getAllDocs, getDocById, getDocBySlug, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "pennames";

export const getPenNames = () => getAllDocs(COLLECTION);
export const getPenNameById = (id) => getDocById(COLLECTION, id);
export const getPenNameBySlug = (slug) => getDocBySlug(COLLECTION, slug);
export const createPenName = (data) => createDoc(COLLECTION, data);
export const updatePenName = (id, data) => updateDocFields(COLLECTION, id, data);
export const deletePenName = (id) => deleteDocById(COLLECTION, id);
