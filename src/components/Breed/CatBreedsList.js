import React, { useState, useMemo } from 'react';
import { useCatBreeds } from '../../hooks/useCatBreeds';
import CatBreedCard from './CatBreedCard';
import BreedDetailModal from './BreedDetailModal';
import SearchBar from '../UI/SearchBar';
import FilterBar from '../UI/FilterBar';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorMessage from '../UI/ErrorMessage';

function CatBreedsList() {
  const { breeds, loading, error } = useCatBreeds();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [energyFilter, setEnergyFilter] = useState('all');
  const [originFilter, setOriginFilter] = useState('all');
  const [childFriendlyFilter, setChildFriendlyFilter] = useState('all');
  const [dogFriendlyFilter, setDogFriendlyFilter] = useState('all');
  const [indoorFilter, setIndoorFilter] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extrair todas as origens únicas para o dropdown
  const availableOrigins = useMemo(() => {
    const origins = breeds.map(breed => breed.origin).filter(Boolean);
    return [...new Set(origins)].sort();
  }, [breeds]);

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

    // Filtro de origem
    if (originFilter !== 'all') {
      filtered = filtered.filter((breed) => breed.origin === originFilter);
    }

    // Filtro de compatibilidade com crianças
    if (childFriendlyFilter !== 'all') {
      filtered = filtered.filter((breed) =>
        (breed.child_friendly || 0) >= parseInt(childFriendlyFilter)
      );
    }

    // Filtro de compatibilidade com cães
    if (dogFriendlyFilter !== 'all') {
      filtered = filtered.filter((breed) =>
        (breed.dog_friendly || 0) >= parseInt(dogFriendlyFilter)
      );
    }

    // Filtro indoor
    if (indoorFilter) {
      filtered = filtered.filter((breed) => breed.indoor === 1);
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
  }, [breeds, searchTerm, sortBy, energyFilter, originFilter, childFriendlyFilter, dogFriendlyFilter, indoorFilter]);

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setEnergyFilter('all');
    setOriginFilter('all');
    setChildFriendlyFilter('all');
    setDogFriendlyFilter('all');
    setIndoorFilter(false);
  };

  const handleOpenModal = (breed) => {
    setSelectedBreed(breed);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBreed(null), 300); // Delay para animação
  };

  const handleNavigate = (direction) => {
    const currentIndex = filteredAndSortedBreeds.findIndex(b => b.id === selectedBreed.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredAndSortedBreeds.length - 1;
    } else {
      newIndex = currentIndex < filteredAndSortedBreeds.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedBreed(filteredAndSortedBreeds[newIndex]);
  };

  const canNavigatePrev = selectedBreed && filteredAndSortedBreeds.length > 1;
  const canNavigateNext = selectedBreed && filteredAndSortedBreeds.length > 1;

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
        originFilter={originFilter}
        onOriginFilterChange={setOriginFilter}
        childFriendlyFilter={childFriendlyFilter}
        onChildFriendlyFilterChange={setChildFriendlyFilter}
        dogFriendlyFilter={dogFriendlyFilter}
        onDogFriendlyFilterChange={setDogFriendlyFilter}
        indoorFilter={indoorFilter}
        onIndoorFilterChange={setIndoorFilter}
        availableOrigins={availableOrigins}
        onClearFilters={handleClearFilters}
      />

      {/* Contador de resultados */}
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredAndSortedBreeds.length} raça{filteredAndSortedBreeds.length !== 1 ? 's' : ''} encontrada{filteredAndSortedBreeds.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de raças */}
      {filteredAndSortedBreeds.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Nenhuma raça encontrada com os filtros selecionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBreeds.map((breed) => (
            <CatBreedCard
              key={breed.id}
              breed={breed}
              onClick={() => handleOpenModal(breed)}
            />
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      <BreedDetailModal
        breed={selectedBreed}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
        canNavigatePrev={canNavigatePrev}
        canNavigateNext={canNavigateNext}
      />
    </div>
  );
}

export default CatBreedsList;
