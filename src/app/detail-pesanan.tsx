import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function DetailPesanan() {
  const router = useRouter();
  const { name, price } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#B51F1F",
          marginBottom: 20,
        }}
      >
        Detail Pesanan
      </Text>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#4A2415",
          marginBottom: 8,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#C45A16",
          marginBottom: 30,
        }}
      >
        {price}
      </Text>

      <Button
        title="Kembali"
        onPress={() => router.back()}
        color="#777777"
      />

      <View style={{ height: 12 }} />

      <Button
        title="Konfirmasi Pesanan"
        onPress={() =>
          router.push({
            pathname: "/pesanan-berhasil",
            params: {
              name: name,
            },
          })
        }
        color="#B51F1F"
      />
    </View>
  );
}