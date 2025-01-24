import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Product from "../../atoms/product/product.atom";
import { useProducts } from "../hook/useProduct.facade";
import styles from "./home.styles";

const HomeScreen = () => {
  const {
    products,
    favorites,
    fetchProducts,
    toggleFavorite,
    setCategoryFilter,
    setRatingOrder,
  } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRatingOrder, setSelectedRatingOrder] = useState<
    "asc" | "desc" | null
  >(null);

  const categories: { label: string; value: string | null }[] = [
    { label: "All", value: null },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
  ];

  const ratingOrders: { label: string; value: "asc" | "desc" }[] = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      {/* Filtro per categoria */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.value ?? "all"}
            style={[
              styles.categoryButton,
              selectedCategory === category.value && styles.selectedCategory,
            ]}
            onPress={() => {
              setSelectedCategory(category.value);
              setCategoryFilter(category.value);
            }}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.value &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtro per rating */}
      <View style={styles.ratingContainer}>
        {ratingOrders.map((order) => (
          <TouchableOpacity
            key={order.value}
            style={[
              styles.ratingButton,
              selectedRatingOrder === order.value && styles.selectedRating,
            ]}
            onPress={() => {
              setSelectedRatingOrder(order.value);
              setRatingOrder(order.value);
            }}
          >
            <Text
              style={[
                styles.ratingButtonText,
                selectedRatingOrder === order.value &&
                  styles.selectedRatingText,
              ]}
            >
              {order.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista dei prodotti */}
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
              isFavorite={favorites.some((fav) => fav.id === item.id)}
              onToggleFavorite={() => toggleFavorite(item)}
            />
          )}
          numColumns={4} // Visualizza un massimo di 4 prodotti per riga
        />
      )}
    </View>
  );
};

export default HomeScreen;
