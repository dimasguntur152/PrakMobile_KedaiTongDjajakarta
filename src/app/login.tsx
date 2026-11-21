
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import { styles } from "../styles";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callsign, setCallsign] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAuth() {
    setMessage("");

    const cleanEmail = email.trim();
    const cleanCallsign = callsign.trim();

    if (!cleanEmail || !password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    if (isRegistering && !cleanCallsign) {
      setMessage("Nama pengguna wajib diisi.");
      return;
    }

    if (isRegistering && password.length < 6) {
      setMessage("Password minimal 6 karakter.");
      return;
    }

    try {
      setLoading(true);

      if (isRegistering) {
        // Membuat akun baru di Supabase
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: {
              callsign: cleanCallsign,
            },
          },
        });

        if (error) {
          throw error;
        }

        // Jika Supabase langsung memberikan session,
        // lakukan logout agar pengguna kembali ke Login
        if (data.session) {
          const { error: signOutError } =
            await supabase.auth.signOut();

          if (signOutError) {
            throw signOutError;
          }
        }

        // Pendaftaran berhasil, kembali ke mode Login
        setMessage(
          "Pendaftaran berhasil! Silakan masuk menggunakan akun yang sudah dibuat.",
        );

        setPassword("");
        setCallsign("");
        setIsRegistering(false);
      } else {
        // Masuk menggunakan akun yang sudah terdaftar
        const { error } =
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password,
          });

        if (error) {
          throw error;
        }

        // Login berhasil, masuk ke halaman utama
        router.replace("/");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setIsRegistering(!isRegistering);
    setMessage("");
    setPassword("");
    setCallsign("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.loginTitle}>
            Kedai Tong Djajakarta
          </Text>

          <Text style={styles.loginSubtitle}>
            {isRegistering
              ? "Buat akun baru untuk mulai memesan."
              : "Silakan masuk ke akun kamu."}
          </Text>

          {isRegistering && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Nama Pengguna
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Masukkan nama pengguna"
                value={callsign}
                onChangeText={setCallsign}
                editable={!loading}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {message !== "" && (
            <Text
              style={[
                styles.message,
                message.startsWith("Pendaftaran berhasil!")
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}
            >
              {message}
            </Text>
          )}

          <Pressable
            style={[
              styles.button,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                {isRegistering ? "Daftar" : "Masuk"}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={switchMode}
            disabled={loading}
            style={styles.switchButton}
          >
            <Text style={styles.switchText}>
              {isRegistering
                ? "Sudah punya akun? Masuk"
                : "Belum punya akun? Daftar"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
