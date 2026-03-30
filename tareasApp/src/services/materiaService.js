import api from "./api";

export const getMaterias = () => api.get("/materias");
export const createMateria = (data) => api.post("/materias", data);
export const updateMateria = (id, data) => api.put(`/materias/${id}`, data);
export const deleteMateria = (id) => api.delete(`/materias/${id}`);