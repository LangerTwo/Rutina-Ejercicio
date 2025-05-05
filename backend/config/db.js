const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB conectado: ${conn.connection.host}`); 
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error);
        process.exit(1); // Salir del proceso con un código de error
    }
};

module.exports = connectDB;