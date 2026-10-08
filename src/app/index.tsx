import { useRef, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { styles } from "../styles";

interface Menu {
  name: string;
  price: string;
}

const menus: Menu[] = [
  { name: "Kopi Susu", price: "Rp13.000" },
  { name: "Americano", price: "Rp13.000" },
  { name: "Choco Banana", price: "Rp15.000" },
  { name: "Nasi Goreng", price: "Rp15.000" },
  { name: "Mie Goreng", price: "Rp13.000" },
];

export default function Index() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const menuPosition = useRef(0);
  const [search, setSearch] = useState("");

  const { height } = useWindowDimensions();

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  );

  function renderMenu(menu: Menu) {
    return (
      <View style={styles.menuCard} key={menu.name}>
        <Text style={styles.menuName}>{menu.name}</Text>
        <Text style={styles.menuPrice}>{menu.price}</Text>
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
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
    >
      {/* BERANDA */}
      <View
        style={[styles.home, { minHeight: height }]}
      >
        <Image
          source={require("../../assets/images/logo-kedai.jpeg")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Kedai Tong Djajakarta
        </Text>

        <Text style={styles.subtitle}>
          Makanan dan minuman untuk teman kuliah
        </Text>

        <View style={styles.homeButton}>
          <Button
            title="Lihat Menu"
            onPress={goToMenu}
            color="#B51F1F"
          />
        </View>
      </View>

      {/* DAFTAR MENU */}
      <View
        style={styles.menuSection}
        onLayout={(event) => {
          menuPosition.current = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>
          Daftar Menu
        </Text>

        <TextInput
          style={styles.searchBox}
          placeholder="Cari menu..."
          value={search}
          onChangeText={setSearch}
        />

        <View style={styles.resetButton}>
          <Button
            title="Tampilkan Semua Menu"
            onPress={() => setSearch("")}
            color="#B51F1F"
          />
        </View>

        {filteredMenus.length > 0 ? (
          filteredMenus.map(renderMenu)
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "#777777",
              marginTop: 10,
            }}
          >
            Menu tidak ditemukan.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}