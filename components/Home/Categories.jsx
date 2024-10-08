import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { db } from "../../config/FirebaseConfig.js";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryList from "./CategoryList.jsx";
import { useRouter } from "expo-router";

const Categories = ({ explore = false, onCategorySelected }) => {
  const [Categorylist, setCategoryList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const q = query(collection(db, "category"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoryList(data);
      setFilteredCategories(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push(`/BusinessList/${item.category}`);
    } else {
      onCategorySelected(item.category);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = Categorylist.filter((item) =>
      item.name && item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  return (
    <View style={styles.container}>
      {!explore && (
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Category Lists</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
      )}

      {/* Search Bar */}
      {explore && (
        <TextInput
          style={styles.searchBar}
          value={search}
          onChangeText={handleSearch}
          placeholder="Search Categories..."
          placeholderTextColor="#888"
        />
      )}

      <FlatList
        data={filteredCategories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        renderItem={({ item, index }) => (
          <CategoryList
            Category={item}
            key={index}
            onCategoryPress={() => onCategoryPressHandler(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { // Set background color
    padding:20
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  viewAll: {
    color: Colors.PRIMARY, // Use a contrasting color
    fontSize: 16,
    fontFamily: "outfit",
    marginRight: 7,
  },
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderColor: Colors.PRIMARY, // Optional: Add border for emphasis
    borderWidth: 1, // Optional: Border width
    elevation: 1, // Add shadow for elevation effect
  },
  list: {
    // marginLeft: 20,
    // marginTop: -10,
  },
  listContainer: {
    paddingVertical: 10, // Add vertical padding for list items
  },
});

export default Categories;
