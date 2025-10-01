import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

/**
 * Gráfico de Top 10 Temperamentos mais Comuns
 */
function TopTemperamentsChart({ breeds }) {
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

    // Contar temperamentos
    const temperamentCounts = {};
    breeds.forEach(breed => {
      if (breed.temperament) {
        breed.temperament.split(',').forEach(trait => {
          const t = trait.trim();
          temperamentCounts[t] = (temperamentCounts[t] || 0) + 1;
        });
      }
    });

    // Top 10
    const sortedTemperaments = Object.entries(temperamentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const labels = sortedTemperaments.map(([trait]) => trait);
    const data = sortedTemperaments.map(([, count]) => count);

    const isDark = theme === 'dark';

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Raças',
          data: data,
          backgroundColor: 'rgba(139, 92, 246, 0.6)', // purple
          borderColor: 'rgba(139, 92, 246, 1)',
          borderWidth: 2,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Barras horizontais
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.x} raças`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              display: true,
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
            }
          },
          y: {
            ticks: {
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              display: false
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
      title="Temperamentos Mais Comuns"
      icon="😸"
      footer="Top 10 características de temperamento encontradas"
    >
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </ChartContainer>
  );
}

export default TopTemperamentsChart;
