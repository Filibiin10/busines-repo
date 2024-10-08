import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import MyBusinessAdded from '../../components/Profile/MyBusinessAdded';

export default function MyBusiness() {
    const [business, setBusiness] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'My Business',
            headerShown: true,
        });

        if (user) {
            getBusinessListByAuthor();
        }
    }, [user]);

    const getBusinessListByAuthor = async () => {
        try {
            setLoading(true);
            setBusiness([]); // Clear previous data
            const q = query(collection(db, 'BusinessList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
            const querySnapshot = await getDocs(q);
            const businesses = [];
            querySnapshot.forEach(doc => {
                businesses.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setBusiness(businesses); // Set the retrieved businesses
        } catch (error) {
            console.error("Error fetching business list: ", error);
            Alert.alert("Error", "Failed to load business data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : business.length === 0 ? (
                <Text style={styles.emptyText}>No businesses added yet.</Text>
            ) : (
                <FlatList
                    onRefresh={getBusinessListByAuthor}
                    refreshing={loading}
                    data={business}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MyBusinessAdded business={item} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#333',
    },
});
