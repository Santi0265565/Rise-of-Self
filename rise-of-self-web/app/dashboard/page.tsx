"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import QuestItem from '../../components/QuestItem';
import { useGame } from '@/context/Gamecontext'; 

const ATTRIBUTE_MAP = {
    mind: { icon: "🧠", label: "Mente", color: "#d2b4de" },
    body: { icon: "💪", label: "Cuerpo", color: "#e6b0aa" },
    spirit: { icon: "✨", label: "Espíritu", color: "#aed6f1" }
};

const getTierStyles = (level: number) => {
    if (level >= 50) return { bar: 'tier-diamond', badge: 'badge-diamond', name: 'DIAMANTE' };
    if (level >= 31) return { bar: 'tier-gold', badge: 'badge-gold', name: 'ORO' };
    if (level >= 11) return { bar: 'tier-silver', badge: 'badge-silver', name: 'PLATA' };
    return { bar: 'tier-bronze', badge: 'badge-bronze', name: 'BRONCE' };
};

export default function Dashboard() {
    const { hero, totalLevel, quests, completeQuest, addQuest } = useGame();

    const [newTask, setNewTask] = useState("");
    const [selectedType, setSelectedType] = useState<'mind' | 'body' | 'spirit'>('mind');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        addQuest(newTask, selectedType); 
        setNewTask("");
    };

    const getProgressWidth = (current: number, max: number) => `${Math.min((current / max) * 100, 100)}%`;

    return (
        <>
            <Header />
            <main>
                <div className="hero-card">
                    <div className="avatar-section">
                        <div className="avatar-frame">
                            <img src={hero.avatarUrl} alt="Avatar" style={{width: '100%', height:'100%', objectFit:'cover'}} />
                        </div>
                        <div className="hero-level-badge">Nvl. {totalLevel}</div>
                    </div>

                    <div className="stats-section" style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
                        <div className="hero-title">
                            <h1>{hero.name}</h1>
                            <p style={{color: '#888', fontSize:'0.9rem'}}>{hero.class}</p>
                        </div>

                        {['mind', 'body', 'spirit'].map((key) => {
                            const type = key as 'mind' | 'body' | 'spirit';
                            const attr = hero.attributes[type];
                            const tier = getTierStyles(attr.level);
                            const info = ATTRIBUTE_MAP[type];
                            
                            return (
                                <div key={key} className="rpg-stat-block">
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px'}}>
                                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                            <span style={{fontSize:'1.5rem'}}>{info.icon}</span> 
                                            <span style={{fontWeight:'bold', color: info.color}}>{info.label.toUpperCase()}</span>
                                        </div>
                                        <span className={tier.badge} style={{padding:'2px 12px', borderRadius:'10px', fontSize:'0.75rem'}}>
                                            Nv. {attr.level} • {tier.name}
                                        </span>
                                    </div>
                                    <div className="rpg-progress-track">
                                        <div className={`rpg-progress-fill ${tier.bar}`} 
                                             style={{ width: getProgressWidth(attr.currentXP, attr.maxXP) }}>
                                        </div>
                                        <div className="xp-badge-float">
                                            {attr.currentXP} / {attr.maxXP} XP
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <section>
                    <h2 style={{ marginTop: '2rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Misiones Activas</h2>
                    <ul className="quest-list" style={{marginTop: '1rem'}}>
                        {quests.map(q => (
                            <QuestItem key={q.id} quest={q} onComplete={completeQuest} />
                        ))}
                    </ul>
                </section>

                <section style={{ marginTop: '2rem', background: '#181818', padding: '1.5rem', borderRadius: '8px', border: '1px dashed #444' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap:'wrap' }}>
                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as any)} style={{padding: '10px', borderRadius: '4px', background: '#222', color: 'white'}}>
                            <option value="mind">🧠 Mente</option>
                            <option value="body">💪 Cuerpo</option>
                            <option value="spirit">✨ Espíritu</option>
                        </select>
                        <input type="text" placeholder="Misión..." value={newTask} onChange={(e) => setNewTask(e.target.value)} style={{flexGrow: 1, padding: '10px', borderRadius: '4px', background: '#0a0a0a', color: 'white', minWidth:'200px'}} />
                        <button className="button-primary" style={{padding: '0 20px'}}>Crear</button>
                    </form>
                </section>
            </main>
        </>
    );
}