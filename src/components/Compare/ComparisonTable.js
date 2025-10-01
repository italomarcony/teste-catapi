import React from 'react';

function ComparisonTable({ breeds }) {
  const colors = [
    'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200',
    'bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-200',
    'bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-200'
  ];

  const characteristics = [
    { key: 'affection_level', label: 'Nível de Afeto', icon: '❤️' },
    { key: 'energy_level', label: 'Nível de Energia', icon: '⚡' },
    { key: 'intelligence', label: 'Inteligência', icon: '🧠' },
    { key: 'social_needs', label: 'Necessidades Sociais', icon: '👥' },
    { key: 'child_friendly', label: 'Amigável com Crianças', icon: '👶' },
    { key: 'dog_friendly', label: 'Amigável com Cães', icon: '🐕' },
    { key: 'stranger_friendly', label: 'Amigável com Estranhos', icon: '🤝' },
    { key: 'adaptability', label: 'Adaptabilidade', icon: '🔄' },
    { key: 'grooming', label: 'Cuidados com Pelagem', icon: '✂️' },
    { key: 'shedding_level', label: 'Queda de Pelo', icon: '🪮' },
    { key: 'health_issues', label: 'Problemas de Saúde', icon: '🏥' },
    { key: 'vocalisation', label: 'Vocalização', icon: '🔊' }
  ];

  const renderLevel = (value) => {
    if (!value) return <span className="text-gray-400 dark:text-gray-600">N/A</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {value}/5
        </span>
      </div>
    );
  };

  const renderInfo = (breed, key) => {
    switch (key) {
      case 'life_span':
        return breed.life_span || 'N/A';
      case 'weight':
        return breed.weight ? `${breed.weight.metric} kg` : 'N/A';
      case 'origin':
        return breed.origin || 'N/A';
      case 'temperament':
        return breed.temperament ? (
          <div className="flex flex-wrap gap-1">
            {breed.temperament.split(',').slice(0, 3).map((trait, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full">
                {trait.trim()}
              </span>
            ))}
          </div>
        ) : 'N/A';
      case 'indoor':
        return breed.indoor ? '✅ Sim' : '❌ Não';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span>📊</span>
          Comparação Detalhada
        </h2>
      </div>

      {/* Characteristics Comparison */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 font-semibold text-gray-700 dark:text-gray-300">
                Característica
              </th>
              {breeds.map((breed, index) => (
                <th key={breed.id} className={`py-4 px-4 ${colors[index]} rounded-t-lg`}>
                  <div className="font-bold">{breed.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {characteristics.map((char, idx) => (
              <tr
                key={char.key}
                className={`border-b border-gray-100 dark:border-gray-700 ${
                  idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                }`}
              >
                <td className="py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <span className="mr-2">{char.icon}</span>
                  {char.label}
                </td>
                {breeds.map((breed) => (
                  <td key={breed.id} className="py-4 px-4 text-center">
                    {renderLevel(breed[char.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Informações Gerais
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    📍 Origem
                  </td>
                  {breeds.map((breed, index) => (
                    <td key={breed.id} className={`py-3 px-4 ${colors[index]}`}>
                      {renderInfo(breed, 'origin')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    ⏳ Expectativa de Vida
                  </td>
                  {breeds.map((breed, index) => (
                    <td key={breed.id} className={`py-3 px-4 ${colors[index]}`}>
                      {renderInfo(breed, 'life_span')} anos
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    ⚖️ Peso
                  </td>
                  {breeds.map((breed, index) => (
                    <td key={breed.id} className={`py-3 px-4 ${colors[index]}`}>
                      {renderInfo(breed, 'weight')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    🏠 Indoor
                  </td>
                  {breeds.map((breed, index) => (
                    <td key={breed.id} className={`py-3 px-4 ${colors[index]}`}>
                      {renderInfo(breed, 'indoor')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    😸 Temperamento
                  </td>
                  {breeds.map((breed, index) => (
                    <td key={breed.id} className={`py-3 px-4 ${colors[index]}`}>
                      {renderInfo(breed, 'temperament')}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonTable;
