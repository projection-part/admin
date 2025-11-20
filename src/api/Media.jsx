import API from "./AxiosClient";

// Upload media
export const uploadMedia = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post("/media", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get all media
export const getMedia = () => API.get("/media");

// Update filename
export const updateMediaFilename = (id, filename) =>
  API.put(`/media/${id}`, { filename });

// Delete media
export const deleteMedia = (id) => API.delete(`/media/${id}`);
