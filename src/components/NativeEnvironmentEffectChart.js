import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

function NativeEnvironmentEffectChart() {
  const [chartData, setChartData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    // Dados das características das raças
    const abissinioData = {
      label: "Abyssinian",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      data: [5, 5, 5, 5, 3], // Adaptabilidade, Atividade, Sociabilidade, Exercício, Tolerância ao frio
    };

    const aegeanData = {
      label: "Aegean",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      data: [5, 3, 4, 3, 5], // Adaptabilidade, Atividade, Sociabilidade, Exercício, Tolerância ao frio
    };

    // Configuração do gráfico
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
    // Atualização do gráfico quando os dados mudam
    if (myChart) {
      myChart.destroy();
    }
    if (chartData) {
      const ctx = document.getElementById("nativeEnvironmentChart");
      const newChart = new Chart(ctx, {
        type: "radar",
        data: chartData,
        options: {
          elements: {
            line: {
              borderWidth: 3,
            },
          },
          scales: {
            r: {
              beginAtZero: true,
              suggestedMax: 5,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Influência do Ambiente Nativo no Temperamento e Necessidades",
              font: {
                size: 18,
              },
            },
            subtitle: {
              display: true,
              text: "Comparação entre Abissínio e Aegean",
              font: {
                size: 14,
              },
            },
          },
        },
      });
      setMyChart(newChart);
    }
  }, [chartData]);

  return (
    <div>
      <canvas id="nativeEnvironmentChart"></canvas>
      <div style={{ marginTop: "20px" }}>
        <h2>Informações sobre Raças Adaptadas a Diferentes Ambientes:</h2>
        <h3>Climas Quentes:</h3>
        <ul>
          <li>Abyssinian</li>
          <li>Siamês</li>
          <li>Oriental</li>
          <li>Singapura</li>
        </ul>
        <h3>Climas Frios:</h3>
        <ul>
          <li>Maine Coon</li>
          <li>Norueguês da Floresta</li>
          <li>Persa</li>
          <li>Ragdoll</li>
        </ul>
        <h3>Ambientes Internos:</h3>
        <ul>
          <li>Abyssinian</li>
          <li>Aegean</li>
          <li>Bengal</li>
          <li>Sphynx</li>
        </ul>
        <h3>Ambientes Externos:</h3>
        <ul>
          <li>Maine Coon</li>
          <li>Norueguês da Floresta</li>
          <li>Siamês</li>
          <li>Abyssinian</li>
        </ul>
      </div>
    </div>
  );
}

export default NativeEnvironmentEffectChart;
