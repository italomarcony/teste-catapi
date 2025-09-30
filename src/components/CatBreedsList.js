import React from "react";
import CatBreed from "./CatBreed";
import { useCatBreeds } from "../hooks/useCatBreeds";
import "./styles/CatBreedsList.css";

// Componente funcional CatBreedsList que exibe uma lista de raças de gato.

function CatBreedsList({ limit }) {
  const { breeds, loading, error } = useCatBreeds(limit);

  if (loading) {
    return (
      <div className="cat-breeds-container">
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Carregando raças de gatos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cat-breeds-container">
        <div className="error-message">
          <p>❌ Erro ao carregar raças: {error}</p>
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Retorna a lista de raças de gato
  return (
    <div className="cat-breeds-container">
      {breeds.map((breed) => (
        <CatBreed key={breed.id} breed={breed} />
      ))}
    </div>
  );
}

export default CatBreedsList;
