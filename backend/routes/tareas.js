const express = require('express');
const router = express.Router();
const db = require('../db');


// 🔍 Obtener todas las tareas (con JOIN)
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      t.id_tarea,
      t.titulo,
      t.descripcion,
      t.fecha_entrega,
      m.nombre AS materia,
      p.nombre AS prioridad,
      e.nombre AS estado
    FROM tareas t
    JOIN materias m ON t.id_materia = m.id_materia
    JOIN prioridades p ON t.id_prioridad = p.id_prioridad
    JOIN estados e ON t.id_estado = e.id_estado
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


// 🚀 Crear tarea (TRADUCE nombres → IDs)
router.post('/', (req, res) => {
  const { titulo, descripcion, fecha, materia, prioridad } = req.body;

  const estadoDefault = 1; // Pendiente

  const sql = `
    INSERT INTO tareas (titulo, descripcion, fecha_entrega, id_materia, id_prioridad, id_estado)
    VALUES (
      ?, ?, ?, 
      (SELECT id_materia FROM materias WHERE nombre = ? LIMIT 1),
      (SELECT id_prioridad FROM prioridades WHERE nombre = ? LIMIT 1),
      ?
    )
  `;

  db.query(
    sql,
    [titulo, descripcion, fecha, materia, prioridad, estadoDefault],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: '🔥 Tarea creada', id: result.insertId });
    }
  );
});


// 📌 Obtener una tarea
router.get('/:id', (req, res) => {
  const sql = `
    SELECT 
      t.*,
      m.nombre AS materia,
      p.nombre AS prioridad,
      e.nombre AS estado
    FROM tareas t
    JOIN materias m ON t.id_materia = m.id_materia
    JOIN prioridades p ON t.id_prioridad = p.id_prioridad
    JOIN estados e ON t.id_estado = e.id_estado
    WHERE t.id_tarea = ?
  `;

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});


// ✏️ Actualizar tarea
router.put('/:id', (req, res) => {
  const { titulo, descripcion, fecha, materia, prioridad, estado } = req.body;

  const sql = `
    UPDATE tareas
    SET 
      titulo = ?,
      descripcion = ?,
      fecha_entrega = ?,
      id_materia = (SELECT id_materia FROM materias WHERE nombre=? LIMIT 1),
      id_prioridad = (SELECT id_prioridad FROM prioridades WHERE nombre=? LIMIT 1),
      id_estado = (SELECT id_estado FROM estados WHERE nombre=? LIMIT 1)
    WHERE id_tarea = ?
  `;

  db.query(
    sql,
    [titulo, descripcion, fecha, materia, prioridad, estado, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: '✏️ Tarea actualizada' });
    }
  );
});


// 🗑️ Eliminar
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tareas WHERE id_tarea = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: '🗑️ Eliminada' });
  });
});

module.exports = router;