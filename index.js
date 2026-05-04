const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Configuración de la conexión usando variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'clientes'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// Endpoint solicitado: GET /clientes
app.get('/clientes', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend corriendo en puerto ${PORT}`);
});