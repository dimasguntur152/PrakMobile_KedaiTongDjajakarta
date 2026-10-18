import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function PesananBerhasil() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#B51F1F",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Pesanan Berhasil!
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#4A2415",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Pesanan {name} berhasil dibuat.
      </Text>

      <Button
        title="Kembali ke Beranda"
        onPress={() => router.replace("/")}
        color="#B51F1F"
      />
    </View>
  );
}