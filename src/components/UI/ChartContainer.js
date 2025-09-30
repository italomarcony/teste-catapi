import React from 'react';

/**
 * ChartContainer - Container reutilizável para gráficos
 * @param {string} title - Título do gráfico
 * @param {string} icon - Emoji/ícone (opcional)
 * @param {ReactNode} children - Conteúdo do gráfico
 * @param {ReactNode} actions - Botões de ação no header (opcional)
 * @param {string} footer - Texto do footer (opcional)
 * @param {boolean} loading - Estado de carregamento
 */
function ChartContainer({
  title,
  icon,
  children,
  actions,
  footer,
  loading = false
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">{footer}</p>
        </div>
      )}
    </div>
  );
}

export default ChartContainer;
