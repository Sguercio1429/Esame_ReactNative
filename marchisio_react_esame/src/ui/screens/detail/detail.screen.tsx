import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../atoms/button/button.atom";
import Product from "../../atoms/product/product.atom";
import styles from "../../screens/detail/detail.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { MainParamList, Screen } from "../../navigation/types";

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Detail>;
  route: RouteProp<MainParamList, Screen.Detail>;
}

const DetailScreen = ({ navigation, route }: Props) => {
  const { top, bottom } = useSafeAreaInsets();
  const { id, productId } = route.params;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = useMemo(() => productId.indexOf(id), [id, productId]);

  const backIconColor = useMemo(
    () => (currentIndex > 0 ? "#616b79" : "#cccccc"),
    [currentIndex]
  );
  const forwardIconColor = useMemo(
    () => (currentIndex < productId.length - 1 ? "#616b79" : "#cccccc"),
    [currentIndex, productId.length]
  );

  // ** CALLBACKS ** //
  const handleBack = useCallback(() => {
    const previousId = productId[currentIndex - 1];
    if (!previousId) return;
    navigation.setParams({ id: previousId });
  }, [currentIndex, productId, navigation]);

  const handleNext = useCallback(() => {
    const nextId = productId[currentIndex + 1];
    if (!nextId) return;
    navigation.setParams({ id: nextId });
  }, [currentIndex, productId, navigation]);

  // ** FETCH PRODUCT DETAILS ** //
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Correggere l'URL con la barra `/` prima dell'ID
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        setIsLoading(false);
      });
  }, [id]);

  // ** UI RENDERING ** //
  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Go Back" onPress={navigation.goBack} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
        <Button title="Go Back" onPress={navigation.goBack} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { marginTop: top, marginBottom: bottom }]}>
      {/* Navigazione Indietro e Avanti */}
      <View style={styles.navigatorContainer}>
        <Ionicons
          name={"chevron-back-circle"}
          size={24}
          onPress={handleBack}
          color={backIconColor}
        />
        <Ionicons
          name={"chevron-forward-circle"}
          size={24}
          onPress={handleNext}
          color={forwardIconColor}
        />
      </View>

      {/* Dettagli Prodotto */}
      <Product
        id={product.id}
        title={product.title}
        price={product.price}
        description={product.description}
        image={product.image}
        isFavorite={false} // Aggiorna questa logica secondo le tue necessità
        onToggleFavorite={() => {}}
        onPressImage={() => {}}
      />

      {/* Bottone per tornare indietro */}
      <Button title={"Torna indietro"} onPress={navigation.goBack} />
    </View>
  );
};

export default DetailScreen;
