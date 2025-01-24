import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
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
  const [products, setProducts] = useState<ProductDetail[] | null>(null);

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
    if (!previousId) {
      return;
    }
    navigation.setParams({ id: previousId });
  }, [currentIndex, productId, navigation]);

  const handleNext = useCallback(() => {
    const nextId = productId[currentIndex + 1];
    if (!nextId) {
      return;
    }
    navigation.setParams({ id: nextId });
  }, [currentIndex, productId, navigation]);

  useEffect(() => {
    // Recupera dettagli del prodotto simulato da un'API
    fetch("https://fakestoreapi.com/products" + id)
      .then((res) => res.json())
      .then((data) => setProducts([data]));
  }, [id]);

  const renderProduct = useCallback(({ item }: { item: ProductDetail }) => {
    return (
      <Product
        title={item.title}
        price={item.price}
        description={item.description}
        image={item.image}
      />
    );
  }, []);

  if (!products) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200ee" />
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

      {/* Lista Prodotti */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottone per tornare indietro */}
      <Button title={"Torna indietro"} onPress={navigation.goBack} />
    </View>
  );
};

export default DetailScreen;
