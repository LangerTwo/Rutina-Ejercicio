import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const objetivosDescriptivos = {
  bajar: "Bajar de peso",
  tonificar: "Tonificar",
  masa: "Ganar masa muscular",
  mantener: "Mantenerme activo",
};

const RoutinePage = () => {
  const [rutina, setRutina] = useState([]);
  const [objetivo, setObjetivo] = useState("");
  const [tiempoTotal, setTiempoTotal] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const stored = localStorage.getItem("rutinas");
    if (!stored) {
      navigate("/dashboard");
      return;
    }

    const rutinas = JSON.parse(stored);
    const encontrada = rutinas.find((r) => r.id.toString() === id);

    if (!encontrada) {
      navigate("/dashboard");
      return;
    }

    const rutinaGenerada = generarRutina(encontrada);
    setRutina(rutinaGenerada);
    setObjetivo(encontrada.objetivo);
    setTiempoTotal(encontrada.tiempo);
  }, [id, navigate]);

  const generarRutina = (respuestas) => {
    const { tiempo, dias, enfoque } = respuestas;
  
    const ejercicios = {
      abdomen: ["Planchas", "Crunches", "Elevación de piernas", "Bicicleta", "Russian twists"],
      piernas: ["Sentadillas", "Zancadas", "Puente de glúteos", "Steps", "Sentadilla sumo"],
      brazos: ["Flexiones", "Fondos de tríceps", "Boxeo sombra", "Curls", "Elevaciones laterales"],
      completo: ["Burpees", "Jumping Jacks", "Mountain Climbers", "High Knees", "Skipping"],
    };
  
    const enfoqueMap = {
      abdomen: "abdomen",
      piernas: "piernas",
      brazos: "brazos",
      "cuerpo completo": "completo",
    };
  
    const enfoqueFinal = enfoque?.length > 0 ? enfoque : ["Cuerpo completo"];
  
    const ejerciciosPorDia = tiempo === "10-20" ? 2 : tiempo === "20-30" ? 3 : 4;
    const tiempoPorEjercicio = Math.floor(
      (tiempo === "10-20" ? 20 : tiempo === "20-30" ? 30 : 45) / ejerciciosPorDia
    );
  
    return dias.map((dia) => {
      let diaEjercicios = [];
  
      const totalGrupos = enfoqueFinal.length;
      const ejerciciosPorGrupo = Math.max(1, Math.floor(ejerciciosPorDia / totalGrupos));
  
      enfoqueFinal.forEach((parte) => {
        const clave = enfoqueMap[parte.toLowerCase()];
        const disponibles = [...(ejercicios[clave] || [])];
  
        // Shuffle para variedad
        for (let i = disponibles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [disponibles[i], disponibles[j]] = [disponibles[j], disponibles[i]];
        }
  
        const seleccionados = disponibles.slice(0, ejerciciosPorGrupo);
        diaEjercicios.push(...seleccionados);
      });
  
      // Si faltan ejercicios para llenar el día, añade extras aleatorios
      while (diaEjercicios.length < ejerciciosPorDia) {
        const parteAleatoria = enfoqueFinal[Math.floor(Math.random() * enfoqueFinal.length)];
        const clave = enfoqueMap[parteAleatoria.toLowerCase()];
        const disponibles = ejercicios[clave].filter(e => !diaEjercicios.includes(e));
        if (disponibles.length > 0) {
          const extra = disponibles[Math.floor(Math.random() * disponibles.length)];
          diaEjercicios.push(extra);
        } else {
          break;
        }
      }
  
      return {
        dia,
        ejercicios: diaEjercicios.slice(0, ejerciciosPorDia).map((nombre) => ({
          nombre,
          duracion: tiempoPorEjercicio,
        })),
      };
    });
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        💪 Tu rutina personalizada —{" "}
        {objetivosDescriptivos[objetivo] || "Objetivo"}
      </h2>

      {rutina.length === 0 ? (
        <p className="text-center text-gray-500">Cargando rutina...</p>
      ) : (
        <div className="space-y-6">
          {rutina.map((r, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-lg p-4 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {r.dia}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {r.ejercicios.map((e, idx) => (
                  <li key={idx}>
                    {e.nombre} — <span className="font-semibold">{e.duracion} min</span>
                  </li>
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
// Este componente muestra la rutina generada al usuario. Utiliza useEffect para cargar la rutina desde el localStorage y la muestra en una lista.