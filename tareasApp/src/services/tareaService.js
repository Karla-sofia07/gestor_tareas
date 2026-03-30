import api from "./api";

export const getTareas = () => api.get("/tareas");
export const createTarea = (data) => api.post("/tareas", data);
export const updateTarea = (id, data) => api.put(`/tareas/${id}`, data);
export const deleteTarea = (id) => api.delete(`/tareas/${id}`);