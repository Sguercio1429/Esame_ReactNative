import { useState, useCallback } from "react";
import { PREFERRED_PRODUCTS } from "../../../core/storage/types";
import { storage } from "../../../core/storage/storage";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Funzione per caricare i prodotti dall'API
  const refreshProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await storage.getItem(PREFERRED_PRODUCTS);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      setFavoriteIds(parsedFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  const addFavorites = useCallback(
    async (product: Product) => {
      const updatedFavorites = favoriteIds.includes(product.id)
        ? favoriteIds.filter((id) => id !== product.id)
        : [...favoriteIds, product.id];

      setFavoriteIds(updatedFavorites);
      await storage.setItem(
        PREFERRED_PRODUCTS,
        JSON.stringify(updatedFavorites)
      );
    },
    [favoriteIds]
  );

  return {
    products,
    setProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorites,
  };
};
