import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

// Componente funcional PopularityAvailabilityChart para exibir gráficos de análise de popularidade e disponibilidade de raças de gatos
function PopularityAvailabilityChart({ limit }) {
  // State para armazenar os dados do gráfico e o objeto do gráfico
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  // Effect para definir os dados do gráfico ao montar o componente
  useEffect(() => {
    // Dados fornecidos
    const breedData = [
      {
        name: "Abyssinian",
        popularityWeb: "Média",
        popularityComparison: "Menor volume em comparação com Persa",
        registrations: "33ª posição em registros da TICA (2.423 gatos)",
        comparisonRegistrations: "Persa ocupou a 1ª posição (35.643 gatos)",
        rankerPosition: "14ª posição em ranking de popularidade",
        catster: "Relativamente rara",
      },
      {
        name: "Aegean",
        popularityWeb: "Baixa",
        popularityComparison: "Menor volume em comparação com Abissínio",
        registrations:
          "Não figurou entre as 50 raças com mais registros da TICA",
        comparisonRegistrations: "Abissínio ocupou a 33ª posição",
        rankerPosition: "Não está presente no ranking de popularidade",
        catster: "Rara",
      },
    ];

    // Extrair os dados relevantes da resposta da API
    const labels = breedData.map((breed) => breed.name);
    const rarityData = breedData.map((breed) =>
      breed.catster === "Rara" ? 1 : 0
    ); // Se a raça for considerada rara (1), então é rara, caso contrário (0), não é rara

    // Atualizar o estado com os dados extraídos
    setCatData({
      labels: labels,
      datasets: [
        {
          label: "Raridade",
          data: rarityData,
          backgroundColor: rarityData.map((rarity) =>
            rarity === 1 ? "rgba(54, 162, 235, 0.5)" : "rgba(255, 99, 132, 0.5)"
          ),
        },
      ],
      breedInfo: breedData, // Incluindo as informações das raças
    });
  }, [limit]);

  // Effect para criar e atualizar o gráfico quando os dados mudam
  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }
    if (catData) {
      const ctx = document.getElementById("popularityAvailabilityChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: catData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Nível de Raridade",
                font: {
                  size: 16,
                },
              },
              ticks: {
                stepSize: 1,
              },
            },
            x: {
              title: {
                display: true,
                text: "Raças de Gatos",
                font: {
                  size: 16,
                },
              },
            },
          },
          plugins: {
            // Legendas e rótulos
            legend: {
              display: true,
              position: "top",
              labels: {
                filter: function (item) {
                  return item.datasetIndex === 0;
                },
                generateLabels: function (chart) {
                  return [
                    {
                      text: "Barras mais altas representam raças mais raras",
                      fillStyle: "rgba(54, 162, 235, 0.5)",
                      font: {
                        size: 14,
                      },
                    },
                  ];
                },
              },
            },
          },
        },
      });
      setMyChart(newChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catData]);

  // Renderiza o componente PopularityAvailabilityChart
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Análise de Popularidade e Disponibilidade
      </h2>

      {/* Canvas para renderizar o gráfico */}
      <div className="mb-8">
        <canvas id="popularityAvailabilityChart"></canvas>
      </div>

      {/* Mostrando informações sobre as raças */}
      {catData && catData.breedInfo && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Informações sobre as Raças:</h3>
          <div className="space-y-6">
            {catData.breedInfo.map((breed) => (
              <div key={breed.name} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{breed.name}</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><strong>Popularidade na Web:</strong> {breed.popularityWeb}</li>
                  <li><strong>Comparação com outras raças:</strong> {breed.popularityComparison}</li>
                  <li><strong>Inscrições em clubes de raças:</strong> {breed.registrations}</li>
                  <li><strong>Comparação com outras raças:</strong> {breed.comparisonRegistrations}</li>
                  <li><strong>Posição no ranking Ranker:</strong> {breed.rankerPosition}</li>
                  <li><strong>Catster:</strong> {breed.catster}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularityAvailabilityChart;
