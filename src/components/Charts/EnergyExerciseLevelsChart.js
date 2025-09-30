import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

// Componente funcional EnergyExerciseLevelsChart para exibir gráficos de níveis de energia e exercício de raças de gatos
function EnergyExerciseLevelsChart({ limit }) {
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
        const energyData = data.map((breed) => breed.energy_level);

        // Classificar os níveis de energia em categorias: calmo, moderadamente ativo e ativo
        const energyCategories = energyData.map((energy) => {
          if (energy <= 2) return "Calmo";
          else if (energy <= 4) return "Moderadamente Ativo";
          else return "Ativo";
        });

        // Cria um objeto para armazenar os nomes das raças para cada categoria
        const breedNames = {
          Calmo: [],
          "Moderadamente Ativo": [],
          Ativo: [],
        };

        // Preencher o objeto com os nomes das raças correspondentes a cada categoria
        labels.forEach((breed, index) => {
          breedNames[energyCategories[index]].push(breed);
        });

        // Limitar o número de raças de acordo com o limite especificado
        const limitedBreedNames = {
          Calmo: breedNames.Calmo.slice(0, limit),
          "Moderadamente Ativo": breedNames["Moderadamente Ativo"].slice(
            0,
            limit
          ),
          Ativo: breedNames.Ativo.slice(0, limit),
        };

        // Atualizar o state com os dados extraídos
        setCatData(limitedBreedNames);
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
  }, [limit]);

  // Efeito para criar e atualizar o gráfico quando os dados das raças de gatos são carregados ou alterados
  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }
    if (catData) {
      const ctx = document.getElementById("myEnergyChart");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(catData),
          datasets: [
            {
              label: "Número de Raças",
              data: Object.values(catData).map((breeds) => breeds.length),
              backgroundColor: [
                "rgba(75, 192, 192, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Número de Raças",
              },
            },
            x: {
              title: {
                display: true,
                text: "Nível de Energia",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
      setMyChart(newChart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catData]);

  // Renderiza o componente EnergyExerciseLevelsChart
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Níveis de Energia e Exercício</h2>

      {/* Canvas para renderizar o gráfico */}
      <div className="mb-8">
        <canvas id="myEnergyChart"></canvas>
      </div>

      {/* Lista de raças de gatos categorizadas por nível de energia */}
      {catData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Raças Mais Calmas
            </h3>
            <ul className="space-y-1">
              {catData.Calmo.map((breed) => (
                <li key={breed} className="text-sm text-gray-700 pl-5">• {breed}</li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Raças Moderadamente Ativas
            </h3>
            <ul className="space-y-1">
              {catData["Moderadamente Ativo"].map((breed) => (
                <li key={breed} className="text-sm text-gray-700 pl-5">• {breed}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Raças Mais Ativas
            </h3>
            <ul className="space-y-1">
              {catData.Ativo.map((breed) => (
                <li key={breed} className="text-sm text-gray-700 pl-5">• {breed}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnergyExerciseLevelsChart;
