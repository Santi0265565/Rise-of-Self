// src/types/quest.d.ts

export interface Quest 
{
    id: number;
    title: string;
    description: string;
    xp: number;
    attribute: '🧠' | '💪' | '🧘🏻'; 
}