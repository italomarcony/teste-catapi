import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '../../hooks/useTheme';

/**
 * BreedRadarChart - Gráfico radar com características de uma raça
 */
function BreedRadarChart({ breed }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!breed || !canvasRef.current) return;

    const characteristics = {
      'Afeto': breed.affection_level || 0,
      'Energia': breed.energy_level || 0,
      'Inteligência': breed.intelligence || 0,
      'Sociabilidade': breed.social_needs || 0,
      'C/ Crianças': breed.child_friendly || 0,
      'C/ Cães': breed.dog_friendly || 0,
      'Adaptabilidade': breed.adaptability || 0,
      'Vocalização': breed.vocalisation || 0,
    };

    const labels = Object.keys(characteristics);
    const data = Object.values(characteristics);

    const isDark = theme === 'dark';

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: breed.name,
          data: data,
          fill: true,
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          borderColor: 'rgb(14, 165, 233)',
          pointBackgroundColor: 'rgb(14, 165, 233)',
          pointBorderColor: isDark ? '#1f2937' : '#fff',
          pointHoverBackgroundColor: isDark ? '#1f2937' : '#fff',
          pointHoverBorderColor: 'rgb(14, 165, 233)',
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              font: {
                size: 12
              },
              color: isDark ? '#d1d5db' : '#374151'
            },
            pointLabels: {
              font: {
                size: 13,
                weight: 'bold'
              },
              color: isDark ? '#d1d5db' : '#374151'
            },
            grid: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed.r}/5`;
              }
            }
          }
        }
      }
    });

    chartRef.current = newChart;

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [breed, theme]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Características
      </h3>
      <div style={{ height: '350px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default BreedRadarChart;
