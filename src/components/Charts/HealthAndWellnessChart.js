import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function HealthAndWellnessChart({ limit }) {
  const [catData, setCatData] = useState(null);
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

        const limitedLabels = labels.slice(0, limit);
        const limitedLifespanData = lifespanData.slice(0, limit);
        const limitedHealthIssuesData = healthIssuesData.slice(0, limit);

        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Expectativa de Vida (anos)",
              data: limitedLifespanData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Problemas de Saúde",
              data: limitedHealthIssuesData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        });
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
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
                color: isDark ? '#d1d5db' : '#374151',
              },
              title: {
                display: true,
                text: "Valores",
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
              }
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
      title="Análise de Saúde e Bem-Estar"
      icon="❤️"
      footer="Expectativa de vida e problemas de saúde por raça"
    >
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </ChartContainer>
  );
}

export default HealthAndWellnessChart;
