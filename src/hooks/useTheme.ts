import { useEffect, useState } from 'react';
import { ThemeConfig, themes } from '@/types/theme';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themes[0]); // Default to Neko Dark

  useEffect(() => {
    const savedThemeId = localStorage.getItem('neko-theme');
    const savedTheme = themes.find(t => t.id === savedThemeId);
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.colors.primary);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--theme-accent', currentTheme.colors.accent);
    root.style.setProperty('--theme-background', currentTheme.colors.background);
    root.style.setProperty('--theme-surface', currentTheme.colors.surface);
    root.style.setProperty('--theme-text', currentTheme.colors.text);
    root.style.setProperty('--theme-muted', currentTheme.colors.muted);
    
    // Apply gradients
    root.style.setProperty('--theme-gradient-hero', currentTheme.gradients.hero);
    root.style.setProperty('--theme-gradient-card', currentTheme.gradients.card);
    root.style.setProperty('--theme-gradient-button', currentTheme.gradients.button);

    // Set dark class based on theme
    const isDark = currentTheme.id !== 'neko-light';
    document.documentElement.classList.toggle('dark', isDark);
    
    localStorage.setItem('neko-theme', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return { 
    currentTheme, 
    setTheme, 
    themes,
    isDark: currentTheme.id !== 'neko-light'
  };
}