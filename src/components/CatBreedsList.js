import React, { useState, useEffect } from "react";
import CatBreed from "./CatBreed";

function CatBreedsList({ limit }) {
  // Definir para armazenar as raças de gatos
  const [catBreeds, setCatBreeds] = useState([]);

  useEffect(() => {
    // Função para buscar os dados das raças de gatos da API
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json()) // Converte a resposta em formato JSON
      .then((data) => setCatBreeds(data)) // Define os dados das raças no estado catBreeds
      .catch((error) => console.error("Error fetching cat breeds:", error)); // Trata erros de requisição
  }, []); // O segundo parâmetro [] indica que esse efeito ocorre apenas uma vez, após a montagem do componente

  return (
    <div className="cat-breeds">
      {catBreeds.slice(0, limit).map((breed) => (
        <CatBreed key={breed.id} breed={breed} />
      ))}
    </div>
  );
}

export default CatBreedsList;
