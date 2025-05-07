import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [rutinas, setRutinas] = useState([]);

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

        const stored = localStorage.getItem("rutinas");
        if (stored) {
            setRutinas(JSON.parse(stored));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
    };

    const crearRutina = () => {
        navigate("/cuestionario");
    };

    const verRutina = (id) => {
        navigate(`/rutina/${id}`);
    };

    const borrarRutina = (id) => {
        const nuevas = rutinas.filter((r) => r.id !== id);
        setRutinas(nuevas);
        localStorage.setItem("rutinas", JSON.stringify(nuevas));
    };

    return (
        <div className="p-4">
            <h1>Bienvenido{nombre ? `, ${nombre}` : ""} 👋</h1>
            <p>Este es tu panel principal.</p>

            <button onClick={handleLogout}>Cerrar sesión</button>

            <hr className="my-4" />

            <h2 className="text-lg font-semibold">Mis rutinas 📝</h2>

            <button onClick={crearRutina} className="bg-blue-500 text-white px-4 py-2 rounded my-2">
                Crear nueva rutina
            </button>

            {rutinas.length === 0 ? (
                <p>No tienes rutinas creadas.</p>
            ) : (
                <ul className="space-y-3">
                    {rutinas.map((rutina) => (
                        <li key={rutina.id} className="border p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <strong>{rutina.nombre || "Rutina sin nombre"}</strong>
                                <p>{rutina.dias?.length || 0} días - {rutina.enfoque?.join(", ")}</p>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => verRutina(rutina.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                    Ver
                                </button>
                                <button onClick={() => borrarRutina(rutina.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    Borrar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DashboardPage;