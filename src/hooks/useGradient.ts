import { useState, useCallback } from 'react';
import { ColorStop, GradientConfig } from '@/types/gradient';
import chroma from 'chroma-js';

export function useGradient() {
  const [direction, setDirection] = useState('to right');
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#ff6b6b', position: 0, opacity: 1 },
    { id: '2', color: '#4ecdc4', position: 100, opacity: 1 }
  ]);

  const generateCss = useCallback(() => {
    const stopStrings = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => {
        const color = chroma(stop.color).alpha(stop.opacity).css();
        return `${color} ${stop.position}%`;
      });
    
    return `linear-gradient(${direction}, ${stopStrings.join(', ')})`;
  }, [direction, colorStops]);

  const addColorStop = useCallback(() => {
    const newPosition = colorStops.length > 0 
      ? Math.min(100, Math.max(...colorStops.map(s => s.position)) + 20)
      : 50;
    
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      position: newPosition,
      opacity: 1
    };
    
    setColorStops(prev => [...prev, newStop]);
  }, [colorStops]);

  const removeColorStop = useCallback((id: string) => {
    if (colorStops.length > 2) {
      setColorStops(prev => prev.filter(stop => stop.id !== id));
    }
  }, [colorStops]);

  const updateColorStop = useCallback((id: string, updates: Partial<ColorStop>) => {
    setColorStops(prev => 
      prev.map(stop => 
        stop.id === id ? { ...stop, ...updates } : stop
      )
    );
  }, []);

  const resetGradient = useCallback(() => {
    setDirection('to right');
    setColorStops([
      { id: '1', color: '#ff6b6b', position: 0, opacity: 1 },
      { id: '2', color: '#4ecdc4', position: 100, opacity: 1 }
    ]);
  }, []);

  const loadGradient = useCallback((config: GradientConfig) => {
    setDirection(config.direction);
    setColorStops(config.colorStops);
  }, []);

  return {
    direction,
    colorStops,
    setDirection,
    generateCss,
    addColorStop,
    removeColorStop,
    updateColorStop,
    resetGradient,
    loadGradient
  };
}