import React, { useState, useEffect } from "react";
import CatBreed from "./CatBreed";
import "./styles/CatBreedsList.css";

// Componente funcional CatBreedsList que exibe uma lista de raças de gato.

function CatBreedsList({ limit }) {
  // State para armazenar as raças de gato
  const [catBreeds, setCatBreeds] = useState([]);

  // Usado para carregar as raças de gato da API ao montar o componente.
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((data) => setCatBreeds(data.slice(0, limit)))
      .catch((error) => console.error("Error fetching cat breeds:", error));
  }, [limit]);

  // Retorna a lista de raças de gato
  return (
    <div className="cat-breeds-container">
      {catBreeds.map((breed) => (
        <CatBreed key={breed.id} breed={breed} />
      ))}
    </div>
  );
}

export default CatBreedsList;
