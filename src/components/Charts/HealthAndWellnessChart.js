import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function HealthAndWellnessChart() {
  const [catData, setCatData] = useState(null);
  const [showAll, setShowAll] = useState({
    "Alta Longevidade": false,
    "Longevidade Média": false,
    "Poucos Problemas": false,
    "Problemas Moderados": false,
    "Muitos Problemas": false
  });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((breed) => breed.name);
        const lifespanData = data.map((breed) => {
          if (breed.life_span.includes("-")) {
            const [min, max] = breed.life_span.split("-").map(Number);
            return (min + max) / 2;
          } else {
            return Number(breed.life_span);
          }
        });

        const healthIssuesData = data.map((breed) => breed.health_issues);

        // Categorizar raças por longevidade e problemas de saúde
        const categories = {
          "Alta Longevidade": [],
          "Longevidade Média": [],
          "Poucos Problemas": [],
          "Problemas Moderados": [],
          "Muitos Problemas": []
        };

        labels.forEach((breed, index) => {
          // Longevidade
          if (lifespanData[index] >= 15) {
            categories["Alta Longevidade"].push(breed);
          } else if (lifespanData[index] >= 12) {
            categories["Longevidade Média"].push(breed);
          }

          // Problemas de saúde
          if (healthIssuesData[index] <= 1) {
            categories["Poucos Problemas"].push(breed);
          } else if (healthIssuesData[index] <= 3) {
            categories["Problemas Moderados"].push(breed);
          } else {
            categories["Muitos Problemas"].push(breed);
          }
        });

        setCatData({
          labels: labels,
          lifespanData: lifespanData,
          healthIssuesData: healthIssuesData,
          categories: categories
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
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(34, 197, 94, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(255, 99, 132, 1)",
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
                text: "Categorias de Saúde",
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
      title="Análise de Saúde e Bem-Estar"
      icon="❤️"
      footer="Expectativa de vida e problemas de saúde por raça"
    >
      <div style={{ height: '350px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      {catData && catData.categories && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Alta Longevidade */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-200 dark:border-teal-800 transition-colors">
            <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                Alta Longevidade
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Longevidade"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Longevidade"] ? catData.categories["Alta Longevidade"] : catData.categories["Alta Longevidade"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Longevidade"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Longevidade": !prev["Alta Longevidade"] }))}
                className="mt-3 text-sm text-teal-700 dark:text-teal-400 hover:underline font-medium"
              >
                {showAll["Alta Longevidade"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Longevidade"].length})`}
              </button>
            )}
          </div>

          {/* Longevidade Média */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-colors">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Longevidade Média
              </span>
              <span className="text-sm font-normal">({catData.categories["Longevidade Média"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Longevidade Média"] ? catData.categories["Longevidade Média"] : catData.categories["Longevidade Média"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Longevidade Média"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Longevidade Média": !prev["Longevidade Média"] }))}
                className="mt-3 text-sm text-blue-700 dark:text-blue-400 hover:underline font-medium"
              >
                {showAll["Longevidade Média"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Longevidade Média"].length})`}
              </button>
            )}
          </div>

          {/* Poucos Problemas */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Poucos Problemas
              </span>
              <span className="text-sm font-normal">({catData.categories["Poucos Problemas"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Poucos Problemas"] ? catData.categories["Poucos Problemas"] : catData.categories["Poucos Problemas"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Poucos Problemas"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Poucos Problemas": !prev["Poucos Problemas"] }))}
                className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
              >
                {showAll["Poucos Problemas"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Poucos Problemas"].length})`}
              </button>
            )}
          </div>

          {/* Problemas Moderados */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Problemas Moderados
              </span>
              <span className="text-sm font-normal">({catData.categories["Problemas Moderados"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Problemas Moderados"] ? catData.categories["Problemas Moderados"] : catData.categories["Problemas Moderados"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Problemas Moderados"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Problemas Moderados": !prev["Problemas Moderados"] }))}
                className="mt-3 text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
              >
                {showAll["Problemas Moderados"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Problemas Moderados"].length})`}
              </button>
            )}
          </div>

          {/* Muitos Problemas */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 transition-colors">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Muitos Problemas
              </span>
              <span className="text-sm font-normal">({catData.categories["Muitos Problemas"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Muitos Problemas"] ? catData.categories["Muitos Problemas"] : catData.categories["Muitos Problemas"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Muitos Problemas"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Muitos Problemas": !prev["Muitos Problemas"] }))}
                className="mt-3 text-sm text-red-700 dark:text-red-400 hover:underline font-medium"
              >
                {showAll["Muitos Problemas"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Muitos Problemas"].length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default HealthAndWellnessChart;
