import React from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import { useCatStats } from '../../hooks/useCatStats';
import StatsCard from '../UI/StatsCard';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

function StatsDashboard() {
  const { breeds, loading, error } = useCatBreeds();
  const stats = useCatStats(breeds);

  if (loading) {
    return <LoadingSpinner message="Carregando estatísticas..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Raças"
          value={stats.totalBreeds}
          icon="🐱"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          iconBgColor="bg-blue-100"
          description="Raças cadastradas na base"
        />

        <StatsCard
          title="Nível Médio de Afeto"
          value={`${stats.averageAffection}/5`}
          icon="❤️"
          bgColor="bg-pink-50"
          textColor="text-pink-600"
          iconBgColor="bg-pink-100"
          description={`${stats.mostAffectionate?.name || 'N/A'} é a mais afetuosa`}
        />

        <StatsCard
          title="Nível Médio de Energia"
          value={`${stats.averageEnergy}/5`}
          icon="⚡"
          bgColor="bg-orange-50"
          textColor="text-orange-600"
          iconBgColor="bg-orange-100"
          description={`${stats.mostEnergetic?.name || 'N/A'} é a mais energética`}
        />

        <StatsCard
          title="Ideais para Famílias"
          value={`${stats.familyFriendlyPercent}%`}
          icon="👨‍👩‍👧‍👦"
          bgColor="bg-green-50"
          textColor="text-green-600"
          iconBgColor="bg-green-100"
          description={`${Math.round(stats.totalBreeds * stats.familyFriendlyPercent / 100)} raças amigáveis com crianças`}
        />
      </div>

      {/* Segunda linha de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Inteligência Média"
          value={`${stats.averageIntelligence}/5`}
          icon="🧠"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          iconBgColor="bg-purple-100"
          description="Nível médio de inteligência"
        />

        <StatsCard
          title="Compatíveis com Cães"
          value={`${stats.dogFriendlyPercent}%`}
          icon="🐕"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          iconBgColor="bg-amber-100"
          description={`${Math.round(stats.totalBreeds * stats.dogFriendlyPercent / 100)} raças amigáveis com cães`}
        />

        <StatsCard
          title="Origem Mais Comum"
          value={stats.topOrigins[0]?.origin || 'N/A'}
          icon="🌍"
          bgColor="bg-cyan-50"
          textColor="text-cyan-600"
          iconBgColor="bg-cyan-100"
          description={`${stats.topOrigins[0]?.count || 0} raças desta origem`}
        />
      </div>
    </div>
  );
}

export default StatsDashboard;
