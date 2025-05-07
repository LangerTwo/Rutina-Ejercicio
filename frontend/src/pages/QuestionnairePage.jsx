import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionnairePage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        objetivo: "",
        tiempo: "",
        dias: [],
        enfoque: [],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (name, value) => {
        const current = form[name];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        setForm({ ...form, [name]: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevaRutina = {
            id: Date.now(),
            nombre: `Rutina de ${form.enfoque.join(", ") || "cuerpo completo"}`,
            ...form,
        };

        const rutinasGuardadas = JSON.parse(localStorage.getItem("rutinas")) || [];
        const actualizadas = [...rutinasGuardadas, nuevaRutina];

        localStorage.setItem("rutinas", JSON.stringify(actualizadas));
        localStorage.setItem("cuestionario", JSON.stringify(nuevaRutina));

        alert("Rutina creada con éxito ✅");
        navigate(`/rutina/${nuevaRutina.id}`);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">📝 Cuestionario de Rutina</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-1">🎯 Objetivo principal:</label>
                    <select
                        name="objetivo"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Selecciona</option>
                        <option value="bajar">Bajar de peso</option>
                        <option value="tonificar">Tonificar</option>
                        <option value="masa">Ganar masa</option>
                        <option value="mantener">Mantenerme activo</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">⏱️ ¿Cuánto tiempo al día?</label>
                    <select
                        name="tiempo"
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Selecciona</option>
                        <option value="10-20">10-20 min</option>
                        <option value="20-30">20-30 min</option>
                        <option value="30-45">30-45 min</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">📅 Días disponibles:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                            <label key={dia} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={form.dias.includes(dia)}
                                    onChange={() => handleCheckboxChange("dias", dia)}
                                    className="accent-blue-500"
                                />
                                <span>{dia}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-2">💪 Enfoque corporal:</label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Abdomen", "Piernas", "Brazos", "Cuerpo completo"].map((parte) => (
                            <label key={parte} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={form.enfoque.includes(parte)}
                                    onChange={() => handleCheckboxChange("enfoque", parte)}
                                    className="accent-blue-500"
                                />
                                <span>{parte}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
                >
                    Generar rutina
                </button>
            </form>
        </div>
    );
};

export default QuestionnairePage;