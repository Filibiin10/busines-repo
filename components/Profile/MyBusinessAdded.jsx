import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function MyBusinessAdded({ business }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/BusinessDetail/${business.id}`)}
    >
      <View style={styles.businessCard}>
        <Image
          style={styles.image}
          source={{ uri: business.imageUrl }}
          resizeMode='cover' // Adjust the image scaling
        />
        <View style={styles.infoContainer}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessCategory}>{business.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  businessCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height for better visibility
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  businessName: {
    fontSize: 24, // Increased font size for better readability
    fontFamily: 'outfit-bold',
    color: '#333',
    marginBottom: 5,
  },
  businessCategory: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
});
