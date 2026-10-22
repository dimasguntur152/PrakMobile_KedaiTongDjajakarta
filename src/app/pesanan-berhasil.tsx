import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "../styles";

export default function PesananBerhasil() {
  const router = useRouter();
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <Text style={styles.successIconText}>✓</Text>
      </View>

      <Text style={styles.successTitle}>Pesanan Berhasil!</Text>

      <Text style={styles.successText}>Pesanan {name} berhasil dibuat.</Text>

      <Pressable
        style={styles.successButton}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </Pressable>
    </View>
  );
}
