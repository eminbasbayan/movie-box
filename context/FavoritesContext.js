import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = '@moviebox_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        const valid = Array.isArray(parsed)
          ? parsed.filter((item) => item && item.id !== null)
          : [];

        setFavorites(valid);
      }
    } catch (error) {
      console.log('[Favorites] yüklenirken bir hata: ', error);
    }
  }

  async function saveFavorites(newFavorites) {
    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites),
      );
    } catch (error) {
      console.log('[Favorites] kaydedilirken bir hata: ', error);
    }
  }

  function addFavorite(movie) {
    if (!movie || movie.id === null) {
      console.log('[Favorites] geçersiz bir film, eklenmiyor: ', movie);
      return;
    }

    // Duplicate kontrolü
    if (favorites.some((f) => f.id === movie.id)) return;
    const updated = [...favorites, movie];
    setFavorites(updated);
    saveFavorites(updated);
  }

  function removeFavorite(movieId) {
    const updated = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updated);
    saveFavorites(updated);
  }

  function isFavorite(movieId) {
    return favorites.some((movie) => movie.id === movieId);
  }

  function toggleFavorite(movie) {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
