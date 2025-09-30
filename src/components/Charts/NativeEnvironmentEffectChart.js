import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  // Renderiza o componente NativeEnvironmentEffectChart
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Influência do Ambiente Nativo no Temperamento e Necessidades
      </h2>

      {/* Canvas para renderizar o gráfico */}
      <div className="mb-8">
        <canvas id="nativeEnvironmentChart"></canvas>
      </div>

      {/* Lista de raças adaptadas a diferentes ambientes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Informações sobre Raças Adaptadas a Diferentes Ambientes:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">Climas Quentes:</h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 pl-5">• Abyssinian</li>
              <li className="text-sm text-gray-700 pl-5">• Siamês</li>
              <li className="text-sm text-gray-700 pl-5">• Oriental</li>
              <li className="text-sm text-gray-700 pl-5">• Singapura</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Climas Frios:</h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 pl-5">• Maine Coon</li>
              <li className="text-sm text-gray-700 pl-5">• Norueguês da Floresta</li>
              <li className="text-sm text-gray-700 pl-5">• Persa</li>
              <li className="text-sm text-gray-700 pl-5">• Ragdoll</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Ambientes Internos:</h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 pl-5">• Abyssinian</li>
              <li className="text-sm text-gray-700 pl-5">• Aegean</li>
              <li className="text-sm text-gray-700 pl-5">• Bengal</li>
              <li className="text-sm text-gray-700 pl-5">• Sphynx</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-purple-800 mb-3">Ambientes Externos:</h4>
            <ul className="space-y-1">
              <li className="text-sm text-gray-700 pl-5">• Maine Coon</li>
              <li className="text-sm text-gray-700 pl-5">• Norueguês da Floresta</li>
              <li className="text-sm text-gray-700 pl-5">• Siamês</li>
              <li className="text-sm text-gray-700 pl-5">• Abyssinian</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NativeEnvironmentEffectChart;
