import React from "react";
import "./styles/CatBreed.css";

// Componente que representa uma única raça de gato
// Recebe os props contendo os dados de uma raça de gato específica

function CatBreed({ breed }) {
  return (
    <div className="cat-breed">
      <h2>{breed.name}</h2>
      <p>
        <strong>Origem:</strong> {breed.origin}
      </p>
      <p>
        <strong>Descrição:</strong> {breed.description}
      </p>
      <p>
        <strong>Temperamento:</strong> {breed.temperament}
      </p>
      <p>
        <strong>Nível de Afeto:</strong> {breed.affection_level}
      </p>
      <p>
        <strong>Nível de Energia:</strong> {breed.energy_level}
      </p>
    </div>
  );
}

export default CatBreed;
