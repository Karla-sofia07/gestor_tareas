const API_URL = 'http://192.168.100.63:3000';

// ─── TAREAS ───────────────────────────────────────────

const getTareas = async (filtros = {}) => {
  try {
    const params = new URLSearchParams();
    if (filtros.id_materia)   params.append('id_materia',   filtros.id_materia);
    if (filtros.id_estado)    params.append('id_estado',    filtros.id_estado);
    if (filtros.id_prioridad) params.append('id_prioridad', filtros.id_prioridad);

    const url = `${API_URL}/tareas${params.toString() ? '?' + params.toString() : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.log("❌ ERROR getTareas:", error);
    return [];
  }
};

const crearTarea = async (tarea) => {
  try {
    const res = await fetch(`${API_URL}/tareas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR crearTarea:", error);
    return null;
  }
};

const editarTarea = async (id_tarea, tarea) => {
  try {
    const res = await fetch(`${API_URL}/tareas/${id_tarea}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR editarTarea:", error);
    return null;
  }
};

const completarTarea = async (id_tarea) => {
  try {
    const res = await fetch(`${API_URL}/tareas/${id_tarea}/completar`, {
      method: 'PATCH',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR completarTarea:", error);
    return null;
  }
};

const eliminarTarea = async (id_tarea) => {
  try {
    const res = await fetch(`${API_URL}/tareas/${id_tarea}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR eliminarTarea:", error);
    return null;
  }
};

// ─── MATERIAS ─────────────────────────────────────────

const getMaterias = async (id_usuario = 1) => {
  try {
    const res = await fetch(`${API_URL}/materias?id_usuario=${id_usuario}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.log("❌ ERROR getMaterias:", error);
    return [];
  }
};

const crearMateria = async (nombre, descripcion = '', id_usuario = 1) => {
  try {
    const res = await fetch(`${API_URL}/materias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, id_usuario }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR crearMateria:", error);
    return null;
  }
};

const editarMateria = async (id_materia, nombre, descripcion = '') => {
  try {
    const res = await fetch(`${API_URL}/materias/${id_materia}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR editarMateria:", error);
    return null;
  }
};

const eliminarMateria = async (id_materia) => {
  try {
    const res = await fetch(`${API_URL}/materias/${id_materia}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR eliminarMateria:", error);
    return null;
  }
};

// ─── AUTH ─────────────────────────────────────────────

const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR login:", error);
    throw error;
  }
};

const register = async (nombre, email, password) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Error HTTP: ${res.status}`);
    return data;
  } catch (error) {
    console.log("❌ ERROR register:", error);
    throw error;
  }
};

export {
  getTareas, crearTarea, editarTarea, completarTarea, eliminarTarea,
  getMaterias, crearMateria, editarMateria, eliminarMateria,
  login, register
};