import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto"; // Importar a classe Chart

function HealthAndWellnessChart({ limit }) {
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    // Realizar a solicitação à API
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        // Extrair os dados relevantes da resposta da API
        const labels = data.map((breed) => breed.name);
        const lifespanData = data.map((breed) => {
          // Verificar se a expectativa de vida é um intervalo
          if (breed.life_span.includes("-")) {
            const [min, max] = breed.life_span.split("-").map(Number);
            // Calcular o valor médio da faixa
            return (min + max) / 2;
          } else {
            // Se não for um intervalo, converter para número diretamente
            return Number(breed.life_span);
          }
        });

        const healthIssuesData = data.map((breed) => breed.health_issues);

        // Limitar o número de raças de acordo com o limite especificado
        const limitedLabels = labels.slice(0, limit);
        const limitedLifespanData = lifespanData.slice(0, limit);
        const limitedHealthIssuesData = healthIssuesData.slice(0, limit);

        // Atualizar o estado com os dados extraídos
        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Expectativa de Vida (anos)",
              data: limitedLifespanData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
              label: "Problemas de Saúde",
              data: limitedHealthIssuesData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
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
      const ctx = document.getElementById("myHealthChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: catData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Valores",
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
      <h2>Análise de Saúde e Bem-Estar</h2>
      <canvas id="myHealthChart"></canvas>
    </div>
  );
}

export default HealthAndWellnessChart;
