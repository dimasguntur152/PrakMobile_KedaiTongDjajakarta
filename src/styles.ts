import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF4E6",
  },

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
    backgroundColor: "#B51F1F",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

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

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0B35B",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuInfo: {
    flex: 1,
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

  menuButton: {
    backgroundColor: "#B51F1F",
    paddingVertical: 9,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginLeft: 15,
  },

  notFound: {
    textAlign: "center",
    color: "#777777",
    marginTop: 10,
  },

  detailContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFF4E6",
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0B35B",
  },

  detailTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#B51F1F",
    marginBottom: 20,
  },

  detailName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A2415",
    marginBottom: 8,
  },

  detailPrice: {
    fontSize: 16,
    color: "#C45A16",
  },

  detailButtonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
  },

  backButton: {
    flex: 1,
    backgroundColor: "#777777",
    paddingVertical: 12,
    borderRadius: 8,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#B51F1F",
    paddingVertical: 12,
    borderRadius: 8,
  },

  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FFF4E6",
  },

  successIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: "#2E9B57",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  successIconText: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "bold",
  },

  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#B51F1F",
    marginBottom: 15,
    textAlign: "center",
  },

  successText: {
    fontSize: 16,
    color: "#4A2415",
    textAlign: "center",
    marginBottom: 30,
  },

  successButton: {
    backgroundColor: "#B51F1F",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
});
