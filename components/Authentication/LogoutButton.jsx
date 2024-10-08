import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useClerk ,useUser} from '@clerk/clerk-expo';
import {Colors} from "../../constants/Colors"
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const { signOut } = useClerk();
  
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('User logged out successfully');
      // navigation.navigate('Login'); // Redirect to login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.btnlogout}
      onPress={handleLogout} >
        <Text style={{
          fontFamily:'outfit',
          fontSize: 20,
          color: 'white',
          textAlign: 'center'
        }}>
          Logout from Clerk
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  btnlogout:{
    backgroundColor:Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 15,
  }
});

export default LogoutButton;
