import { useState, useCallback, useMemo } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string; // Aggiunto il campo per la categoria
  rating: {
    rate: number;
    count: number;
  }; // Per le recensioni
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
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

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((item) => item.id === product.id);
      if (isFavorite) {
        return prevFavorites.filter((item) => item.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  }, []);

  // Applica i filtri ai prodotti
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
    favorites,
    fetchProducts,
    toggleFavorite,
    setCategoryFilter,
    setRatingOrder,
  };
};
