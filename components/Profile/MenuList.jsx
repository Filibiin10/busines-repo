import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { useRouter } from 'expo-router';
import {  useAuth, } from '@clerk/clerk-expo';


export default function MenuList() {
    const router = useRouter();
    const {signOut} = useAuth()
  const menuList = [
    { id: 1, name: 'Add Business', icon: 'add-circle-outline',path:'/business/addBusiness' },
    { id: 2, name: 'My Business', icon: 'business-outline' ,path:'/business/mybusiness'},
    { id: 3, name: 'Share', icon: 'share-social-outline' ,path:''},
    { id: 4, name: 'logout', icon: 'log-out-outline' ,path:'logout'},
  ];

  const handleMenuPress = (item) => {
    if(item.path=='logout'){
      signOut()
      return
    }
    router.push(item.path);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleMenuPress(item)} 
            style={styles.button}
            accessibilityLabel={item.name}
            accessibilityHint={`Opens ${item.name}`}
          >
            <View style={styles.item}>
              <Icon name={item.icon} size={35} color="#4CAF50" />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center', // Dark red background
        borderRadius: 8,
      }}>
        <Text style={styles.developed}>developed by Filibiinfanax @2024</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop:20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    margin: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd', // Add a border color
    backgroundColor: '#fff', // Light pink background
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to start
    // elevation: 3, // Elevation for Android shadow
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemText: {
    flex:1,
    fontSize: 15,
    fontFamily:'outfit-medium',
    marginLeft: 10, // Margin for spacing between icon and text
    // color: '#00796b', // Dark teal text color
  },
  button: {
    flex: 1,
    marginHorizontal:3, // Horizontal margin for button spacing
  },
  developed:{
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontFamily:'outfit-medium',
    color: Colors.GRAY, // Dark grey text color
  }
});
