'use client';

import { useEffect } from 'react';

type ThemeType = {
    '--primary-color': string;
    '--secondary-color': string;
    '--header-color'?: string;
    '--accent-color'?: string;
    '--text-color'?: string;
    '--header-text-color'?: string;
    '--secondary-text-color'?: string;
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
    '--secondary-color': '#00007d',
    // '--primary-color': '#022ca1',
    // '--secondary-color': '#171791',
    '--header-color': "#FFFFFF",
    '--accent-color': '#da1828',
    '--text-color': '#FFFFFF',
    '--header-text-color': "#000000",
    '--secondary-text-color': '#00007d',
  },
  brann: {
    '--primary-color': '#de1215',
    '--secondary-color': "#b00c0f",
    '--header-color': "#FFFFFF",
    '--accent-color': "#ffb300",
    '--text-color': '#FFFFFF',
    '--header-text-color': "#000000",
    '--secondary-text-color': "#000000",
  },
  shl: {
    '--primary-color': "#000000",
    '--secondary-color': "#1b1f26",
    '--header-color': "#1b1f26",
    '--accent-color': "#67a4ff",
    // '--accent-color': "#ffb300",
    '--text-color': '#FFFFFF',
    '--header-text-color': "#FFFFFF",
    '--secondary-text-color': '#000000',
  },
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