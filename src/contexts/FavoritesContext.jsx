import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : { designs: [], products: [] };
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (type, id) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites[type]) {
        return { ...prevFavorites, [type]: [id] };
      }
      if (!prevFavorites[type].includes(id)) {
        return { ...prevFavorites, [type]: [...prevFavorites[type], id] };
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (type, id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [type]: prevFavorites[type] ? prevFavorites[type].filter((favorite) => favorite !== id) : [],
    }));
  };

  return (
    <FavoritesContext.Provider value={{ addFavorite, removeFavorite, favorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
