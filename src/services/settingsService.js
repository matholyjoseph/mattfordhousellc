import { getDocById, setDocWithId } from "./firebaseService";

const COLLECTION = "settings";

/**
 * Retrieve settings document by document ID (e.g. 'homepage' or 'site')
 * @param {string} type 
 */
export const getSettings = (type) => getDocById(COLLECTION, type);

/**
 * Save settings document merging existing data
 * @param {string} type 
 * @param {Object} data 
 */
export const saveSettings = (type, data) => setDocWithId(COLLECTION, type, data);
