import React, { useState } from "react";
import "./styles/CatBreed.css";

// Componente que representa uma única raça de gato
// Recebe os props contendo os dados de uma raça de gato específica

function CatBreed({ breed }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // URL da imagem da raça (a API retorna isso no objeto breed)
  const imageUrl = breed.image?.url || breed.reference_image_id
    ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
    : null;

  return (
    <div className="cat-breed">
      {imageUrl && (
        <div className="cat-breed-image-container">
          {!imageLoaded && !imageError && (
            <div className="cat-breed-image-skeleton">Carregando...</div>
          )}
          {imageError && (
            <div className="cat-breed-image-error">Imagem não disponível</div>
          )}
          <img
            src={imageUrl}
            alt={breed.name}
            className={`cat-breed-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
      )}

      <div className="cat-breed-content">
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
    </div>
  );
}

export default CatBreed;
