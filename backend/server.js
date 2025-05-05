const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // para leer JSON del body

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes); // ✅ esta línea activa las rutas

// Ruta de prueba
app.get("/api/test", (req, res) => {
    res.json({ mensaje: "Ruta de prueba funcionando" });
});

// Ruta raíz
app.get("/", (req, res) => {
    res.send("API funcionando 🎉");
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));