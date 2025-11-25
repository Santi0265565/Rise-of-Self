import React from 'react';

export interface Quest {
    id: number;
    title: string;
    xp: number;
    attribute: string;
    type?: 'mind' | 'body' | 'spirit'; 
}

interface QuestItemProps {
    quest: Quest;
    onComplete: (id: number) => void;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, onComplete }) => {
    return (
        <li className="quest-item">
            <div>
                <h3>{quest.title}</h3>
                <small style={{color: '#aaa'}}>+{quest.xp} XP {quest.attribute}</small>
            </div>
            <button 
                onClick={() => onComplete(quest.id)}
                className="button-complete"
            >
                Completar
            </button>
        </li>
    );
}
export default QuestItem;