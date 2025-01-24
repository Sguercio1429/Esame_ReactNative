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
  onPressImage: () => void;
};

const Product = ({
  id,
  title,
  price,
  description,
  image,
  isFavorite,
  onToggleFavorite,
  onPressImage,
}: ProductProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressImage}>
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>
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
      <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
    </View>
  );
};

export default Product;
