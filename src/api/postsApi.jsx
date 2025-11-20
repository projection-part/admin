import axiosClient from "./AxiosClient";

export const getPosts = () => axiosClient.get("/posts");
export const getPost = (id) => axiosClient.get(`/posts/${id}`);
export const createPost = (data) => axiosClient.post("/posts", data);
export const updatePost = (id, data) => axiosClient.put(`/posts/${id}`, data);
export const deletePost = (id) => axiosClient.delete(`/posts/${id}`);
export const togglePublish = (id) => axiosClient.put(`/posts/${id}/publish`);
