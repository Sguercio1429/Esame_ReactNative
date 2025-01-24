import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  bookmarkButton: {
    padding: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3579f6",
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: "#6d7075",
  },
});

export default styles;
