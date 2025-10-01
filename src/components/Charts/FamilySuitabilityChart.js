import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function FamilySuitabilityChart() {
  const [catData, setCatData] = useState(null);
  const [showAll, setShowAll] = useState({
    "Alta Adaptabilidade": false,
    "Alto Afeto": false,
    "Amigável com Crianças": false,
    "Amigável com Cães": false
  });
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((breed) => breed.name);
        const adaptabilityData = data.map((breed) => breed.adaptability);
        const affectionData = data.map((breed) => breed.affection_level);
        const childFriendlyData = data.map((breed) => breed.child_friendly);
        const dogFriendlyData = data.map((breed) => breed.dog_friendly);

        // Categorizar raças por adequação familiar
        const categories = {
          "Alta Adaptabilidade": [],
          "Alto Afeto": [],
          "Amigável com Crianças": [],
          "Amigável com Cães": []
        };

        labels.forEach((breed, index) => {
          if (adaptabilityData[index] >= 4) categories["Alta Adaptabilidade"].push(breed);
          if (affectionData[index] >= 4) categories["Alto Afeto"].push(breed);
          if (childFriendlyData[index] >= 4) categories["Amigável com Crianças"].push(breed);
          if (dogFriendlyData[index] >= 4) categories["Amigável com Cães"].push(breed);
        });

        setCatData({
          labels: labels,
          adaptabilityData: adaptabilityData,
          affectionData: affectionData,
          childFriendlyData: childFriendlyData,
          dogFriendlyData: dogFriendlyData,
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
                text: "Características Familiares",
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
      title="Comparação de Adequação Familiar"
      icon="👨‍👩‍👧‍👦"
      footer="Compatibilidade com famílias, crianças e outros animais"
    >
      <div style={{ height: '350px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      {catData && catData.categories && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Alta Adaptabilidade */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 transition-colors">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                Alta Adaptabilidade
              </span>
              <span className="text-sm font-normal">({catData.categories["Alta Adaptabilidade"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alta Adaptabilidade"] ? catData.categories["Alta Adaptabilidade"] : catData.categories["Alta Adaptabilidade"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alta Adaptabilidade"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alta Adaptabilidade": !prev["Alta Adaptabilidade"] }))}
                className="mt-3 text-sm text-red-700 dark:text-red-400 hover:underline font-medium"
              >
                {showAll["Alta Adaptabilidade"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alta Adaptabilidade"].length})`}
              </button>
            )}
          </div>

          {/* Alto Afeto */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800 transition-colors">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                Alto Afeto
              </span>
              <span className="text-sm font-normal">({catData.categories["Alto Afeto"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Alto Afeto"] ? catData.categories["Alto Afeto"] : catData.categories["Alto Afeto"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Alto Afeto"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Alto Afeto": !prev["Alto Afeto"] }))}
                className="mt-3 text-sm text-yellow-700 dark:text-yellow-400 hover:underline font-medium"
              >
                {showAll["Alto Afeto"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Alto Afeto"].length})`}
              </button>
            )}
          </div>

          {/* Amigável com Crianças */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Amigável com Crianças
              </span>
              <span className="text-sm font-normal">({catData.categories["Amigável com Crianças"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Amigável com Crianças"] ? catData.categories["Amigável com Crianças"] : catData.categories["Amigável com Crianças"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Amigável com Crianças"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Amigável com Crianças": !prev["Amigável com Crianças"] }))}
                className="mt-3 text-sm text-green-700 dark:text-green-400 hover:underline font-medium"
              >
                {showAll["Amigável com Crianças"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Amigável com Crianças"].length})`}
              </button>
            )}
          </div>

          {/* Amigável com Cães */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800 transition-colors">
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-400 mb-2 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                Amigável com Cães
              </span>
              <span className="text-sm font-normal">({catData.categories["Amigável com Cães"].length})</span>
            </h3>
            <ul className="space-y-1 max-h-64 overflow-y-auto">
              {(showAll["Amigável com Cães"] ? catData.categories["Amigável com Cães"] : catData.categories["Amigável com Cães"].slice(0, 5)).map((breed) => (
                <li key={breed} className="text-sm text-gray-700 dark:text-gray-300 pl-5">• {breed}</li>
              ))}
            </ul>
            {catData.categories["Amigável com Cães"].length > 5 && (
              <button
                onClick={() => setShowAll(prev => ({ ...prev, "Amigável com Cães": !prev["Amigável com Cães"] }))}
                className="mt-3 text-sm text-orange-700 dark:text-orange-400 hover:underline font-medium"
              >
                {showAll["Amigável com Cães"] ? '▲ Ver menos' : `▼ Ver todas (${catData.categories["Amigável com Cães"].length})`}
              </button>
            )}
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

export default FamilySuitabilityChart;
