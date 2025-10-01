import React, { useState } from "react";
import Header from "./components/Layout/Header";
import CatBreedsList from "./components/Breed/CatBreedsList";
import CompareBreeds from "./components/Compare/CompareBreeds";
import Quiz from "./components/Quiz/Quiz";
import StatsDashboard from "./components/Charts/StatsDashboard";
import OriginDistributionChart from "./components/Charts/OriginDistributionChart";
import TopTemperamentsChart from "./components/Charts/TopTemperamentsChart";
import TemperamentAndSocialNeedsChart from "./components/Charts/TemperamentAndSocialNeedsChart";
import HealthAndWellnessChart from "./components/Charts/HealthAndWellnessChart";
import FamilySuitabilityChart from "./components/Charts/FamilySuitabilityChart";
import EnergyExerciseLevelsChart from "./components/Charts/EnergyExerciseLevelsChart";
import PopularityAvailabilityChart from "./components/Charts/PopularityAvailabilityChart";
import NativeEnvironmentEffectChart from "./components/Charts/NativeEnvironmentEffectChart";
import { useCatBreeds } from "./hooks/useCatBreeds";

function App() {
  const [activeTab, setActiveTab] = useState('breeds');
  const { breeds } = useCatBreeds();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      {/* Navegação por Tabs */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('breeds')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'breeds'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              🐱 Raças
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'charts'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'compare'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              🔄 Comparar
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'quiz'
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              🎯 Quiz
            </button>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="pb-12">
        {activeTab === 'breeds' && <CatBreedsList />}

        {activeTab === 'compare' && <CompareBreeds />}

        {activeTab === 'quiz' && <Quiz />}

        {activeTab === 'charts' && (
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* KPI Dashboard */}
            <StatsDashboard />

            {/* Grid de Gráficos - 2 colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OriginDistributionChart breeds={breeds} />
              <TopTemperamentsChart breeds={breeds} />
            </div>

            {/* Gráficos Existentes Melhorados */}
            <EnergyExerciseLevelsChart limit={10} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TemperamentAndSocialNeedsChart limit={10} />
              <HealthAndWellnessChart limit={10} />
            </div>

            <FamilySuitabilityChart limit={10} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PopularityAvailabilityChart limit={10} />
              <NativeEnvironmentEffectChart limit={10} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 transition-colors">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Dados fornecidos por <a href="https://thecatapi.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">The Cat API</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
