import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

/**
 * Gráfico de Distribuição de Raças por Origem (Pizza/Donut)
 */
function OriginDistributionChart({ breeds }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Destruir gráfico anterior se existir
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!breeds || breeds.length === 0 || !canvasRef.current) return;

    // Contar raças por origem
    const originCounts = breeds.reduce((acc, breed) => {
      const origin = breed.origin || 'Unknown';
      acc[origin] = (acc[origin] || 0) + 1;
      return acc;
    }, {});

    // Pegar top 10 origens
    const sortedOrigins = Object.entries(originCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedOrigins.map(([origin]) => origin);
    const data = sortedOrigins.map(([, count]) => count);

    // Cores vibrantes
    const colors = [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#f97316', // orange
      '#6366f1', // indigo
      '#14b8a6', // teal
    ];

    const isDark = theme === 'dark';

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Raças',
          data: data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: isDark ? '#1f2937' : '#ffffff',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              padding: 15,
              font: {
                size: 12
              },
              color: isDark ? '#d1d5db' : '#374151',
              generateLabels: function(chart) {
                const data = chart.data;
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);

                return data.labels.map((label, i) => {
                  const value = data.datasets[0].data[i];
                  const percentage = ((value / total) * 100).toFixed(1);

                  return {
                    text: `${label} (${percentage}%)`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    hidden: false,
                    index: i
                  };
                });
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} raças (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    chartRef.current = newChart;

    // Cleanup ao desmontar
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [breeds, theme]);

  return (
    <ChartContainer
      title="Distribuição por Origem"
      icon="🌍"
      footer={`Top 10 países de origem das ${breeds?.length || 0} raças`}
    >
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </ChartContainer>
  );
}

export default OriginDistributionChart;
