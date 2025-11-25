"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- TIPOS DE DATOS ---
type AttributeStat = { level: number; currentXP: number; maxXP: number; };
type HeroStats = { 
    name: string; 
    class: string; 
    avatarUrl: string; 
    attributes: { mind: AttributeStat; body: AttributeStat; spirit: AttributeStat; };
};
export type Quest = {
    id: number;
    title: string;
    xp: number;
    attribute: string;
    type: 'mind' | 'body' | 'spirit';
};

export type ArmoryItem = {
    id: number;
    name: string;
    image: string; 
    stats: string; 
};

interface GameContextType {
    hero: HeroStats;
    quests: Quest[];
    totalLevel: number;
    inventory: ArmoryItem[];
    gainXP: (type: 'mind' | 'body' | 'spirit', amount: number) => void;
    completeQuest: (id: number) => void;
    addQuest: (title: string, type: 'mind'|'body'|'spirit') => void;
    addItem: (item: ArmoryItem) => void; // Nueva función
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const ATTR_INFO = { mind: { icon: "🧠" }, body: { icon: "💪" }, spirit: { icon: "✨" } };

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [hero, setHero] = useState<HeroStats>({
        name: "Santi",
        class: "Lord Sith",
        avatarUrl: "https://www.shutterstock.com/image-vector/darth-vader-helmet-logo-universe-600nw-2350946717.jpg",
        attributes: {
            mind: { level: 12, currentXP: 0, maxXP: 100 },
            body: { level: 35, currentXP: 0, maxXP: 100 },
            spirit: { level: 100, currentXP: 0, maxXP: 100 }
        }
    });
    const totalLevel = hero.attributes.mind.level + hero.attributes.body.level + hero.attributes.spirit.level - 2;

    const [quests, setQuests] = useState<Quest[]>([
        { id: 1, title: "Leer documentación", xp: 50, attribute: "🧠", type: 'mind' },
        { id: 2, title: "Salir a correr", xp: 40, attribute: "💪", type: 'body' },
    ]);

    const [inventory, setInventory] = useState<ArmoryItem[]>([
        { id: 101, name: "Traje de Entrevista", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/467px-Tom_Cruise_by_Gage_Skidmore_2.jpg", stats: "+10 Confianza, +5 Carisma" },
        { id: 102, name: "Ropa de Gym", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Sport_clothes.jpg/640px-Sport_clothes.jpg", stats: "+5 Fuerza, +10 Resistencia" }
    ]);

    const gainXP = (type: 'mind'|'body'|'spirit', amount: number) => {
        setHero(prev => {
            const newHero = { ...prev, attributes: { ...prev.attributes } };
            const targetAttr = { ...newHero.attributes[type] };
            targetAttr.currentXP += amount;
            while (targetAttr.currentXP >= targetAttr.maxXP) {
                targetAttr.currentXP -= targetAttr.maxXP;
                targetAttr.level += 1;
                targetAttr.maxXP = Math.floor(targetAttr.maxXP * 1.2);
                alert("¡LEVEL UP!");
            }
            newHero.attributes[type] = targetAttr;
            return newHero;
        });
    };

    const completeQuest = (id: number) => {
        const q = quests.find(x => x.id === id);
        if (q) { gainXP(q.type, q.xp); setQuests(prev => prev.filter(x => x.id !== id)); }
    };

    const addQuest = (title: string, type: 'mind'|'body'|'spirit') => {
        const newQ: Quest = { id: Date.now(), title, xp: 25, type, attribute: ATTR_INFO[type].icon };
        setQuests(p => [...p, newQ]);
    };

    const addItem = (item: ArmoryItem) => {
        setInventory(prev => [...prev, item]);
    };

    return (
        <GameContext.Provider value={{ hero, quests, inventory, totalLevel, gainXP, completeQuest, addQuest, addItem }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame error");
    return context;
};