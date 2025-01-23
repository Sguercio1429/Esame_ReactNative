import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  navigatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  detailItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  itemSeparator: {
    height: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#616b79",
    fontSize: 16,
    marginTop: 20,
  },
});
