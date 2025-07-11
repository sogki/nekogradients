export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  gradients: {
    hero: string;
    card: string;
    button: string;
  };
}

export const themes: ThemeConfig[] = [
  {
    id: 'neko-dark',
    name: 'Neko Dark',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#06b6d4',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#ffffff',
      muted: '#64748b'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      card: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
      button: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
    }
  },
  {
    id: 'neko-light',
    name: 'Neko Light',
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      muted: '#64748b'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      card: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
      button: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
    }
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      primary: '#ff0080',
      secondary: '#00ffff',
      accent: '#ffff00',
      background: '#0a0a0a',
      surface: '#1a0a1a',
      text: '#ffffff',
      muted: '#888888'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #ff0080 0%, #00ffff 100%)',
      card: 'linear-gradient(145deg, #1a0a1a 0%, #2a0a2a 100%)',
      button: 'linear-gradient(135deg, #ff0080 0%, #00ffff 100%)'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#64748b'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
      card: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
      button: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    colors: {
      primary: '#f97316',
      secondary: '#ec4899',
      accent: '#eab308',
      background: '#1c1917',
      surface: '#292524',
      text: '#fafaf9',
      muted: '#78716c'
    },
    gradients: {
      hero: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
      card: 'linear-gradient(145deg, #292524 0%, #3c3c3c 100%)',
      button: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)'
    }
  }
];