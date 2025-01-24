import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff", // Optional
  },
  productItem: {
    flex: 1, // Each product will equally share the space
    margin: 5, // Space between items
    maxWidth: "23%", // Prevent items from stretching too much
    alignItems: "center", // Center product content
  },
});

export default styles;
