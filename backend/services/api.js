const API_URL = 'http://192.168.1.100:3000';

export const getTareas = async () => {
  const res = await fetch(`${API_URL}/tareas`);
  return await res.json();
};

export const crearTarea = async (tarea) => {
  const res = await fetch(`${API_URL}/tareas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tarea)
  });

  return await res.json();
};