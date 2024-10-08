import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {useRouter} from "expo-router"

export default function PopularBusinessCard({ business }) {
  console.log(business.id)
  console.log('yes i pressed')
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={()=> router.push(`BusinessDetail/${business.id}`)}
      style={{
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        marginRight: 15,
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7 }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: "outfit-bold",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.GRAY,
            fontFamily: "outfit",
          }}
        >
          {business.address}
        </Text>
      </View>
      <View
        style={{
          marginTop: 7,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 7,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={require("../../assets/images/star.png")}
          />
          <Text style={{ fontFamily: "outfit" }}>4.5</Text>
        </View>
        <Text
          style={{
            fontSize: 14,
            backgroundColor: Colors.PRIMARY,
            fontFamily: "outfit",
            padding: 3,
            color: "#fff",
            borderRadius: 4,
          }}
        >
          {business.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
