import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: "#6200ee",
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
});

export default styles;
