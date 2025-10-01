import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function PopularityAvailabilityChart() {
  const [catData, setCatData] = useState(null);
  const [showAll, setShowAll] = useState({
    "Muito Populares": false,
    "Populares": false,
    "Raras": false
  });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((breed) => breed.name);

        // Categorizar raças por raridade baseado em múltiplos fatores
        const categories = {
          "Muito Populares": [],
          "Populares": [],
          "Raras": []
        };

        labels.forEach((breed, index) => {
          const breedData = data[index];
          // Raças raras geralmente têm baixa adaptabilidade ou são mais exigentes
          const rarityScore = (breedData.rare || 0) +
                             (5 - (breedData.adaptability || 3));

          if (rarityScore >= 4) {
            categories["Raras"].push(breed);
          } else if (rarityScore >= 2) {
            categories["Populares"].push(breed);
          } else {
            categories["Muito Populares"].push(breed);
          }
        });

        setCatData({
          categories: categories,
          totalBreeds: data.length
        });
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
  }, []);

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
        data: {
          labels: Object.keys(catData.categories),
          datasets: [
            {
              label: "Número de Raças",
              data: Object.values(catData.categories).map((breeds) => breeds.length),
              backgroundColor: [
                "rgba(34, 197, 94, 0.6)",
                "rgba(234, 179, 8, 0.6)",
                "rgba(239, 68, 68, 0.6)",
              ],
              borderColor: [
                "rgba(34, 197, 94, 1)",
                "rgba(234, 179, 8, 1)",
                "rgba(239, 68, 68, 1)",
              ],
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 5,
                color: isDark ? '#d1d5db' : '#374151',
              },
              title: {
                display: true,
                text: "Número de Raças",
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
                text: "Nível de Popularidade",
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
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.parsed.y} raças`;
                }
              }
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

      {catData && catData.categories && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Muito Populares */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Muito Populares
              </span>
              <span className="text-sm font-normal">({catData.categories["Muito Populares"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Muito Populares"] ? catData.categories["Muito Populares"] : catData.categories["Muito Populares"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Muito Populares"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Muito Populares": !prev["Muito Populares"] }))}
                className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
              >
                {showAll["Muito Populares"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Muito Populares"].length})`}
              </button>
            )}
          </div>

          {/* Populares */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Populares
              </span>
              <span className="text-sm font-normal">({catData.categories["Populares"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Populares"] ? catData.categories["Populares"] : catData.categories["Populares"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Populares"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Populares": !prev["Populares"] }))}
                className="mt-3 text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
              >
                {showAll["Populares"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Populares"].length})`}
              </button>
            )}
          </div>

          {/* Raras */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 transition-colors">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Raças Raras
              </span>
              <span className="text-sm font-normal">({catData.categories["Raras"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Raras"] ? catData.categories["Raras"] : catData.categories["Raras"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Raras"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Raras": !prev["Raras"] }))}
                className="mt-3 text-sm text-red-700 dark:text-red-400 hover:underline font-medium"
              >
                {showAll["Raras"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Raras"].length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default PopularityAvailabilityChart;
