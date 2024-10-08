import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from "../../config/FirebaseConfig.js";
import { collection, getDocs, query } from 'firebase/firestore';
import { addBusinessesToExistingCollection } from "../../BusinessData/PopularBusiness.js";
import { addBusinessesList } from '../../BusinessData/BusinessList.js';

const Slider = () => {
  const [SliderData, setSliderData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // addBusinessesToExistingCollection();
        // addBusinessesList();
        await GetSliderList();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchData();
  }, []);

  const GetSliderList = async () => {
    try {
      const q = query(collection(db, 'Slider'));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSliderData(data);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching images:</Text>
        <Text>{error.message || 'An unexpected error occurred.'}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>#Special for you</Text>
      <FlatList
        data={SliderData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
          marginTop: -10,
        }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    padding: 20,
    marginTop: -10,
  },
});

export default Slider;
