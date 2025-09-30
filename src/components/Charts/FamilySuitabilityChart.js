import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

// Componente funcional FamilySuitabilityChart para exibir gráficos de adequação familiar de raças de gatos
function FamilySuitabilityChart({ limit }) {
  // State para armazenar os dados das raças de gatos e o gráfico
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  // Efeito para carregar os dados das raças de gatos da API ao montar o componente ou quando o limite é alterado
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        // Extrair os dados relevantes da resposta da API
        const labels = data.map((breed) => breed.name);
        const adaptabilityData = data.map((breed) => breed.adaptability);
        const affectionData = data.map((breed) => breed.affection_level);
        const childFriendlyData = data.map((breed) => breed.child_friendly);
        const dogFriendlyData = data.map((breed) => breed.dog_friendly);

        // Limitar o número de raças de acordo com o limite especificado
        const limitedLabels = labels.slice(0, limit);
        const limitedAdaptabilityData = adaptabilityData.slice(0, limit);
        const limitedAffectionData = affectionData.slice(0, limit);
        const limitedChildFriendlyData = childFriendlyData.slice(0, limit);
        const limitedDogFriendlyData = dogFriendlyData.slice(0, limit);

        // Atualizar o state com os dados extraídos
        setCatData({
          labels: limitedLabels,
          datasets: [
            {
              label: "Adaptabilidade",
              data: limitedAdaptabilityData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Nível de Afeto",
              data: limitedAffectionData,
              backgroundColor: "rgba(255, 206, 86, 0.5)",
            },
            {
              label: "Amizade com Crianças",
              data: limitedChildFriendlyData,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
              label: "Amizade com Cães",
              data: limitedDogFriendlyData,
              backgroundColor: "rgba(255, 159, 64, 0.5)",
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
      const ctx = document.getElementById("myFamilyChart");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catData]);

  // Renderiza o componente FamilySuitabilityChart
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparação de Adequação Familiar</h2>
      {/* Canvas para renderizar o gráfico */}
      <div className="mb-4">
        <canvas id="myFamilyChart"></canvas>
      </div>
    </div>
  );
}

export default FamilySuitabilityChart;
