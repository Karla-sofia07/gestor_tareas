import api from "../api/api";

export const getTareas = () => api.get("/tareas");

export const createTarea = (data) =>
  api.post("/tareas", data);

export const updateTarea = (id, data) =>
  api.put(`/tareas/${id}`, data);

export const deleteTarea = (id) =>
  api.delete(`/tareas/${id}`);

export const completeTarea = (id) =>
  api.patch(`/tareas/${id}/complete`);