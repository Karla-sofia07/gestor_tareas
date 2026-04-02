const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// ─── TAREAS ───────────────────────────────────────────

// 🔍 Obtener tareas con filtros opcionales
app.get('/tareas', (req, res) => {
  const { id_materia, id_estado, id_prioridad } = req.query;

  let query = `
    SELECT t.*, m.nombre AS materia, p.nombre AS prioridad, e.nombre AS estado
    FROM tareas t
    LEFT JOIN materias m ON t.id_materia = m.id_materia
    LEFT JOIN prioridades p ON t.id_prioridad = p.id_prioridad
    LEFT JOIN estados e ON t.id_estado = e.id_estado
    WHERE 1=1
  `;
  const params = [];

  if (id_materia)   { query += ' AND t.id_materia = ?';   params.push(id_materia); }
  if (id_estado)    { query += ' AND t.id_estado = ?';    params.push(id_estado); }
  if (id_prioridad) { query += ' AND t.id_prioridad = ?'; params.push(id_prioridad); }

  db.query(query, params, (err, results) => {
    if (err) {
      console.log("❌ ERROR GET tareas:", err);
      return res.status(500).json({ error: 'Error al obtener tareas' });
    }
    res.json(results);
  });
});

// ➕ Crear tarea
app.post('/tareas', (req, res) => {
  const { titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado } = req.body;

  if (!titulo)        return res.status(400).json({ error: 'Falta el título' });
  if (!fecha_entrega) return res.status(400).json({ error: 'Falta la fecha de entrega' });
  if (!id_materia)    return res.status(400).json({ error: 'Falta la materia' });

  db.query(
    'INSERT INTO tareas (titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, descripcion || '', fecha_entrega, id_materia, id_prioridad || 1, id_estado || 1],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR INSERT tarea:", err);
        return res.status(500).json({ error: 'Error al insertar tarea', detalle: err.sqlMessage });
      }
      res.status(201).json({ id_tarea: result.insertId, titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado });
    }
  );
});

// ✏️ Editar tarea
app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado } = req.body;

  if (!titulo)        return res.status(400).json({ error: 'Falta el título' });
  if (!fecha_entrega) return res.status(400).json({ error: 'Falta la fecha de entrega' });
  if (!id_materia)    return res.status(400).json({ error: 'Falta la materia' });

  db.query(
    'UPDATE tareas SET titulo=?, descripcion=?, fecha_entrega=?, id_materia=?, id_prioridad=?, id_estado=? WHERE id_tarea=?',
    [titulo, descripcion || '', fecha_entrega, id_materia, id_prioridad || 1, id_estado || 1, id],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR UPDATE tarea:", err);
        return res.status(500).json({ error: 'Error al editar tarea', detalle: err.sqlMessage });
      }
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
      res.json({ id_tarea: id, titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado });
    }
  );
});

// ✅ Marcar tarea como completada
app.patch('/tareas/:id/completar', (req, res) => {
  const { id } = req.params;
  db.query(
    'UPDATE tareas SET id_estado = 3 WHERE id_tarea = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR COMPLETAR:", err);
        return res.status(500).json({ error: 'Error al completar tarea' });
      }
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
      res.json({ mensaje: 'Tarea completada', id_tarea: id });
    }
  );
});

// 🗑️ Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tareas WHERE id_tarea = ?', [id], (err, result) => {
    if (err) {
      console.log("❌ ERROR DELETE tarea:", err);
      return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada', id_tarea: id });
  });
});

// ─── MATERIAS ─────────────────────────────────────────

// 🔍 Obtener materias por usuario
app.get('/materias', (req, res) => {
  const id_usuario = req.query.id_usuario || 1;
  db.query('SELECT * FROM materias WHERE id_usuario = ?', [id_usuario], (err, results) => {
    if (err) {
      console.log("❌ ERROR GET materias:", err);
      return res.status(500).json({ error: 'Error al obtener materias' });
    }
    res.json(results);
  });
});

// ➕ Crear materia
app.post('/materias', (req, res) => {
  const { nombre, descripcion, id_usuario } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });

  db.query(
    'INSERT INTO materias (nombre, descripcion, id_usuario) VALUES (?, ?, ?)',
    [nombre, descripcion || '', id_usuario || 1],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR INSERT materia:", err);
        return res.status(500).json({ error: 'Error al crear materia', detalle: err.sqlMessage });
      }
      res.status(201).json({ id_materia: result.insertId, nombre, descripcion });
    }
  );
});

// ✏️ Editar materia
app.put('/materias/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });

  db.query(
    'UPDATE materias SET nombre=?, descripcion=? WHERE id_materia=?',
    [nombre, descripcion || '', id],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR UPDATE materia:", err);
        return res.status(500).json({ error: 'Error al editar materia' });
      }
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Materia no encontrada' });
      res.json({ id_materia: id, nombre, descripcion });
    }
  );
});

// 🗑️ Eliminar materia
app.delete('/materias/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM materias WHERE id_materia = ?', [id], (err, result) => {
    if (err) {
      console.log("❌ ERROR DELETE materia:", err);
      return res.status(500).json({ error: 'Error al eliminar materia' });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Materia no encontrada' });
    res.json({ mensaje: 'Materia eliminada' });
  });
});

// ─── AUTH ─────────────────────────────────────────────

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña son obligatorios' });

  db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciales incorrectas' });
    const u = results[0];
    res.json({ id_usuario: u.id_usuario, nombre: u.nombre, email: u.email, id_rol: u.id_rol });
  });
});

app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

  db.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length > 0) return res.status(409).json({ error: 'El email ya está registrado' });

    db.query(
      'INSERT INTO usuarios (nombre, email, password, id_rol) VALUES (?, ?, ?, 2)',
      [nombre, email, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al registrar usuario' });
        res.status(201).json({ id_usuario: result.insertId, nombre, email });
      }
    );
  });
});

// 🚀 Levantar servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('🔥 Servidor corriendo en http://192.168.100.63:3000');
});