// src/pages/DashboardPage.tsx

import React, { useState } from 'react'; 
import Header from '../components/Header';
import QuestItem from '../components/QuestItem';
import { Quest } from '../types/quest'; 

const initialQuests: Quest[] = [
    { 
        id: 1, 
        title: "Estudiar italiano",
        description: "Aprender las bases del italiano",
        xp: 75,
        attribute: '🧠'
    },
    { 
        id: 2, 
        title: "Entrenamiento de Héroe", 
        description: "Rutina de gym",
        xp: 30,
        attribute: '💪'
    },
    { 
        id: 3, 
        title: "Planificación Semanal",
        description: "Organizar las actividades de la semana.",
        xp: 40,
        attribute: '🧘🏻'
    },
];


const DashboardPage: React.FC = () => 
    {
        //

    const [quests, setQuests] = useState<Quest[]>(initialQuests);
    //Está agarrando una lista de las misiones con sus atributos

    const handleCompleteQuest = (idToDelete: number) => 
        {
        console.log(`Completando misión con ID: ${idToDelete}`);
        
        // Borra la misión y crea una nueva lista sin esa misión.
        const updatedQuests = quests.filter(quest => quest.id !== idToDelete);
        setQuests(updatedQuests); // Actualizamos el estado 
    };
    
    return (
        <>
            <Header />
            <main className="dashboard-content">
                <section className="hero-summary">
                    {/* La sección de héroe se mantiene igual */}
                    <h2>¡Bienvenido, Héroe!</h2>
                    <div className="stats-container">
                         {/* Aquí están las barras de progreso*/}
                    </div>
                </section>

                <section className="today-quests">
                    <h2>Misiones de Hoy</h2>
                    <ul className="quest-list">
                        {/* El map recorre todas las misiones, el objeto y la función que elimina las misiones */}
                        {quests.map(quest => (
                            <QuestItem
                                key={quest.id} 
                                quest={quest} 
                                onComplete={handleCompleteQuest} 
                            />
                        ))}
                    </ul>
                </section>
                
                {/* El formulario de nueva mision es el mismo */}
                <section className="quick-add">
                     <h2>Añadir Misión Rápida</h2>
                     <form className="quick-add-form">
                        <input type="text" placeholder="Ej: Meditar por 10 minutos..."/>
                        <button type="submit" className="button-primary">Añadir</button>
                     </form>
                </section>
            </main>
        </>
    );
}

export default DashboardPage;