import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { validateCoffeeData } from "../services/coffeePromise";
import { getIcedCoffee } from "../services/coffeeService";
import { styles } from "../styles";
import type { Coffee } from "../types/coffee";

const COFFEE_PRICE = "Rp15.000";

export default function Index() {
  const router = useRouter();

  const scrollViewRef = useRef<ScrollView | null>(null);
  const menuPosition = useRef(0);

  const [search, setSearch] = useState("");
  const [icedCoffees, setIcedCoffees] = useState<Coffee[]>([]);
  const [filteredCoffees, setFilteredCoffees] = useState<Coffee[]>([]);
  const [loadingCoffee, setLoadingCoffee] = useState(true);
  const [coffeeError, setCoffeeError] = useState("");

  // Custom Async Function untuk memuat data kopi
  async function refreshCoffee() {
    try {
      setLoadingCoffee(true);
      setCoffeeError("");

      const result = await getIcedCoffee();

      // Memeriksa data menggunakan Promise dan then
      await validateCoffeeData(result).then((data) => {
        setIcedCoffees(data);
        setCoffeeError("");
      });
    } catch (error) {
      setCoffeeError(
        error instanceof Error ? error.message : "Terjadi kesalahan",
      );
    } finally {
      setLoadingCoffee(false);
    }
  }

  // Memuat data kopi ketika halaman pertama kali dibuka
  useEffect(() => {
    refreshCoffee();
  }, []);

  // Mencari minuman berdasarkan nama
  useEffect(() => {
    const result = icedCoffees.filter((coffee) =>
      coffee.title.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredCoffees(result);
  }, [search, icedCoffees]);

  const { height } = useWindowDimensions();

  // Menampilkan menu dari API
  function renderCoffee(coffee: Coffee) {
    return (
      <View style={styles.menuCard} key={coffee.id}>
        <Image source={{ uri: coffee.image }} style={styles.coffeeThumb} />

        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{coffee.title}</Text>
          <Text style={styles.menuPrice}>{COFFEE_PRICE}</Text>
        </View>

        <Pressable
          style={styles.menuButton}
          onPress={() =>
            router.push({
              pathname: "/detail-pesanan",
              params: {
                name: coffee.title,
                price: COFFEE_PRICE,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Pesan</Text>
        </Pressable>
      </View>
    );
  }

  // Mengarahkan pengguna ke bagian daftar menu
  function goToMenu() {
    scrollViewRef.current?.scrollTo({
      y: menuPosition.current,
      animated: true,
    });
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* BERANDA */}
      <View style={[styles.home, { minHeight: height }]}>
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

            {/* Tombol muncul hanya jika API gagal */}
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
  );
}