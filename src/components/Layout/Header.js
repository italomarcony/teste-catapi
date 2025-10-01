import React from 'react';
import ThemeToggle from '../UI/ThemeToggle';

function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center justify-center gap-3">
          <svg
            className="w-10 h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5c.56.56 1.45.56 2.01 0L12 14.01l3.49 3.49c.56.56 1.45.56 2.01 0s.56-1.45 0-2.01L14.01 12l3.49-3.49c.56-.56.56-1.45 0-2.01s-1.45-.56-2.01 0L12 9.99 8.51 6.5c-.56-.56-1.45-.56-2.01 0s-.56 1.45 0 2.01L9.99 12l-3.49 3.49c-.56.56-.56 1.45 0 2.01z" />
          </svg>
          <h1 className="text-4xl font-bold">Raças de Gatos</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <ThemeToggle />
        </div>
        </div>
        <p className="text-center text-primary-100 dark:text-gray-300 mt-2">
          Explore e descubra as características de diversas raças de gatos
        </p>
      </div>
    </header>
  );
}

export default Header;
