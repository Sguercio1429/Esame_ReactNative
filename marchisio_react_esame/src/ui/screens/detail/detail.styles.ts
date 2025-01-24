import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: "#6200ee",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  backButton: {
    color: "#6200ee",
    fontSize: 18,
    marginBottom: 20,
  },
  navigatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
});

export default styles;
