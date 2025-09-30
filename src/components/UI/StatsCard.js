import React from 'react';

/**
 * StatsCard - Card de estatística/KPI
 * @param {string} title - Título do card
 * @param {string} value - Valor principal (número)
 * @param {string} icon - Emoji ou ícone
 * @param {string} bgColor - Cor de fundo (Tailwind class)
 * @param {string} textColor - Cor do texto (Tailwind class)
 * @param {string} description - Descrição adicional (opcional)
 * @param {string} trend - Tendência: 'up', 'down', 'neutral' (opcional)
 * @param {string} trendValue - Valor da tendência (opcional, ex: "+12%")
 */
function StatsCard({
  title,
  value,
  icon,
  bgColor = 'bg-blue-50',
  textColor = 'text-blue-600',
  iconBgColor = 'bg-blue-100',
  description,
  trend,
  trendValue
}) {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className={`${bgColor} rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>

          {description && (
            <p className="text-xs text-gray-500 mt-2">{description}</p>
          )}

          {trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${getTrendColor()}`}>
              <span className="text-lg">{getTrendIcon()}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div className={`${iconBgColor} rounded-full p-3 ${textColor}`}>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
