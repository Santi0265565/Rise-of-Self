"use client"; // Necesario para usar interactividad

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 1. Importamos la herramienta
import Link from 'next/link';

export default function LoginPage() {
    // 2. Inicializamos la variable router AQUÍ
    const router = useRouter();

    // 3. Estado local para capturar inputs sin complicaciones
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 4. Petición al Backend Python
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Enviamos las variables del estado
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login correcto:", data);
                // 5. AHORA SÍ FUNCIONA EL ROUTER
                router.push('/dashboard');
            } else {
                alert("Error: " + data.detail);
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <main className="login-container">
            <div style={{ marginTop: '4rem' }}>
                <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', fontSize: '2.5rem' }}>Rise of Self</h1>
                <p className="tagline" style={{ textAlign: 'center', marginBottom: '2rem' }}>Convierte tu vida en una épica aventura</p>

                <form className="login-form" onSubmit={handleLogin}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>

                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label htmlFor="username" style={{ display: 'block', marginBottom: '.5rem' }}>Héroe (Usuario)</label>
                        <input 
                            type="text" 
                            id="username" 
                            required 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#222', color: 'white' }} 
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '.5rem' }}>Contraseña Secreta</label>
                        <input 
                            type="password" 
                            id="password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#222', color: 'white' }} 
                        />
                    </div>

                    <button type="submit" className="button-primary" style={{ width: '100%', background: 'var(--color-primary)', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Entrar a la Aventura
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
                    ¿Aún no tienes cuenta? <Link href="#" style={{ color: 'var(--color-primary)' }}>Regístrate aquí</Link>.
                </p>
            </div>
        </main>
    );
}