import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto"; // Importar a classe Chart

function EnergyExerciseLevelsChart({ limit }) {
  const [catData, setCatData] = useState(null);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    // Realizar a solicitação à API
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => {
        // Extrair os dados relevantes da resposta da API
        const labels = data.map((breed) => breed.name);
        const energyData = data.map((breed) => breed.energy_level);

        // Classificar os níveis de energia em categorias: calmo, moderadamente ativo, ativo
        const energyCategories = energyData.map((energy) => {
          if (energy <= 2) return "Calmo";
          else if (energy <= 4) return "Moderadamente Ativo";
          else return "Ativo";
        });

        // Criar um objeto para armazenar os nomes das raças para cada categoria de energia
        const breedNames = {
          Calmo: [],
          "Moderadamente Ativo": [],
          Ativo: [],
        };

        // Preencher o objeto com os nomes das raças correspondentes a cada categoria de energia
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

        // Atualizar o estado com os dados extraídos
        setCatData(limitedBreedNames);
      })
      .catch((error) => console.error("Erro ao obter dados da API:", error));
  }, [limit]);

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
  }, [catData]);

  return (
    <div>
      <h2>Níveis de Energia e Exercício</h2>
      <canvas id="myEnergyChart"></canvas>
      <div>
        {catData && (
          <div>
            <h3>Raças Mais Calmas:</h3>
            <ul>
              {catData.Calmo.map((breed) => (
                <li key={breed}>{breed}</li>
              ))}
            </ul>
            <h3>Raças Moderadamente Ativas:</h3>
            <ul>
              {catData["Moderadamente Ativo"].map((breed) => (
                <li key={breed}>{breed}</li>
              ))}
            </ul>
            <h3>Raças Mais Ativas:</h3>
            <ul>
              {catData.Ativo.map((breed) => (
                <li key={breed}>{breed}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnergyExerciseLevelsChart;
