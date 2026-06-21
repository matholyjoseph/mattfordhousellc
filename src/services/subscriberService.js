import { 
  getAllDocs, getDocById, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "subscribers";

export const getSubscribers = () => getAllDocs(COLLECTION);
export const getSubscriberById = (id) => getDocById(COLLECTION, id);
export const createSubscriber = (data) => createDoc(COLLECTION, data);
export const updateSubscriber = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteSubscriber = (id) => deleteDocById(COLLECTION, id);
