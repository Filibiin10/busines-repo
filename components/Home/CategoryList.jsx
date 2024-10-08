import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

export default function CategoryList({ Category, onCategoryPress }) {
  // useEffect(() => {
  //   console.log(Category);
  // }, [Category]); // Make sure you pass Category as a dependency.

  return (
    <TouchableOpacity 
      onPress={() => onCategoryPress(Category)} 
      style={styles.categoryContainer}
    >
      <View style={styles.iconContainer}>
        <Image source={{ uri: Category.icon }} style={styles.image} />
      </View>
      <Text style={styles.title}>{Category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 10,
    marginRight: 15,
    backgroundColor: '#FFCCCB',
    borderRadius: 99,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 12,
    marginTop: 5,
    fontFamily: "outfit-medium",
    textAlign: 'center',
  },
});
