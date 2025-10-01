import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function FamilySuitabilityChart({ limit }) {
  const [catData, setCatData] = useState(null);
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

        const limitedLabels = labels.slice(0, limit);
        const limitedAdaptabilityData = adaptabilityData.slice(0, limit);
        const limitedAffectionData = affectionData.slice(0, limit);
        const limitedChildFriendlyData = childFriendlyData.slice(0, limit);
        const limitedDogFriendlyData = dogFriendlyData.slice(0, limit);

        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Adaptabilidade",
              data: limitedAdaptabilityData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Nível de Afeto",
              data: limitedAffectionData,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Amizade com Crianças",
              data: limitedChildFriendlyData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Amizade com Cães",
              data: limitedDogFriendlyData,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
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
                stepSize: 1,
                max: 5,
                color: isDark ? '#d1d5db' : '#374151',
              },
              title: {
                display: true,
                text: "Nível",
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
      title="Comparação de Adequação Familiar"
      icon="👨‍👩‍👧‍👦"
      footer="Compatibilidade com famílias, crianças e outros animais"
    >
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </ChartContainer>
  );
}

export default FamilySuitabilityChart;
