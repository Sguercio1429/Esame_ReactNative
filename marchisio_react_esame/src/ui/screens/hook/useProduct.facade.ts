import { useState, useCallback, useMemo } from "react";
import { PREFERRED_PRODUCTS } from "../../../core/storage/types";
import { storage } from "../../../core/storage/storage";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [ratingOrder, setRatingOrder] = useState<"asc" | "desc" | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
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

  const addFavorite = useCallback(
    async (item: Product) => {
      const updatedFavorites = favoriteIds.includes(item.id)
        ? favoriteIds.filter((id) => id !== item.id)
        : [...favoriteIds, item.id];

      setFavoriteIds(updatedFavorites);
      await storage.setItem(
        PREFERRED_PRODUCTS,
        JSON.stringify(updatedFavorites)
      );
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (product: Product) => {
      const isFavorite = favoriteIds.includes(product.id);
      const updatedFavoriteIds = isFavorite
        ? favoriteIds.filter((id) => id !== product.id)
        : [...favoriteIds, product.id];

      setFavoriteIds(updatedFavoriteIds); // Aggiorna gli ID preferiti
      setFavorites(
        isFavorite
          ? favorites.filter((item) => item.id !== product.id)
          : [...favorites, product]
      ); // Aggiorna i prodotti preferiti

      storage.setItem(PREFERRED_PRODUCTS, JSON.stringify(updatedFavoriteIds)); // Persisti nello storage
    },
    [favoriteIds, favorites]
  );

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (ratingOrder) {
      filtered = filtered.sort((a, b) => {
        if (ratingOrder === "asc") return a.rating.rate - b.rating.rate;
        if (ratingOrder === "desc") return b.rating.rate - a.rating.rate;
        return 0;
      });
    }

    return filtered;
  }, [products, categoryFilter, ratingOrder]);

  return {
    products: filteredProducts,
    favoriteIds,
    favorites,
    fetchProducts,
    toggleFavorite,
    addFavorite,
    setCategoryFilter,
    setRatingOrder,
    loadFavorites,
  };
};
