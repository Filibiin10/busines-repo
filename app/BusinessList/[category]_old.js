import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import BusinessListCard from '../../components/Home/BusinessListCard/BusinessListCard';

export default function BusinessList() {
    const { category } = useLocalSearchParams(); // Grabs the dynamic category
    const navigation = useNavigation();
    const router = useRouter();
    const [businessList, setBusinessList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        getBusinessList(); 
    }, []); 

    const getBusinessList = async () => {
        try {
            setIsLoading(true); // Show loading state while fetching data
            setBusinessList([]); // Reset the business list when category changes
            const q = query(collection(db, 'BusinessList'), where('category', '==', category)); // Ensure collection name is correct
            const querySnapshot = await getDocs(q);
            
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id, // Use document ID for unique key
                ...doc.data(),
            }));
            setBusinessList(data); // Set the fetched data into state
            console.log(data)
        } catch (error) {
            console.error('Error fetching business list:', error);
        } finally {
            setIsLoading(false); // Hide loading state when data is fetched or an error occurs
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {businessList.length > 0 ? (
                <FlatList
                    data={businessList}
                    renderItem={({item,index})=>(
                        <BusinessListCard 
                        business={item}
                        key={index}
                        onBusinesDetail={(business) => router.push(`/BusinessDetail/${business.id}`)}
                        />
                    )}
                />
               
            ) : (
                <Text style={styles.noBusinessText}>No businesses found for this category.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.PRIMARY,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    address: {
        fontSize: 14,
        color: 'gray',
    },
    noBusinessText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
});
