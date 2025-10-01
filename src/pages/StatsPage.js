import React from 'react';
import StatsDashboard from '../components/Charts/StatsDashboard';
import OriginDistributionChart from '../components/Charts/OriginDistributionChart';
import TopTemperamentsChart from '../components/Charts/TopTemperamentsChart';
import TemperamentAndSocialNeedsChart from '../components/Charts/TemperamentAndSocialNeedsChart';
import HealthAndWellnessChart from '../components/Charts/HealthAndWellnessChart';
import FamilySuitabilityChart from '../components/Charts/FamilySuitabilityChart';
import EnergyExerciseLevelsChart from '../components/Charts/EnergyExerciseLevelsChart';
import PopularityAvailabilityChart from '../components/Charts/PopularityAvailabilityChart';
import NativeEnvironmentEffectChart from '../components/Charts/NativeEnvironmentEffectChart';
import { useCatBreeds } from '../hooks/useCatBreeds';

/**
 * StatsPage - Página de estatísticas e dashboard
 */
function StatsPage() {
  const { breeds } = useCatBreeds();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* KPI Dashboard */}
      <StatsDashboard />

      {/* Grid de Gráficos - 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OriginDistributionChart breeds={breeds} />
        <TopTemperamentsChart breeds={breeds} />
      </div>

      {/* Gráficos Existentes Melhorados */}
      <EnergyExerciseLevelsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TemperamentAndSocialNeedsChart />
        <HealthAndWellnessChart />
      </div>

      <FamilySuitabilityChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularityAvailabilityChart />
        <NativeEnvironmentEffectChart />
      </div>
    </div>
  );
}

export default StatsPage;
