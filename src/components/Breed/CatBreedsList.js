import React, { useState, useMemo } from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import CatBreedCard from './CatBreedCard';
import SearchBar from '../UI/SearchBar';
import FilterBar from '../UI/FilterBar';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

function CatBreedsList() {
  const { breeds, loading, error } = useCatBreeds();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [energyFilter, setEnergyFilter] = useState('all');

  // Filtrar e ordenar raças
  const filteredAndSortedBreeds = useMemo(() => {
    let filtered = breeds;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (breed) =>
          breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          breed.temperament?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de energia
    if (energyFilter !== 'all') {
      filtered = filtered.filter((breed) => {
        if (energyFilter === 'low') return breed.energy_level <= 2;
        if (energyFilter === 'medium') return breed.energy_level >= 3 && breed.energy_level <= 4;
        if (energyFilter === 'high') return breed.energy_level === 5;
        return true;
      });
    }

    // Ordenação
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'affection':
          return (b.affection_level || 0) - (a.affection_level || 0);
        case 'energy':
          return (b.energy_level || 0) - (a.energy_level || 0);
        case 'intelligence':
          return (b.intelligence || 0) - (a.intelligence || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [breeds, searchTerm, sortBy, energyFilter]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message="Carregando raças de gatos..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={`Erro ao carregar raças: ${error}`}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Busca */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por nome, origem ou temperamento..."
      />

      {/* Filtros */}
      <FilterBar
        sortBy={sortBy}
        onSortChange={setSortBy}
        energyFilter={energyFilter}
        onEnergyFilterChange={setEnergyFilter}
      />

      {/* Contador de resultados */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          {filteredAndSortedBreeds.length} raça{filteredAndSortedBreeds.length !== 1 ? 's' : ''} encontrada{filteredAndSortedBreeds.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de raças */}
      {filteredAndSortedBreeds.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Nenhuma raça encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBreeds.map((breed) => (
            <CatBreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatBreedsList;
