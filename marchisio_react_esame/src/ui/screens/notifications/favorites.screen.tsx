import React, { useCallback, useEffect, useMemo } from "react";
import { FlatList, View, Text } from "react-native";
import { styles } from "./favorites.styles";
import Card from "../../atoms/product/product.atom";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useProducts } from "../hook/useProducts.facade";
import { Product } from "../../atoms/product/product.atom";

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Favorites>;
}

const FavoritesScreen = ({ navigation }: Props) => {
  const {
    products,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorites,
  } = useProducts();

  // **DATA ** //
  const favorites = useMemo(
    () => products.filter((product) => favoriteIds.includes(product.id)),
    [products, favoriteIds]
  );

  // ** CALLBACKS ** //
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorites(item)}
        selected={favoriteIds.includes(item.id)}
      />
    ),
    [addFavorites, favoriteIds]
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator}></View>,
    []
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Favorites screen focused");
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      ) : (
        <Text>No favorites yet</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;
