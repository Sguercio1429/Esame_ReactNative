import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import Product from "../../atoms/product/product.atom";
import { useProducts } from "../hook/useProduct.facade";

const HomeScreen = () => {
  const { products, fetchProducts } = useProducts(); // Usa il nuovo hook per ottenere i prodotti

  // Carica i prodotti quando la schermata viene montata
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      {/* Se i prodotti non sono ancora caricati, mostra un loader */}
      {products.length === 0 ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
