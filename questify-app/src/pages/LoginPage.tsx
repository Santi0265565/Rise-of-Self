// src/pages/LoginPage.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginPage: React.FC = () => 
    {

    const navigate = useNavigate();

    // Se envía para el formulario
    const handleLogin = (e: React.FormEvent) => {
        // Deja que pase el usuario
        e.preventDefault();

        // Lo registramos en la consola
        console.log("Simulando inicio de sesión... Redirigiendo al dashboard.");

        // Cambia la ruta a dashboard
        navigate('/dashboard');
    };

    return (
        <main className="login-container">
            <h1>Rise of self</h1>
            <p className="tagline">Convierte tu vida en una épica aventura</p>

            {/* Cuando se llama la función handlelogin al dar el click en el botón se envia el formulario */}
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Iniciar Sesión</h2>
                
                <div className="form-group">
                    <label htmlFor="username">Nombre de Héroe (Usuario)</label>
                    <input type="text" id="username" name="username" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Contraseña Secreta</label>
                    <input type="password" id="password" name="password" />
                </div>
                
                <button type="submit" className="button-primary">Entrar a la Aventura</button>
            </form>

            <p className="auth-switch">
                ¿Aún no tienes una cuenta? <a href="#">Regístrate aquí</a>.
            </p>
        </main>
    );
}

export default LoginPage;