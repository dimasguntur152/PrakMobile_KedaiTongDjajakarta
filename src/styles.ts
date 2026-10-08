import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF4E6",
  },

  // Bagian Beranda
  home: {
    minHeight: 700,
    backgroundColor: "#FFF4E6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#B51F1F",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B3A24",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  homeButton: {
    width: 180,
  },

  // Bagian Menu
  menuSection: {
    minHeight: 700,
    backgroundColor: "#FFF4E6",
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B51F1F",
    marginBottom: 15,
  },

  searchBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9822B",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
  },

  resetButton: {
    marginBottom: 18,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0B35B",
  },

  menuName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4A2415",
    marginBottom: 4,
  },

  menuPrice: {
    fontSize: 14,
    color: "#C45A16",
  },

  notFound: {
    textAlign: "center",
    color: "#777777",
    marginTop: 10,
  },
});