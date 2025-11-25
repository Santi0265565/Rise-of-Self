// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="main-header">
            
            {/* Aquí va el Logo/Título a la izquierda */}
            <Link href="/dashboard" className="logo">Rise of Self</Link>

            {/* Aquí va la navegación a la derecha */}
            <nav className="main-nav">
                <ul>
                    {/* Enlace al Dashboard */}
                    <li><Link href="/dashboard">Panel</Link></li>
                    
                    {/* Enlace a Misiones */}
                    <li><Link href="/missions">Misiones</Link></li>
                    
                    {/* Enlace a la Armería */}
                    <li><Link href="/armory">Armería</Link></li>
                    
                    {/* Enlace para Salir (color rojo) */}
                    <li><Link href="/login" style={{color: '#ff5555'}}>Salir</Link></li>
                </ul>
            </nav>
            
        </header>
    );
}

export default Header;