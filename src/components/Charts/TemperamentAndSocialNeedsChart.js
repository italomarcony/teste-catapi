import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function TemperamentAndSocialNeedsChart() {
  const [catData, setCatData] = useState(null);
  const [showAll, setShowAll] = useState({
    "Alta Atividade": false,
    "Alta Inteligência": false,
    "Alta Sociabilidade": false,
    "Alta Vocalização": false
  });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((breed) => breed.name);
        const activityData = data.map((breed) => breed.energy_level);
        const intelligenceData = data.map((breed) => breed.intelligence);
        const sociabilityData = data.map((breed) => breed.social_needs);
        const vocalizationData = data.map((breed) => breed.vocalisation);

        // Categorizar raças por características
        const categories = {
          "Alta Atividade": [],
          "Alta Inteligência": [],
          "Alta Sociabilidade": [],
          "Alta Vocalização": []
        };

        labels.forEach((breed, index) => {
          if (activityData[index] >= 4) categories["Alta Atividade"].push(breed);
          if (intelligenceData[index] >= 4) categories["Alta Inteligência"].push(breed);
          if (sociabilityData[index] >= 4) categories["Alta Sociabilidade"].push(breed);
          if (vocalizationData[index] >= 4) categories["Alta Vocalização"].push(breed);
        });

        setCatData({
          labels: labels,
          activityData: activityData,
          intelligenceData: intelligenceData,
          sociabilityData: sociabilityData,
          vocalizationData: vocalizationData,
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
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 159, 64, 1)",
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
                text: "Características",
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
      title="Comparação de Temperamento e Necessidades Sociais"
      icon="🧠"
      footer="Análise de personalidade e características sociais"
    >
      <div style={{ height: '350px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      {catData && catData.categories && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Alta Atividade */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 transition-colors">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Alta Atividade
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Atividade"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Atividade"] ? catData.categories["Alta Atividade"] : catData.categories["Alta Atividade"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Atividade"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Atividade": !prev["Alta Atividade"] }))}
                className="mt-3 text-sm text-red-700 dark:text-red-400 hover:underline font-medium"
              >
                {showAll["Alta Atividade"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Atividade"].length})`}
              </button>
            )}
          </div>

          {/* Alta Inteligência */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Alta Inteligência
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Inteligência"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Inteligência"] ? catData.categories["Alta Inteligência"] : catData.categories["Alta Inteligência"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Inteligência"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Inteligência": !prev["Alta Inteligência"] }))}
                className="mt-3 text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
              >
                {showAll["Alta Inteligência"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Inteligência"].length})`}
              </button>
            )}
          </div>

          {/* Alta Sociabilidade */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Alta Sociabilidade
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Sociabilidade"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Sociabilidade"] ? catData.categories["Alta Sociabilidade"] : catData.categories["Alta Sociabilidade"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Sociabilidade"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Sociabilidade": !prev["Alta Sociabilidade"] }))}
                className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
              >
                {showAll["Alta Sociabilidade"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Sociabilidade"].length})`}
              </button>
            )}
          </div>

          {/* Alta Vocalização */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800 transition-colors">
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Alta Vocalização
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Vocalização"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Vocalização"] ? catData.categories["Alta Vocalização"] : catData.categories["Alta Vocalização"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Vocalização"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Vocalização": !prev["Alta Vocalização"] }))}
                className="mt-3 text-sm text-orange-700 dark:text-orange-400 hover:underline font-medium"
              >
                {showAll["Alta Vocalização"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Vocalização"].length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default TemperamentAndSocialNeedsChart;
