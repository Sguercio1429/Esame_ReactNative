import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { styles } from "./home.styles";
import Card from "../../atoms/product/product.atom";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainParamList, Screen } from "../../navigation/types";
import { useProducts } from "../hook/useProducts.facade";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../atoms/button/button.atom";

interface Props {
  navigation: NativeStackNavigationProp<MainParamList, Screen.Home>;
}

enum FilterType {
  initial = "initial",
  ascendent = "ascendent",
  descendent = "descendent",
}

const HomeScreen = ({ navigation }: Props) => {
  const {
    products,
    setProducts,
    favoriteIds,
    refreshProducts,
    loadFavorites,
    addFavorites,
  } = useProducts();
  const [filterType, setFilterType] = useState<FilterType | null>(null);

  // ** USE CALLBACK ** //
  const onFilterApply = useCallback(
    (type: FilterType) => {
      setFilterType(type);
      const sortedProducts = products.sort((a, b) => {
        if (type === FilterType.ascendent) {
          return a.price - b.price;
        }
        return b.price - a.price;
      });
      setProducts([...sortedProducts]);
    },
    [products, setProducts]
  );

  const renderFilterButtons = useCallback(() => {
    return (
      <View style={styles.filtersContainer}>
        <Button onPress={() => onFilterApply(FilterType.descendent)}>
          <Ionicons
            name={"arrow-down"}
            size={24}
            color={filterType === FilterType.descendent ? "green" : "#ffffff"}
          />
        </Button>
        <Button onPress={() => onFilterApply(FilterType.ascendent)}>
          <Ionicons
            name={"arrow-up"}
            size={24}
            color={filterType === FilterType.ascendent ? "green" : "#ffffff"}
          />
        </Button>
      </View>
    );
  }, [filterType, onFilterApply]);

  const renderItem = useCallback(
    ({ item }) => (
      <Card
        product={item}
        onAddFavorite={() => addFavorites(item)}
        selected={favoriteIds.includes(item.id)}
        onPress={() => {
          if (!item.id) {
            return;
          }
          navigation.navigate(Screen.Detail, {
            id: item.id,
            idsArray: products.map((el) => el.id),
          });
        }}
      />
    ),
    [addFavorites, products, favoriteIds, navigation]
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparator}></View>,
    []
  );

  // ** USE EFFECT ** //
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Home screen focused");
      refreshProducts();
      loadFavorites();
    });

    return unsubscribe;
  }, [loadFavorites, navigation, refreshProducts]);

  return (
    <View style={styles.container}>
      {renderFilterButtons()}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default HomeScreen;
