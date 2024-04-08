import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./styles/Graphics.css";

// Componente funcional HealthAndWellnessChart para exibir gráficos de saúde e bem-estar de raças de gatos
function HealthAndWellnessChart({ limit }) {
  // Estado para armazenar os dados das raças de gatos e o gráfico
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  // Efeito para carregar os dados das raças de gatos da API ao montar o componente ou quando o limite é alterado
  useEffect(() => {
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
            // Se não for um intervalo, converte direto para um número
            return Number(breed.life_span);
          }
        });

        const healthIssuesData = data.map((breed) => breed.health_issues);

        // Limita o número de raças de acordo com o limite especificado
        const limitedLabels = labels.slice(0, limit);
        const limitedLifespanData = lifespanData.slice(0, limit);
        const limitedHealthIssuesData = healthIssuesData.slice(0, limit);

        // Atualiza o state com os dados extraídos
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

  // Efeito para criar e atualizar o gráfico quando os dados das raças de gatos são carregados ou alterados
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

  // Renderiza o componente HealthAndWellnessChart
  return (
    <div className="chart-container">
      <h2 className="chart-title">Análise de Saúde e Bem-Estar</h2>

      {/* Canvas para renderizar o gráfico */}
      <canvas id="myHealthChart"></canvas>
    </div>
  );
}

export default HealthAndWellnessChart;
