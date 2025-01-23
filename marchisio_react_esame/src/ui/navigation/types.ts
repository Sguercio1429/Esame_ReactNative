// types.ts
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
    hasFavoritesUpdated: boolean;
  };
};

export type MainParamList = {
  TabNavigator: undefined;
  [Screen.Detail]: {
    id: number;
    idsArray: number[];
  };
  [Screen.Home]: undefined;
  [Screen.Favorites]: undefined;
};
