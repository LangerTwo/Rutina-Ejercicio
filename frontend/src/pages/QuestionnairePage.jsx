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
        // Aquí puedes enviar el formulario al backend
        localStorage.setItem("cuestionario", JSON.stringify(form));
        console.log("Formulario enviado:", form);
        alert("Formulario enviado con éxito ✅");
        navigate("/rutina");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cuestionario de Rutina</h2>

            <label>Objetivo principal:</label>
            <select name="objetivo" onChange={handleChange} required>
                <option value="">Selecciona</option>
                <option value="bajar">Bajar de peso</option>
                <option value="tonificar">Tonificar</option>
                <option value="masa">Ganar masa</option>
                <option value="mantener">Mantenerme activo</option>
            </select>

            <label>¿Cuánto tiempo al día?</label>
            <select name="tiempo" onChange={handleChange} required>
                <option value="">Selecciona</option>
                <option value="10-20">10-20 min</option>
                <option value="20-30">20-30 min</option>
                <option value="30-45">30-45 min</option>
            </select>

            <label>Días disponibles:</label>
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia) => (
                <div key={dia}>
                <input
                    type="checkbox"
                    checked={form.dias.includes(dia)}
                    onChange={() => handleCheckboxChange("dias", dia)}
                />
                <label>{dia}</label>
                </div>
            ))}

            <label>Enfoque corporal:</label>
                {["Abdomen", "Piernas", "Brazos", "Cuerpo completo"].map((parte) => (
                    <div key={parte}>
                    <input
                        type="checkbox"
                        checked={form.enfoque.includes(parte)}
                        onChange={() => handleCheckboxChange("enfoque", parte)}
                    />
                    <label>{parte}</label>
                    </div>
                ))}

            <button type="submit">Generar rutina</button>
        </form>
    );
};

export default QuestionnairePage;