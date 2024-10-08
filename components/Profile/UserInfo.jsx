import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

export default function UserInfo() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.profileText}>My Profile</Text>
      </View>
      <View style={styles.UserInfo}>
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        <Text style={styles.text}>{user.fullName}</Text>
        <Text style={styles.email}>
          {user.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileText: {
    padding:20,
    fontSize: 35,
    marginBottom: 10,
    fontFamily: "outfit-bold",
    marginTop: 5,
  },
  UserInfo:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  text: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  email: {
    fontSize: 17,
    color: Colors.GRAY,
  },
});
