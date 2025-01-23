import React, { memo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./product.styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onPress: () => void;
  onAddFavorite: () => void;
}

const ProductCard = ({
  product,
  selected,
  onAddFavorite,
  onPress,
}: ProductCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkPress = () => {
    setIsBookmarked((prevState) => !prevState);
    onAddFavorite();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{product.title}</Text>
          </View>
          <TouchableOpacity onPress={handleBookmarkPress}>
            <FontAwesome
              name={isBookmarked ? "bookmark" : "bookmark-o"}
              size={30}
              color={isBookmarked ? "#FFD700" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={{
              uri: product.thumbnail,
            }}
            style={styles.imageStyle}
          />
        </View>
        <Text style={styles.genericCardText}>
          Price: ${product.price.toFixed(2)}
        </Text>
        <Text style={styles.genericCardText}>Quantity: {product.quantity}</Text>
        <Text style={[styles.genericCardText, styles.genericCardTextSpacing]}>
          Discount: {product.discountPercentage}%
        </Text>
      </View>

      <TouchableOpacity style={styles.buyProductButton} onPress={onPress}>
        <Text style={styles.genericCardText}>
          Buy Now for ${product.discountedTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(ProductCard);
