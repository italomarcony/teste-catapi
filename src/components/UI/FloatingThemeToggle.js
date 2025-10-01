import React from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * FloatingThemeToggle - Botão flutuante fixo para alternar tema
 */
function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 group"
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Tema ${theme === 'light' ? 'Claro' : 'Escuro'}`}
    >
      {theme === 'light' ? (
        // Ícone de Lua (Dark Mode)
        <svg
          className="w-7 h-7 text-gray-700 group-hover:text-primary-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        // Ícone de Sol (Light Mode)
        <svg
          className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default FloatingThemeToggle;
