import API from "./AxiosClient";

export const getPages = () => API.get("/pages");
export const getPage = (id) => API.get(`/pages/${id}`);
export const createPage = (data) => API.post("/pages", data);
export const updatePage = (id, data) => API.put(`/pages/${id}`, data);
export const deletePage = (id) => API.delete(`/pages/${id}`);
export const togglePublishPage = (id) => API.put(`/pages/${id}/publish`);
