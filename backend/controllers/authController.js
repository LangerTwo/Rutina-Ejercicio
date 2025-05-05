const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;

    try{
        const userExistente = await User.findOne({ email });
        if (userExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({ nombre, email, password: passwordHash });
        await nuevoUsuario.save();

        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario", error });
    }
};

// Login de usuario
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            message: "Login exitoso",
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};

module.exports = {
  registerUser,
  loginUser,
};