// src/app/missions/page.tsx
"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

// Tipos de datos
interface QuestData {
    id: number;
    title: string;
    xp: number;
    type: 'mind' | 'body' | 'spirit';
    date?: string; // Fecha de completado para el historial
}

// Mapa de Iconos y Colores (Reutilizado para consistencia)
const ATTR_INFO = {
    mind: { icon: "🧠", label: "Mente", color: "#d2b4de" },
    body: { icon: "💪", label: "Cuerpo", color: "#e6b0aa" },
    spirit: { icon: "✨", label: "Espíritu", color: "#aed6f1" }
};

export default function MissionsPage() {
    // --- ESTADO DE LA PÁGINA ---
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [filter, setFilter] = useState<'all' | 'mind' | 'body' | 'spirit'>('all');

    // --- DATOS MOCK (SIMULADOS) ---
    // En el futuro esto vendrá de tu base de datos Python
    const activeQuests: QuestData[] = [
        { id: 1, title: "Leer documentación de Next.js", xp: 50, type: 'mind' },
        { id: 2, title: "Salir a correr 5km", xp: 100, type: 'body' },
        { id: 3, title: "Planificar la semana", xp: 30, type: 'spirit' },
    ];

    const historyQuests: QuestData[] = [
        { id: 101, title: "Instalar Node.js", xp: 20, type: 'mind', date: '22/11/2025' },
        { id: 102, title: "Comer ensalada", xp: 30, type: 'body', date: '21/11/2025' },
        { id: 103, title: "Llamar a mamá", xp: 50, type: 'spirit', date: '20/11/2025' },
        { id: 104, title: "Terminar curso de SQL", xp: 150, type: 'mind', date: '18/11/2025' },
    ];

    // --- LÓGICA DE FILTRADO ---
    const listToRender = activeTab === 'active' ? activeQuests : historyQuests;
    
    const filteredList = listToRender.filter(quest => {
        if (filter === 'all') return true;
        return quest.type === filter;
    });

    return (
        <>
            <Header />
            <main style={{maxWidth:'900px', margin:'0 auto', padding:'2rem'}}>
                
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
                    <h1>Grimorio de Misiones 📜</h1>
                    
                    {/* Botón de Acción Principal */}
                    <Link href="/dashboard">
                        <button className="button-primary" style={{background: 'var(--color-primary)', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px'}}>
                            + Nueva Misión
                        </button>
                    </Link>
                </div>

                {/* --- CONTROLES: PESTAÑAS Y FILTROS --- */}
                <div style={{background: 'var(--color-surface)', padding:'1rem', borderRadius:'12px', border:'1px solid #333', marginBottom:'2rem'}}>
                    
                    {/* TABS SUPERIORES */}
                    <div style={{display:'flex', borderBottom:'1px solid #333', paddingBottom:'1rem', marginBottom:'1rem', gap:'1rem'}}>
                        <button 
                            onClick={() => setActiveTab('active')}
                            style={{
                                background: 'none', border: 'none', color: activeTab === 'active' ? 'var(--color-primary)' : '#666',
                                fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
                                borderBottom: activeTab === 'active' ? '2px solid var(--color-primary)' : '2px solid transparent'
                            }}>
                            En Curso ⚔️
                        </button>
                        <button 
                            onClick={() => setActiveTab('history')}
                            style={{
                                background: 'none', border: 'none', color: activeTab === 'history' ? 'var(--color-primary)' : '#666',
                                fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
                                borderBottom: activeTab === 'history' ? '2px solid var(--color-primary)' : '2px solid transparent'
                            }}>
                            Historial (Legado) 🏺
                        </button>
                    </div>

                    {/* FILTROS (CHIPS) */}
                    <div style={{display:'flex', gap:'10px'}}>
                        <span style={{alignSelf:'center', color:'#888', fontSize:'0.9rem', marginRight:'10px'}}>Filtrar por:</span>
                        
                        {['all', 'mind', 'body', 'spirit'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type as any)}
                                style={{
                                    padding: '5px 12px', borderRadius: '20px',
                                    border: filter === type ? `1px solid var(--color-primary)` : '1px solid #333',
                                    background: filter === type ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: filter === type ? 'white' : '#666',
                                    cursor: 'pointer', textTransform: 'capitalize'
                                }}>
                                {type === 'all' ? 'Todos' : `${ATTR_INFO[type as 'mind'].icon} ${ATTR_INFO[type as 'mind'].label}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- LISTA DE RESULTADOS --- */}
                <div className="quest-list-container">
                    {filteredList.length === 0 ? (
                        <div style={{textAlign:'center', padding:'3rem', color:'#666', border:'2px dashed #333', borderRadius:'12px'}}>
                            <p>No se encontraron misiones en esta categoría.</p>
                        </div>
                    ) : (
                        <div style={{display:'grid', gap:'1rem'}}>
                            {filteredList.map(quest => (
                                <div key={quest.id} 
                                    style={{
                                        display:'flex', justifyContent:'space-between', alignItems:'center',
                                        padding:'1.5rem', 
                                        background: activeTab === 'history' ? '#1a1a1a' : 'var(--color-surface)', // Más oscuro si es historial
                                        borderRadius:'8px', border:'1px solid #333',
                                        opacity: activeTab === 'history' ? 0.7 : 1 // Efecto visual de "pasado"
                                    }}>
                                    
                                    <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
                                        {/* Icono Grande */}
                                        <div style={{fontSize:'2rem', width:'50px', textAlign:'center'}}>
                                            {ATTR_INFO[quest.type].icon}
                                        </div>
                                        <div>
                                            {/* Título Táchado si es historial */}
                                            <h3 style={{margin:0, textDecoration: activeTab === 'history' ? 'line-through' : 'none', color: activeTab === 'history' ? '#888' : 'white'}}>
                                                {quest.title}
                                            </h3>
                                            <p style={{margin:0, fontSize:'0.9rem', color: ATTR_INFO[quest.type].color}}>
                                                +{quest.xp} XP {ATTR_INFO[quest.type].label.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Parte Derecha: Fecha o Estado */}
                                    <div>
                                        {activeTab === 'history' ? (
                                            <span style={{color:'#f1c40f', fontWeight:'bold', border:'1px solid #f1c40f', padding:'5px 10px', borderRadius:'4px', fontSize:'0.8rem'}}>
                                                ✓ Completada: {quest.date}
                                            </span>
                                        ) : (
                                            <span style={{color:'#4ade80', fontSize:'0.9rem'}}>En Progreso...</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </>
    );
}