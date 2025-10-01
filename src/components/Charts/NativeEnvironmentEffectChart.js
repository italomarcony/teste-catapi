import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function NativeEnvironmentEffectChart() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const abissinioData = {
      label: "Abyssinian",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "#fff",
      borderWidth: 2,
      data: [5, 5, 5, 5, 3],
    };

    const aegeanData = {
      label: "Aegean",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointBorderColor: "#fff",
      borderWidth: 2,
      data: [5, 3, 4, 3, 5],
    };

    setChartData({
      labels: [
        "Adaptabilidade",
        "Atividade",
        "Sociabilidade",
        "Exercício",
        "Tolerância ao frio",
      ],
      datasets: [abissinioData, aegeanData],
    });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    if (chartData && canvasRef.current) {
      const isDark = theme === 'dark';
      const ctx = canvasRef.current.getContext('2d');

      // Update point border colors based on theme
      const updatedChartData = {
        ...chartData,
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          pointBorderColor: isDark ? '#1f2937' : '#fff',
        }))
      };

      const newChart = new Chart(ctx, {
        type: "radar",
        data: updatedChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 2,
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              suggestedMax: 5,
              ticks: {
                stepSize: 1,
                color: isDark ? '#d1d5db' : '#374151',
              },
              pointLabels: {
                color: isDark ? '#d1d5db' : '#374151',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              grid: {
                color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              },
              angleLines: {
                color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: isDark ? '#d1d5db' : '#374151',
              }
            },
            title: {
              display: true,
              text: "Comparação entre Abissínio e Aegean",
              color: isDark ? '#d1d5db' : '#374151',
              font: {
                size: 16,
                weight: 'bold'
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
  }, [chartData, theme]);

  return (
    <ChartContainer
      title="Influência do Ambiente Nativo no Temperamento e Necessidades"
      icon="🌍"
      footer="Características por tipo de ambiente e clima"
    >
      <div style={{ height: '400px' }} className="mb-6">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Informações sobre Raças Adaptadas a Diferentes Ambientes:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800 transition-colors">
            <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-400 mb-3 flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Climas Quentes
            </h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Abyssinian</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Siamês</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Oriental</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Singapura</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 transition-colors">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Climas Frios
            </h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Maine Coon</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Norueguês da Floresta</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Persa</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Ragdoll</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 transition-colors">
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Ambientes Internos
            </h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Abyssinian</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Aegean</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Bengal</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Sphynx</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 transition-colors">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-400 mb-3 flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              Ambientes Externos
            </h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Maine Coon</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Norueguês da Floresta</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Siamês</li>
              <li className="text-sm text-gray-700 dark:text-gray-300 pl-5">• Abyssinian</li>
            </ul>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}

export default NativeEnvironmentEffectChart;
