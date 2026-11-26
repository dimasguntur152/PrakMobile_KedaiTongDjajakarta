import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  type ScrollViewInstance,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { validateCoffeeData } from "../services/coffeePromise";
import { getIcedCoffee } from "../services/coffeeService";
import { styles } from "../styles";
import type { Coffee } from "../types/coffee";

export default function Index() {
  const router = useRouter();

  // Mengambil data autentikasi dari AuthContext
  const { session, user, loading } = useAuth();

  // Memantau perubahan data autentikasi
  useEffect(() => {
    console.log("Session:", session);
    console.log("User:", user);
    console.log("Loading:", loading);
  }, [session, user, loading]);

  // Mengambil nama dan email pengguna
  const displayName =
    user?.user_metadata?.callsign ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Pengguna";

  const displayEmail = user?.email || "Email tidak tersedia";

  const scrollViewRef = useRef<ScrollViewInstance | null>(null);
  const menuPosition = useRef(0);

  const [search, setSearch] = useState("");
  const [icedCoffees, setIcedCoffees] = useState<Coffee[]>([]);
  const [filteredCoffees, setFilteredCoffees] = useState<Coffee[]>([]);
  const [loadingCoffee, setLoadingCoffee] = useState(true);
  const [coffeeError, setCoffeeError] = useState("");

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Gagal Keluar",
        error instanceof Error ? error.message : "Terjadi kesalahan.",
      );
    }
  }

  async function refreshCoffee() {
    try {
      setLoadingCoffee(true);
      setCoffeeError("");

      const result = await getIcedCoffee();

      const data = await validateCoffeeData(result);

      setIcedCoffees(data);
      setCoffeeError("");
    } catch (error) {
      setCoffeeError(
        error instanceof Error ? error.message : "Terjadi kesalahan",
      );
    } finally {
      setLoadingCoffee(false);
    }
  }

  useEffect(() => {
    refreshCoffee();
  }, []);

  useEffect(() => {
    const result = icedCoffees.filter((coffee) =>
      coffee.name.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCoffees(result);
  }, [search, icedCoffees]);

  const { height } = useWindowDimensions();

  function renderCoffee(coffee: Coffee) {
    return (
      <View style={styles.menuCard} key={coffee.id}>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{coffee.name}</Text>

          <Text style={styles.menuPrice}>${coffee.price.toFixed(2)}</Text>

          <Text style={styles.profileEmail}>
            {coffee.type === "hot" ? "Kopi Panas" : "Minuman Dingin"}
          </Text>
        </View>

        <Pressable
          style={styles.menuButton}
          onPress={() =>
            router.push({
              pathname: "/detail-pesanan",
              params: {
                name: coffee.name,
                price: coffee.price.toString(),
              },
            })
          }
        >
          <Text style={styles.buttonText}>Pesan</Text>
        </Pressable>
      </View>
    );
  }

  function goToMenu() {
    scrollViewRef.current?.scrollTo({
      y: menuPosition.current,
      animated: true,
    });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFF4E6" }}
      edges={["top"]}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER INFORMASI PENGGUNA */}
        <View style={styles.headerContainer}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Halo, {displayName}!</Text>

            <Text style={styles.profileEmail}>{displayEmail}</Text>
          </View>

          <Pressable style={styles.logoutButton} onPress={handleSignOut}>
            <Text style={styles.logoutButtonText}>logout</Text>
          </Pressable>
        </View>

        {/* BERANDA UTAMA */}
        <View
          style={[
            styles.home,
            {
              minHeight: height - 80,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/logo-kedai.jpeg")}
            style={styles.logo}
          />

          <Text style={styles.title}>Kedai Tong Djajakarta</Text>

          <Text style={styles.subtitle}>
            Makanan dan minuman untuk teman kuliah
          </Text>

          <Pressable style={styles.homeButton} onPress={goToMenu}>
            <Text style={styles.buttonText}>Lihat Menu</Text>
          </Pressable>
        </View>

        {/* DAFTAR MENU DARI API */}
        <View
          style={styles.menuSection}
          onLayout={(event) => {
            menuPosition.current = event.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.sectionTitle}>Daftar Menu</Text>

          <TextInput
            style={styles.searchBox}
            placeholder="Cari minuman..."
            value={search}
            onChangeText={setSearch}
          />

          {loadingCoffee ? (
            <ActivityIndicator size="large" color="#B51F1F" />
          ) : coffeeError ? (
            <View>
              <Text style={styles.notFound}>{coffeeError}</Text>

              <Pressable style={styles.retryButton} onPress={refreshCoffee}>
                <Text style={styles.buttonText}>Coba Lagi</Text>
              </Pressable>
            </View>
          ) : filteredCoffees.length > 0 ? (
            filteredCoffees.map(renderCoffee)
          ) : (
            <Text style={styles.notFound}>Minuman tidak ditemukan.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
