import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, BadgeX } from "lucide-react";

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
        <div className="p-4 max-w-3xl mx-auto space-y-3">
            <p className="text-xl md:text-3xl font-semibold">Este es tu panel principal.</p>

            <hr className="my-4" />

            <h2 className="text-lg font-semibold">Mis rutinas 📝</h2>

            

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
                            <div className="space-x-2 flex items-center">
                                <button onClick={() => verRutina(rutina.id)} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex gap-2 items-center">
                                    <Eye className="w-4 h-4"/> Ver
                                </button>
                                <button onClick={() => borrarRutina(rutina.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex gap-2 items-center">
                                    <BadgeX className="w-4 h-4"/> Borrar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex justify-center items-center">
                <button onClick={crearRutina} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded my-2 flex gap-2 items-center">
                    <Plus className="w-5 h-5"/> Nueva Rutina
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;