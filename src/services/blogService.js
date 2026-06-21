import { 
  getAllDocs, getDocById, getDocBySlug, createDoc, updateDocFields, deleteDocById 
} from "./firebaseService";

const COLLECTION = "blogs";

export const getBlogs = () => getAllDocs(COLLECTION);
export const getBlogById = (id) => getDocById(COLLECTION, id);
export const getBlogBySlug = (slug) => getDocBySlug(COLLECTION, slug);
export const createBlog = (data) => createDoc(COLLECTION, data);
export const updateBlog = (id, data) => updateDocFields(COLLECTION, id, data);
export const deleteBlog = (id) => deleteDocById(COLLECTION, id);
