// src/components/QuestItem.tsx

import React from 'react';
import { Quest } from '../types/quest'; 


interface QuestItemProps 
{
    quest: Quest; // Crea un objeto que recibe a Quest 
    onComplete: (id: number) => void; // Es una función que recibe un número y no devuleve nada
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, onComplete }) => 
    {
    return (
        // Usamos el objeto que recibimos de Quest
        <li className="quest-item">
            <div className="quest-info">
                <h3>{quest.title}</h3>
                <p>{quest.description}</p>
            </div>
            <div className="quest-actions">
                <span>+{quest.xp} XP {quest.attribute}</span>
                {/* Cuando haces click llamas a la función para que se complete una miisión */}
                <button 
                    onClick={() => onComplete(quest.id)} 
                    className="button-complete" >
                    Completar
                </button>
            </div>
        </li>
    );
}

export default QuestItem;