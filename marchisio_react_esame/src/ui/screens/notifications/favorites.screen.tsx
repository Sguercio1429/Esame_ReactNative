import React from "react";
import { View, FlatList, Text } from "react-native";
import Product from "../../atoms/product/product.atom";
import { useProducts } from "../hook/useProduct.facade";
import styles from "./favorites.styles";

const FavoritesScreen = () => {
  const { favorites, toggleFavorite } = useProducts();

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              isFavorite={true} // Sempre preferito nella schermata preferiti
              onToggleFavorite={() => toggleFavorite(item)} // Permette di rimuovere dai preferiti
            />
          )}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
