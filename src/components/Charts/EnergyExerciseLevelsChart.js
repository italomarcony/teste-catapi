import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function EnergyExerciseLevelsChart() {
  const [catData, setCatData] = useState(null);
  const [showAll, setShowAll] = useState({
    Calmo: false,
    "Moderadamente Ativo": false,
    Ativo: false
  });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((breed) => breed.name);
        const energyData = data.map((breed) => breed.energy_level);

        const energyCategories = energyData.map((energy) => {
          if (energy <= 2) return "Calmo";
          else if (energy <= 4) return "Moderadamente Ativo";
          else return "Ativo";
        });

        const breedNames = {
          Calmo: [],
          "Moderadamente Ativo": [],
          Ativo: [],
        };

        labels.forEach((breed, index) => {
          breedNames[energyCategories[index]].push(breed);
        });

        setCatData(breedNames);
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
          labels: Object.keys(catData),
          datasets: [
            {
              label: "Número de Raças",
              data: Object.values(catData).map((breeds) => breeds.length),
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
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
                color: isDark ? '#d1d5db' : '#374151',
                stepSize: 5
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
                color: isDark ? '#d1d5db' : '#374151'
              },
              title: {
                display: true,
                text: "Nível de Energia",
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
      title="Níveis de Energia e Exercício"
      icon="⚡"
      footer="Classificação por nível de atividade"
    >
      <div style={{ height: '350px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      {catData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Raças Calmas */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Raças Mais Calmas
              </span>
              <span className="text-sm font-normal">({catData.Calmo.length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll.Calmo ? catData.Calmo : catData.Calmo.slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.Calmo.length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, Calmo: !prev.Calmo }))}
                className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
              >
                {showAll.Calmo ? '▲ Ver menos' : `▼ Ver todas (${catData.Calmo.length})`}
              </button>
            )}
          </div>

          {/* Raças Moderadamente Ativas */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Raças Moderadas
              </span>
              <span className="text-sm font-normal">({catData["Moderadamente Ativo"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Moderadamente Ativo"] ? catData["Moderadamente Ativo"] : catData["Moderadamente Ativo"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData["Moderadamente Ativo"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Moderadamente Ativo": !prev["Moderadamente Ativo"] }))}
                className="mt-3 text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
              >
                {showAll["Moderadamente Ativo"] ? '▲ Ver menos' : `▼ Ver todas (${catData["Moderadamente Ativo"].length})`}
              </button>
            )}
          </div>

          {/* Raças Ativas */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 transition-colors">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Raças Mais Ativas
              </span>
              <span className="text-sm font-normal">({catData.Ativo.length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll.Ativo ? catData.Ativo : catData.Ativo.slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.Ativo.length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, Ativo: !prev.Ativo }))}
                className="mt-3 text-sm text-red-700 dark:text-red-400 hover:underline font-medium"
              >
                {showAll.Ativo ? '▲ Ver menos' : `▼ Ver todas (${catData.Ativo.length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default EnergyExerciseLevelsChart;
