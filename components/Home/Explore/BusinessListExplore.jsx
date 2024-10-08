import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';

export default function BusinessListExplore({ business }) {
  // console.log(business.userEmail); // Check what data is being passed

  return (
    <View style={styles.container}>
      <FlatList
        data={business}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.businessCard}>
            <Image
              style={styles.image}
              source={{ uri: item.imageUrl }} // Access userImage from data
            />
            <View style={styles.infoContainer}>
              <Text style={styles.businessName}>{item.name}</Text> {/* Access name from data */}
              <Text style={styles.businessCategory}>{item.address}</Text> {/* Access address from data */}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  businessCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode:'contain'
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  businessName: {
    fontSize: 22,
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
