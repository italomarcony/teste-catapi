import { useState, useEffect } from 'react';
import { fetchBreeds } from '../services/catApi';

/**
 * Hook personalizado para buscar raças de gatos
 * @param {number} limit - Número de raças a retornar
 * @returns {Object} { breeds, loading, error }
 */
export const useCatBreeds = (limit = null) => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadBreeds = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBreeds(limit);

        if (isMounted) {
          setBreeds(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar raças');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBreeds();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { breeds, loading, error };
};
