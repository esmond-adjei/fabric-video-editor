"use client";

import React from 'react';
import { useTheme } from './ThemeProvider';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-full transition-colors hover:bg-primary-100 dark:hover:bg-primary-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdOutlineDarkMode className="h-5 w-5 text-zinc-800" />
      ) : (
        <MdOutlineLightMode className="h-5 w-5 text-white" />
      )}
    </button>
  );
};
