import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto"; // Importar a classe Chart

function TemperamentAndSocialNeedsChart({ limit }) {
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    // Realizar a solicitação à API
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        // Extrair os dados relevantes da resposta da API
        const labels = data.map((breed) => breed.name);
        const activityData = data.map((breed) => breed.activity_level);
        const intelligenceData = data.map((breed) => breed.intelligence);
        const sociabilityData = data.map((breed) => breed.social_needs);
        const vocalizationData = data.map((breed) => breed.vocalisation);

        // Limitar o número de raças de acordo com o limite especificado
        const limitedLabels = labels.slice(0, limit);
        const limitedActivityData = activityData.slice(0, limit);
        const limitedIntelligenceData = intelligenceData.slice(0, limit);
        const limitedSociabilityData = sociabilityData.slice(0, limit);
        const limitedVocalizationData = vocalizationData.slice(0, limit);

        // Atualizar o estado com os dados extraídos
        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Atividade",
              data: limitedActivityData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Inteligência",
              data: limitedIntelligenceData,
              backgroundColor: "rgba(255, 206, 86, 0.5)",
            },
            {
              label: "Sociabilidade",
              data: limitedSociabilityData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
              label: "Nível de Vocalização",
              data: limitedVocalizationData,
              backgroundColor: "rgba(255, 159, 64, 0.5)",
            },
          ],
        });
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
  }, [limit]);

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }
    if (catData) {
      const ctx = document.getElementById("myChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: catData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                max: 5,
              },
              title: {
                display: true,
                text: "Nível",
              },
            },
            x: {
              title: {
                display: true,
                text: "Raças de Gatos",
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });
      setMyChart(newChart);
    }
  }, [catData]);

  return (
    <div>
      <h2>Comparação de Temperamento e Necessidades Sociais</h2>
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default TemperamentAndSocialNeedsChart;
