
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

// Mengatur akses halaman berdasarkan status login
function RootNavigator() {
  const { session, loading } = useAuth();

  // Menunggu pemeriksaan session selesai
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {/* Halaman yang boleh dibuka sebelum login */}
      <Stack.Protected guard={!session}>
        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />
      </Stack.Protected>

      {/* Halaman yang hanya boleh dibuka setelah login */}
      <Stack.Protected guard={!!session}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="detail-pesanan"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="pesanan-berhasil"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="demo"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
