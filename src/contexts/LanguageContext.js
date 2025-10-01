import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Carregar idioma salvo ou usar PT-BR como padrão
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'pt-BR';
  });

  useEffect(() => {
    // Salvar idioma no localStorage quando mudar
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider');
  }
  return context;
}
