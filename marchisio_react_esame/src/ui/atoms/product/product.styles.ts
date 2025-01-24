import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  bookmarkButton: {
    padding: 8,
  },
  price: {
    fontSize: 16,
    color: "#6200ee",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default styles;
