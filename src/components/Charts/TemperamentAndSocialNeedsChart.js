import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartContainer from '../UI/ChartContainer';
import { useTheme } from '../../hooks/useTheme';

function TemperamentAndSocialNeedsChart({ limit }) {
  const [catData, setCatData] = useState(null);
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

        const limitedLabels = labels.slice(0, limit);
        const limitedActivityData = activityData.slice(0, limit);
        const limitedIntelligenceData = intelligenceData.slice(0, limit);
        const limitedSociabilityData = sociabilityData.slice(0, limit);
        const limitedVocalizationData = vocalizationData.slice(0, limit);

        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Atividade",
              data: limitedActivityData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Inteligência",
              data: limitedIntelligenceData,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Sociabilidade",
              data: limitedSociabilityData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Nível de Vocalização",
              data: limitedVocalizationData,
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
      title="Comparação de Temperamento e Necessidades Sociais"
      icon="🧠"
      footer="Análise de personalidade e características sociais"
    >
      <div style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </ChartContainer>
  );
}

export default TemperamentAndSocialNeedsChart;
