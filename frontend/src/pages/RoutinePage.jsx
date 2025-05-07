import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RoutinePage = () => {
    const [rutina, setRutina] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("rutinas")) || [];
        const rutinaSeleccionada = stored.find((r) => r.id.toString() === id);

        if (!rutinaSeleccionada) {
            navigate("/dashboard");
            return;
        }

        const nuevaRutina = generarRutina(rutinaSeleccionada);
        setRutina(nuevaRutina);
    }, [id, navigate]);

    const generarRutina = (respuestas) => {
        const { objetivo, tiempo, dias, enfoque } = respuestas;

        const ejercicios = {
            abdomen: ["Planchas", "Crunches", "Elevación de piernas"],
            piernas: ["Sentadillas", "Zancadas", "Puente de glúteos"],
            brazos: ["Flexiones", "Fondos de tríceps", "Boxeo sombra"],
            completo: ["Burpees", "Jumping Jacks", "Mountain Climbers"],
        };

        const enfoqueFinal = enfoque?.length > 0 ? enfoque : ["completo"];
        

        return dias.map((dia) => {
            const diaEjercicios = [];

            enfoqueFinal.forEach((parte) => {
                const clave = parte.toLowerCase();
                const disponibles = ejercicios[clave] || [];
                if (disponibles.length > 0) {
                    const aleatorio = disponibles[Math.floor(Math.random() * disponibles.length)];
                    diaEjercicios.push(aleatorio);
                }
            });

            return {
                dia,
                ejercicios: diaEjercicios.slice(0, tiempo === "10-20" ? 2 : tiempo === "20-30" ? 3 : 4),
            };
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">💪 Tu rutina personalizada</h2>

            {rutina.length === 0 ? (
                <p className="text-center text-gray-500">Cargando rutina...</p>
            ) : (
                <div className="space-y-6">
                    {rutina.map((r, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500"
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{r.dia}</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {r.ejercicios.map((e, idx) => (
                                    <li key={idx}>{e}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoutinePage;