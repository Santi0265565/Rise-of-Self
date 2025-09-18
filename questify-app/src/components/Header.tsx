// src/components/Header.tsx

import React from 'react'; 

const Header: React.FC = () => { {/* Esto crea el componente funcional que es Header */}
    return (
        <header className="main-header"> {/* Se utiliza aquí el className*/}
            <a href="/dashboard" className="logo">Rise of self</a>
            <nav className="main-nav">
                <ul>
                    <li><a href="/dashboard">Panel Principal</a></li>
                    <li><a href="/quests">Misiones</a></li>
                    <li><a href="/armory">Armería</a></li>
                    <li><a href="/profile">Perfil</a></li> 
                    <li><a href="/">Cerrar Sesión</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;