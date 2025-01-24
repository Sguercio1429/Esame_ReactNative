import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Product from "../../atoms/product/product.atom";
import { useProducts } from "../hook/useProduct.facade";
import styles from "./home.styles";

const HomeScreen = () => {
  const { products, favorites, fetchProducts, toggleFavorite } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              isFavorite={favorites.some((fav) => fav.id === item.id)} // Controlla se è nei preferiti
              onToggleFavorite={() => toggleFavorite(item)} // Gestisci il toggle
            />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
