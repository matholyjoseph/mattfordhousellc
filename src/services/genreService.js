import { 
  getAllDocs, getDocById, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "genres";

export const getGenres = () => getAllDocs(COLLECTION);
export const getGenreById = (id) => getDocById(COLLECTION, id);
export const createGenre = (data) => createDoc(COLLECTION, data);
export const updateGenre = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteGenre = (id) => deleteDocById(COLLECTION, id);
