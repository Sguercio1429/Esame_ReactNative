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

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  return {
    products,
    fetchProducts,
  };
};
