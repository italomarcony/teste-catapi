import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function PopularityAvailabilityChart({ limit }) {
  const [catData, setCatData] = useState(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const breedData = [
      {
        name: "Abyssinian",
        popularityWeb: "Média",
        popularityComparison: "Menor volume em comparação com Persa",
        registrations: "33ª posição em registros da TICA (2.423 gatos)",
        comparisonRegistrations: "Persa ocupou a 1ª posição (35.643 gatos)",
        rankerPosition: "14ª posição em ranking de popularidade",
        catster: "Relativamente rara",
      },
      {
        name: "Aegean",
        popularityWeb: "Baixa",
        popularityComparison: "Menor volume em comparação com Abissínio",
        registrations:
          "Não figurou entre as 50 raças com mais registros da TICA",
        comparisonRegistrations: "Abissínio ocupou a 33ª posição",
        rankerPosition: "Não está presente no ranking de popularidade",
        catster: "Rara",
      },
    ];

    const labels = breedData.map((breed) => breed.name);
    const rarityData = breedData.map((breed) =>
      breed.catster === "Rara" ? 1 : 0
    );

    setCatData({
      labels: labels,
      datasets: [
        {
          label: "Raridade",
          data: rarityData,
          backgroundColor: rarityData.map((rarity) =>
            rarity === 1 ? "rgba(54, 162, 235, 0.6)" : "rgba(255, 99, 132, 0.6)"
          ),
          borderColor: rarityData.map((rarity) =>
            rarity === 1 ? "rgba(54, 162, 235, 1)" : "rgba(255, 99, 132, 1)"
          ),
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
      breedInfo: breedData,
    });
  }, [limit]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (catData && canvasRef.current) {
      const isDark = theme === 'dark';
      const ctx = canvasRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: "bar",
        data: catData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: isDark ? '#d1d5db' : '#374151',
              },
              title: {
                display: true,
                text: "Nível de Raridade",
                color: isDark ? '#d1d5db' : '#374151',
                font: {
                  size: 13,
                  weight: 'bold'
                }
              },
              grid: {
                color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              ticks: {
                color: isDark ? '#d1d5db' : '#374151',
              },
              title: {
                display: true,
                text: "Raças de Gatos",
                color: isDark ? '#d1d5db' : '#374151',
                font: {
                  size: 13,
                  weight: 'bold'
                }
              },
              grid: {
                display: false
              }
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: isDark ? '#d1d5db' : '#374151',
                filter: function (item) {
                  return item.datasetIndex === 0;
                },
                generateLabels: function (chart) {
                  return [
                    {
                      text: "Barras mais altas representam raças mais raras",
                      fillStyle: "rgba(54, 162, 235, 0.6)",
                      font: {
                        size: 14,
                      },
                    },
                  ];
                },
              },
            },
            tooltip: {
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              titleColor: isDark ? '#f3f4f6' : '#1f2937',
              bodyColor: isDark ? '#d1d5db' : '#374151',
              borderColor: isDark ? '#4b5563' : '#e5e7eb',
              borderWidth: 1,
            }
          },
        },
      });
      chartRef.current = newChart;
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [catData, theme]);

  return (
    <ChartContainer
      title="Análise de Popularidade e Disponibilidade"
      icon="⭐"
      footer="Raridade e disponibilidade de raças"
    >
      <div style={{ height: '350px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      {catData && catData.breedInfo && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Informações sobre as Raças:</h3>
          <div className="space-y-6">
            {catData.breedInfo.map((breed) => (
              <div key={breed.name} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-colors">
                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{breed.name}</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><strong>Popularidade na Web:</strong> {breed.popularityWeb}</li>
                  <li><strong>Comparação com outras raças:</strong> {breed.popularityComparison}</li>
                  <li><strong>Inscrições em clubes de raças:</strong> {breed.registrations}</li>
                  <li><strong>Comparação com outras raças:</strong> {breed.comparisonRegistrations}</li>
                  <li><strong>Posição no ranking Ranker:</strong> {breed.rankerPosition}</li>
                  <li><strong>Catster:</strong> {breed.catster}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default PopularityAvailabilityChart;
