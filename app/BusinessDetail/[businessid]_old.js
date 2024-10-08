import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Colors } from '../../constants/Colors';
import BusinessDetailCard from '../../components/Home/BusinessDetail/BusinessDetailCard';

export default function BusinessById() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null); // Use null for initial state
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getBusinessDetail();
  }, [businessid]);

  const getBusinessDetail = async () => {
    try {
      const docRef = doc(db, 'BusinessList', businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBusiness(data);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document: ', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <ActivityIndicator 
        size='large'
        color={Colors.PRIMARY}
        />
      </View>
    );
  }

  if (!business) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No business found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
            <BusinessDetailCard 
            businessDetail={business}
            businessid={businessid}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // backgroundColor: '#fff',
    flex: 1,
  }
});
