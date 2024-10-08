import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from "../../../constants/Colors";

export default function BusinessListCard({ business, onBusinesDetail}) {
  return (
    <TouchableOpacity
    onPress={()=> onBusinesDetail(business)}
    style={{
      padding: 15,
      marginVertical: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5, // for Android shadow
    }}>
      <Image 
        source={{ uri: business.imageUrl }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
      />
      <View style={{
        flex: 1,
        marginLeft: 15,
      }}>
        <Text style={{ 
          fontFamily: 'outfit-bold', 
          fontSize: 18, 
          color: Colors.DARK_TEXT, 
          marginBottom: 5 
        }}>
          {business.name}
        </Text>
        <Text style={{ 
          fontFamily: 'outfit', 
          fontSize: 15, 
          color: Colors.GRAY, 
          marginBottom: 10 
        }}>
          {business.address}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 7,
          }}
        >
          <Image
            style={{
              width: 18,
              height: 18,
              marginRight: 5,
            }}
            source={require("../../../assets/images/star.png")}
          />
          <Text style={{ fontFamily: "outfit", fontSize: 15, color: Colors.GRAY }}>
            4.5
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
