const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'appuser',
  password: '1234',
  database: 'gestor_tareas_academicas1'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('🔥 Conectado a MySQL');
  }
});

module.exports = connection;