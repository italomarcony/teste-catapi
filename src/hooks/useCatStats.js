import { useMemo } from 'react';

/**
 * Hook personalizado para calcular estatísticas das raças
 * @param {Array} breeds - Array de raças
 * @returns {Object} Estatísticas calculadas
 */
export const useCatStats = (breeds) => {
  return useMemo(() => {
    if (!breeds || breeds.length === 0) {
      return {
        totalBreeds: 0,
        averageAffection: 0,
        averageEnergy: 0,
        averageIntelligence: 0,
        mostAffectionate: null,
        mostEnergetic: null,
        familyFriendlyPercent: 0,
        dogFriendlyPercent: 0,
        topOrigins: []
      };
    }

    // Total de raças
    const totalBreeds = breeds.length;

    // Médias
    const averageAffection = (
      breeds.reduce((sum, breed) => sum + (breed.affection_level || 0), 0) / totalBreeds
    ).toFixed(1);

    const averageEnergy = (
      breeds.reduce((sum, breed) => sum + (breed.energy_level || 0), 0) / totalBreeds
    ).toFixed(1);

    const averageIntelligence = (
      breeds.reduce((sum, breed) => sum + (breed.intelligence || 0), 0) / totalBreeds
    ).toFixed(1);

    // Raças mais destacadas
    const mostAffectionate = breeds.reduce((max, breed) =>
      (breed.affection_level || 0) > (max.affection_level || 0) ? breed : max
    , breeds[0]);

    const mostEnergetic = breeds.reduce((max, breed) =>
      (breed.energy_level || 0) > (max.energy_level || 0) ? breed : max
    , breeds[0]);

    // Percentuais de compatibilidade
    const familyFriendly = breeds.filter(b => (b.child_friendly || 0) >= 4).length;
    const familyFriendlyPercent = Math.round((familyFriendly / totalBreeds) * 100);

    const dogFriendly = breeds.filter(b => (b.dog_friendly || 0) >= 4).length;
    const dogFriendlyPercent = Math.round((dogFriendly / totalBreeds) * 100);

    // Top origens
    const originCounts = breeds.reduce((acc, breed) => {
      const origin = breed.origin || 'Unknown';
      acc[origin] = (acc[origin] || 0) + 1;
      return acc;
    }, {});

    const topOrigins = Object.entries(originCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([origin, count]) => ({ origin, count }));

    // Distribuição de energia
    const energyDistribution = {
      low: breeds.filter(b => (b.energy_level || 0) <= 2).length,
      medium: breeds.filter(b => (b.energy_level || 0) >= 3 && (b.energy_level || 0) <= 4).length,
      high: breeds.filter(b => (b.energy_level || 0) === 5).length
    };

    // Distribuição de temperamento (contagem de traits)
    const temperamentTraits = {};
    breeds.forEach(breed => {
      if (breed.temperament) {
        breed.temperament.split(',').forEach(trait => {
          const t = trait.trim();
          temperamentTraits[t] = (temperamentTraits[t] || 0) + 1;
        });
      }
    });

    const topTemperaments = Object.entries(temperamentTraits)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([trait, count]) => ({ trait, count }));

    return {
      totalBreeds,
      averageAffection,
      averageEnergy,
      averageIntelligence,
      mostAffectionate,
      mostEnergetic,
      familyFriendlyPercent,
      dogFriendlyPercent,
      topOrigins,
      energyDistribution,
      topTemperaments
    };
  }, [breeds]);
};
