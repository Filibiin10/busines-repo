import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Linking,
  Alert,
} from "react-native";
import React, { useRef, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import ActionButton from "./ActionButton";
import Reviews from "./Reviews";
import { doc, deleteDoc } from "firebase/firestore"; // Firestore delete function
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../../config/FirebaseConfig";

export default function BusinessDetailCard({ businessDetail, businessid }) {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = React.useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  console.log(businessid);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = () => {
    Alert.alert(
      "Delete Business",
      `Are you sure you want to delete ${businessDetail.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
      await deleteDoc(doc(db, "businesses", businessid));
      console.log("Business deleted Well");
      router.back();
  };

  return (
    <Animated.ScrollView style={[styles.cardContainer, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="heart" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: businessDetail.imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.title}>{businessDetail.name}</Text>
          <Text style={styles.address}>{businessDetail.address}</Text>
        </View>
        {user?.primaryEmailAddress?.emailAddress == businessDetail?.userEmail &&
          <TouchableOpacity onPress={handleDelete} style={styles.deleteBtn}>
            <Ionicons name="trash" size={24} color="red" />
          </TouchableOpacity>}
      </View>
      <View style={styles.btn}>
        <ActionButton businessDetail={businessDetail} />
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutTitle}>About {businessDetail.name}</Text>
        <Text style={styles.aboutText}>{businessDetail.description}</Text>
        <Text style={styles.aboutText}>
          Category: {businessDetail.category}
        </Text>
        {businessDetail.contact && (
          <Text style={styles.aboutText}>Phone: {businessDetail.contact}</Text>
        )}
        {businessDetail.email && (
          <Text style={styles.aboutText}>Email: {businessDetail.email}</Text>
        )}
        {businessDetail.website && (
          <Text style={styles.aboutText}>
            Website:{" "}
            <Text
              style={styles.websiteLink}
              onPress={() => Linking.openURL(businessDetail.website)}
            >
              {businessDetail.website}
            </Text>
          </Text>
        )}
      </View>
      <View>
        <Reviews businessDetail={businessDetail} businessid={businessid} />
      </View>
      <View style={{ height: 200 }} />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    position: "absolute",
    width: "100%",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent background
  },
  icon: {
    padding: 5, // Consistent padding for icons
  },
  image: {
    width: "100%",
    height: 360, // Increased height for a more prominent image
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  trashContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 5,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 26,
    marginBottom: 5,
    color: "#333",
  },
  address: {
    fontFamily: "outfit",
    fontSize: 18,
    color: "#888",
  },
  btn: {
    backgroundColor: "#fff",
    padding: 20,
  },
  about: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  aboutTitle: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    marginBottom: 10,
    color: "#333",
  },
  aboutText: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
    color: "#333",
  },
  websiteLink: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});
