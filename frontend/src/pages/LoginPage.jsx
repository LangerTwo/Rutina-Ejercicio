import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
            // console.log("Token recibido:", res.data.token);
            alert("Login exitoso ✅");
            window.location.href = "/dashboard";
        } catch (error) {
            alert("Error al iniciar sesión ❌");
        }
    };

    return (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginPage;