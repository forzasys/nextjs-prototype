'use client';

import { useEffect } from 'react';

type ThemeType = {
    '--primary-color': string;
    '--secondary-color': string;
}

interface Theme {
    [key: string]: ThemeType;
}

const themes: Theme = {
  default: {
    '--primary-color': '#4a90e2',
    '--secondary-color': '#333333',
  },
  vif: {
    '--primary-color': '#022ca1',
    '--secondary-color': '#ed1b2e',
  },
  brann: {
    '--primary-color': '#de1215',
    '--secondary-color': '#eee',
  } 
}

export default function ThemeInitializer() {
  useEffect(() => {
    const target = process.env.NEXT_PUBLIC_TARGET;
    const root = document.documentElement;

    const theme = themes[target || 'default'];

    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);

  return null;
}