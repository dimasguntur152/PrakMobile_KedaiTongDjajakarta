import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "../styles";

export default function DetailPesanan() {
  const router = useRouter();
  const { name, price } = useLocalSearchParams();

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>Detail Pesanan</Text>

        <Text style={styles.detailName}>{name}</Text>

        <Text style={styles.detailPrice}>{price}</Text>

        <View style={styles.detailButtonRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Kembali</Text>
          </Pressable>

          <Pressable
            style={styles.confirmButton}
            onPress={() =>
              router.push({
                pathname: "/pesanan-berhasil",
                params: {
                  name: name,
                },
              })
            }
          >
            <Text style={styles.buttonText}>Konfirmasi</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
