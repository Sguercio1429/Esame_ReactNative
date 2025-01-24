import { useState, useCallback } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]); // Stato per i preferiti

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((item) => item.id === product.id);
      if (isFavorite) {
        // Rimuovi dai preferiti
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        // Aggiungi ai preferiti
        return [...prevFavorites, product];
      }
    });
  }, []);

  return {
    products,
    favorites,
    fetchProducts,
    toggleFavorite,
  };
};
