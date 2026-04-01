const API_URL = 'http://192.168.100.63:3000'; // cambia tu IP

// 👇 EXPORTA TODO AL FINAL (más seguro)
const getTareas = async () => {
  const res = await fetch(`${API_URL}/tareas`);
  return await res.json();
};

const crearTarea = async (tarea) => {
  const res = await fetch(`${API_URL}/tareas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tarea)
  });

  return await res.json();
};

// 🔥 EXPORTACIÓN CORRECTA
export {
  getTareas,
  crearTarea
};