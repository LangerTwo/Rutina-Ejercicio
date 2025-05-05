import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoutinePage = () => {
    const [rutina, setRutina] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem("cuestionario");
        if (!raw) {
            navigate("/cuestionario");
            return;
        }

        const data = JSON.parse(raw);
        const nuevaRutina = generarRutina(data);
        setRutina(nuevaRutina);
    }, [navigate]);

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
        <div>
            <h2>Tu rutina personalizada 💪</h2>
            {rutina.length === 0 ? (
                <p>Cargando rutina...</p>
            ) : (
                rutina.map((r, i) => (
                    <div key={i}>
                        <h3>{r.dia}</h3>
                        <ul>
                            {r.ejercicios.map((e, idx) => (
                                <li key={idx}>{e}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default RoutinePage;