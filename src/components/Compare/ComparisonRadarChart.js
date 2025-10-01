import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTheme } from '../../hooks/useTheme';

function ComparisonRadarChart({ breeds }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (!breeds || breeds.length === 0 || !canvasRef.current) return;

    const isDark = theme === 'dark';

    const labels = [
      'Afeto',
      'Energia',
      'Inteligência',
      'Social',
      'C/ Crianças',
      'C/ Cães',
      'Adaptável',
      'Vocalização'
    ];

    const colors = [
      {
        bg: 'rgba(59, 130, 246, 0.2)',
        border: 'rgb(59, 130, 246)',
        point: 'rgb(59, 130, 246)'
      },
      {
        bg: 'rgba(168, 85, 247, 0.2)',
        border: 'rgb(168, 85, 247)',
        point: 'rgb(168, 85, 247)'
      },
      {
        bg: 'rgba(236, 72, 153, 0.2)',
        border: 'rgb(236, 72, 153)',
        point: 'rgb(236, 72, 153)'
      }
    ];

    const datasets = breeds.map((breed, index) => ({
      label: breed.name,
      data: [
        breed.affection_level || 0,
        breed.energy_level || 0,
        breed.intelligence || 0,
        breed.social_needs || 0,
        breed.child_friendly || 0,
        breed.dog_friendly || 0,
        breed.adaptability || 0,
        breed.vocalisation || 0
      ],
      fill: true,
      backgroundColor: colors[index].bg,
      borderColor: colors[index].border,
      pointBackgroundColor: colors[index].point,
      pointBorderColor: isDark ? '#1f2937' : '#fff',
      pointHoverBackgroundColor: isDark ? '#1f2937' : '#fff',
      pointHoverBorderColor: colors[index].border,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    }));

    const ctx = canvasRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets
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
              color: isDark ? '#d1d5db' : '#374151',
              backdropColor: isDark ? '#1f2937' : '#ffffff'
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
            },
            angleLines: {
              color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                size: 14,
                weight: 'bold'
              },
              color: isDark ? '#d1d5db' : '#374151',
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.r}/5`;
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
  }, [breeds, theme]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <span>📊</span>
          Comparação Visual
        </h2>
      </div>

      <div style={{ height: '500px' }} className="flex items-center justify-center">
        <canvas ref={canvasRef}></canvas>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
        Quanto maior a área de cada cor, mais forte é a característica da raça
      </p>
    </div>
  );
}

export default ComparisonRadarChart;
