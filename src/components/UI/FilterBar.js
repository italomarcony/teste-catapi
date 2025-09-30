import React from 'react';

function FilterBar({ sortBy, onSortChange, energyFilter, onEnergyFilterChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 flex flex-wrap gap-4 justify-center">
      {/* Ordenação */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ordenar por:
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="name">Nome (A-Z)</option>
          <option value="affection">Nível de Afeto</option>
          <option value="energy">Nível de Energia</option>
          <option value="intelligence">Inteligência</option>
        </select>
      </div>

      {/* Filtro de Energia */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nível de Energia:
        </label>
        <select
          value={energyFilter}
          onChange={(e) => onEnergyFilterChange(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        >
          <option value="all">Todos</option>
          <option value="low">Baixa (1-2)</option>
          <option value="medium">Média (3-4)</option>
          <option value="high">Alta (5)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
