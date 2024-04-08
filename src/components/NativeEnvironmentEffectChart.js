import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./styles/NativeEnvironmentEffectChart.css";

// Componente funcional NativeEnvironmentEffectChart para exibir gráficos de influência do ambiente nativo no temperamento e necessidades
function NativeEnvironmentEffectChart() {
  // State para armazenar os dados do gráfico e o objeto do gráfico
  const [chartData, setChartData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  // Efeito para definir os dados do gráfico ao montar o componente
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

  // Efeito para criar e atualizar o gráfico quando os dados mudam
  useEffect(() => {
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
            title: {
              display: true,
              text: "Comparação entre Abissínio e Aegean",
              font: {
                size: 18,
              },
            },
          },
        },
      });
      setMyChart(newChart);
    }
  }, [chartData]);

  // Renderiza o componente NativeEnvironmentEffectChart
  return (
    <div className="native-environment-chart-container">
      <h2 className="chart-title">
        Influência do Ambiente Nativo no Temperamento e Necessidades
      </h2>

      {/* Canvas para renderizar o gráfico */}
      <canvas id="nativeEnvironmentChart"></canvas>

      {/* Lista de raças adaptadas a diferentes ambientes */}
      <div style={{ marginTop: "20px" }}>
        <h2 className="native-environment-chart-title">
          Informações sobre Raças Adaptadas a Diferentes Ambientes:
        </h2>
        <h3>Climas Quentes:</h3>
        <ul className="native-environment-chart-list">
          <li>Abyssinian</li>
          <li>Siamês</li>
          <li>Oriental</li>
          <li>Singapura</li>
        </ul>
        <h3>Climas Frios:</h3>
        <ul className="native-environment-chart-list">
          <li>Maine Coon</li>
          <li>Norueguês da Floresta</li>
          <li>Persa</li>
          <li>Ragdoll</li>
        </ul>
        <h3>Ambientes Internos:</h3>
        <ul className="native-environment-chart-list">
          <li>Abyssinian</li>
          <li>Aegean</li>
          <li>Bengal</li>
          <li>Sphynx</li>
        </ul>
        <h3>Ambientes Externos:</h3>
        <ul className="native-environment-chart-list">
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
