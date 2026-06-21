import { 
  getAllDocs, getDocById, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "tropes";

export const getTropes = () => getAllDocs(COLLECTION);
export const getTropeById = (id) => getDocById(COLLECTION, id);
export const createTrope = (data) => createDoc(COLLECTION, data);
export const updateTrope = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteTrope = (id) => deleteDocById(COLLECTION, id);
