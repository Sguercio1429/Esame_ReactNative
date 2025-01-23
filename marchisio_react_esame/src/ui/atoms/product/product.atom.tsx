import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./product.styles";

type ProductProps = {
  title: string;
  price: number;
  description: string;
  image: string;
};

const Product = ({ title, price, description, image }: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default Product;
