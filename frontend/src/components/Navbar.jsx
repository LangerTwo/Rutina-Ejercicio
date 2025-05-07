import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (usuario?.nombre) {
            setNombre(usuario.nombre);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    return (
        <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-semibold">
                Bienvenido{nombre ? `, ${nombre}` : ""} 👋
            </h1>
            <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
                Cerrar sesión
            </button>
        </header>
    );
};

export default Navbar;