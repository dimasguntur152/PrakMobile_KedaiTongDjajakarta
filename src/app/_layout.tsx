import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="detail-pesanan"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="pesanan-berhasil"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
