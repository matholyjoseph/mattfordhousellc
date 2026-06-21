import { 
  getAllDocs, getDocById, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "reviews";

export const getReviews = () => getAllDocs(COLLECTION);
export const getReviewById = (id) => getDocById(COLLECTION, id);
export const createReview = (data) => createDoc(COLLECTION, data);
export const updateReview = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteReview = (id) => deleteDocById(COLLECTION, id);
