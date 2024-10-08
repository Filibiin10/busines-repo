import { View, TextInput } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../../constants/Colors';

export default function SearchBar() {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginVertical: 10,
      marginTop: 15,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // Shadow for Android
    }}>
      <Ionicons name="search" size={25} color={Colors.PRIMARY} />
      
      <TextInput
        placeholder="Search businesses..."
        style={{
          fontFamily: 'outfit',
          fontSize: 16,
          flex: 1,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
}
