"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import { useGame, ArmoryItem } from '../../context/Gamecontext';

export default function ArmoryPage() {
    const { inventory, addItem } = useGame();

    const [newItemName, setNewItemName] = useState("");
    const [newItemStats, setNewItemStats] = useState("");
    const [newItemImage, setNewItemImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewItemImage(imageUrl);
        }
    };

    const handleCreateItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName || !newItemStats || !newItemImage) return alert("Llena todos los campos");

        const newItem: ArmoryItem = {
            id: Date.now(),
            name: newItemName,
            stats: newItemStats,
            image: newItemImage
        };

        addItem(newItem); 
        
        setNewItemName("");
        setNewItemStats("");
        setNewItemImage(null);
    };

    return (
        <>
            <Header />
            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
                
                <h1 style={{fontSize: '2rem', marginBottom: '0.5rem'}}>Armería de Estilo 🛡️</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Equípate para maximizar tus stats en la vida real.
                </p>

                <section style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333', marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>+ Añadir Nueva Prenda</h3>
                    
                    <form onSubmit={handleCreateItem} style={{ display: 'grid', gap: '1rem' }}>
                        
                        <div>
                            <label style={{display:'block', marginBottom:'5px', fontSize:'0.9rem'}}>Nombre de la prenda</label>
                            <input type="text" placeholder="Ej: Camisa de la Suerte" 
                                value={newItemName} onChange={(e) => setNewItemName(e.target.value)}
                                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #444', background:'#222', color:'white'}}
                            />
                        </div>

                        <div>
                            <label style={{display:'block', marginBottom:'5px', fontSize:'0.9rem'}}>Bonus / Stats</label>
                            <input type="text" placeholder="Ej: +10 Confianza" 
                                value={newItemStats} onChange={(e) => setNewItemStats(e.target.value)}
                                style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #444', background:'#222', color:'white'}}
                            />
                        </div>

                        <div>
                            <label style={{display:'block', marginBottom:'5px', fontSize:'0.9rem'}}>Foto</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload}
                                style={{color: '#aaa'}} 
                            />
                        </div>

                        {newItemImage && (
                            <div style={{textAlign:'center', margin:'1rem 0'}}>
                                <img src={newItemImage} alt="Preview" style={{height:'150px', borderRadius:'8px', border:'2px solid var(--color-primary)'}} />
                            </div>
                        )}

                        <button type="submit" className="button-primary" style={{ marginTop:'1rem', background: 'var(--color-primary)', border: 'none', padding: '12px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                            Guardar en Inventario
                        </button>
                    </form>
                </section>

                <h3 style={{marginBottom: '1rem'}}>Tu Inventario</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {inventory.map(item => (
                        <article key={item.id} style={{ 
                            background: 'var(--color-surface)', 
                            borderRadius: '12px', 
                            overflow: 'hidden', 
                            border: '1px solid #333',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                            transition: 'transform 0.2s ease'
                        }}>
                            <div style={{ height: '220px', background: '#000', overflow: 'hidden' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            
                            <div style={{ padding: '1rem' }}>
                                <h3 style={{ color: 'var(--color-primary)', margin: '0 0 0.5rem 0', fontSize:'1.1rem' }}>{item.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#aaa', fontStyle:'italic', margin:0 }}>
                                    {item.stats}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

            </main>
        </>
    );
}