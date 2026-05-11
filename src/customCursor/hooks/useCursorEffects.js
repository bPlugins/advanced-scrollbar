import { useState } from 'react';
import { EffectType } from './effectTypes';

export const useCursorEffects = () => {
    const [effects, setEffects] = useState([]);

    const addEffect = (x, y, type) => {
        const effectType = type || getRandomEffectType();
        const newEffect = {
            id: Math.random().toString(36).substring(2, 9),
            x,
            y,
            type: effectType,
            createdAt: Date.now(),
        };

        setEffects((prevEffects) => [...prevEffects, newEffect]);

        // Auto-remove effect after animation completes (2 seconds)
        setTimeout(() => {
            removeEffect(newEffect.id);
        }, 2000);
    };

    const removeEffect = (id) => {
        setEffects((prevEffects) => prevEffects.filter((effect) => effect.id !== id));
    };

    const getRandomEffectType = () => {
        const effectTypes = Object.values(EffectType);
        const randomIndex = Math.floor(Math.random() * effectTypes.length);
        return effectTypes[randomIndex];
    };

    return {
        effects,
        addEffect,
        removeEffect
    };
};