export enum Screen {
  TabNavigator = "TabNavigator",
  Home = "Home",
  Detail = "Detail",
  Favorites = "Favorites",
}

export type TabParams = {
  [Screen.Home]: {
    hasFavoritesUpdated: boolean;
  };
  [Screen.Favorites]: {
    hasFavoritesUpdatAed: boolean;
  };
};

export type MainParamList = {
  TabNavigator: undefined;
  [Screen.Detail]: {
    id: number;
    productId: number[];
  };
};
