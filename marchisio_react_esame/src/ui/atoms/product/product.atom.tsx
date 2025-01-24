import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import styles from "./product.styles";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const Product = ({
  id,
  title,
  price,
  description,
  image,
  isFavorite,
  onToggleFavorite,
}: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.bookmarkButton}
        >
          <FontAwesome
            name={isFavorite ? "bookmark" : "bookmark-o"}
            size={24}
            color={isFavorite ? "#FFD700" : "black"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      {/* Taglia la descrizione a un massimo di 2 righe */}
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
    </View>
  );
};

export default Product;
