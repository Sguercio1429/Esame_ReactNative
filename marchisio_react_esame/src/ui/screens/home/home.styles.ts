import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: "#3579f6",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  ratingButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    margin: 5,
    borderRadius: 5,
  },
  selectedRating: {
    backgroundColor: "#3579f6",
  },
  ratingButtonText: {
    fontSize: 14,
    color: "#000",
  },
  selectedRatingText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
