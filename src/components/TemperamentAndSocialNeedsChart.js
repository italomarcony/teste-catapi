import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto"; // Importa a classe Chart
import "./styles/Graphics.css";

function TemperamentAndSocialNeedsChart({ limit }) {
  // State para armazenar os dados do gráfico e o objeto Chart
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    // Realiza a solicitação à API para obter os dados das raças de gatos
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        // Extrai os dados relevantes da resposta da API
        const labels = data.map((breed) => breed.name);
        const activityData = data.map((breed) => breed.energy_level);
        const intelligenceData = data.map((breed) => breed.intelligence);
        const sociabilityData = data.map((breed) => breed.social_needs);
        const vocalizationData = data.map((breed) => breed.vocalisation);

        // Limita o número de raças de acordo com o limite especificado
        const limitedLabels = labels.slice(0, limit);
        const limitedActivityData = activityData.slice(0, limit);
        const limitedIntelligenceData = intelligenceData.slice(0, limit);
        const limitedSociabilityData = sociabilityData.slice(0, limit);
        const limitedVocalizationData = vocalizationData.slice(0, limit);

        // Atualiza o state com os dados extraídos
        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Atividade",
              data: limitedActivityData,
              backgroundColor: "rgba(255, 99, 132, 0.5)", // Cor de fundo para atividade
            },
            {
              label: "Inteligência",
              data: limitedIntelligenceData,
              backgroundColor: "rgba(255, 206, 86, 0.5)", // Cor de fundo para inteligência
            },
            {
              label: "Sociabilidade",
              data: limitedSociabilityData,
              backgroundColor: "rgba(75, 192, 192, 0.5)", // Cor de fundo para sociabilidade
            },
            {
              label: "Nível de Vocalização",
              data: limitedVocalizationData,
              backgroundColor: "rgba(255, 159, 64, 0.5)", // Cor de fundo para nível de vocalização
            },
          ],
        });
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
  }, [limit]);

  useEffect(() => {
    // Atualiza o gráfico quando os dados mudam
    if (myChart) {
      myChart.destroy(); // Destroi o gráfico anterior para evitar duplicatas
    }
    if (catData) {
      const ctx = document.getElementById("myChart"); // Obtém o contexto do canvas
      const newChart = new Chart(ctx, {
        type: "bar", // Tipo de gráfico: barra
        data: catData, // Dados do gráfico
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
    <div className="chart-container">
      <h2 className="chart-title">
        Comparação de Temperamento e Necessidades Sociais
      </h2>
      <canvas id="myChart" className="chart-canvas"></canvas>{" "}
      {/* Canvas para renderizar o gráfico */}
    </div>
  );
}

export default TemperamentAndSocialNeedsChart;
