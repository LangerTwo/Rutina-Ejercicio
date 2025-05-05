import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        // Puedes obtener datos del usuario del localStorage o hacer una petición al backend
        const token = localStorage.getItem("token");
        if(!token) {
            navigate("/");
        }

        // Solo simulamos el nombre por ahora
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
        if(usuarioGuardado) {
            setNombre(usuarioGuardado.nombre);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    return (
        <div>
            <h1>Bievenido{nombre ? `, ${nombre}` : ""} 👋</h1>
            <p>Este es tu panel principal.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default DashboardPage;