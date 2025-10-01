import React from 'react';

function QuizWelcome({ onStart }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-12 text-center border border-primary-100 dark:border-gray-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200 dark:bg-primary-900/30 rounded-full -mr-20 -mt-20 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full -ml-16 -mb-16 opacity-50"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-8xl">🐱</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Qual Raça Combina com Você?
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Responda 10 perguntas simples e descubra as raças de gato que mais combinam com seu estilo de vida e personalidade!
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2-3 minutos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rápido e divertido</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">10 perguntas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sobre seu estilo de vida</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Top 3 matches</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Com % de compatibilidade</p>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Começar Quiz</span>
            <svg
              className="w-6 h-6 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            ✨ Algoritmo inteligente baseado em características reais das raças
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuizWelcome;
