import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import RNPickerSelect from "react-native-picker-select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoyList] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const {user} = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Add New Business",
      headerBackTitle: "Back",
      headerStyle: { backgroundColor: "#f8f8f8" },
      headerTitleStyle: { color: "#333" },
    });
    // fetchCategories();
    GetCategoryLists()
  }, [navigation]);

  const GetCategoryLists = async () => {
    const q = query(collection(db, "category"));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setCategoyList(prev=> [...prev,{
        label: doc.data().category,
        value: doc.data().category || '',
        // key: doc.id, // Ensure keys are unique
      }])
    });
  };


  const HandleSubmit = async () => {
    try {
      setLoading(true)
      const fileName = Date.now().toString() + ".jpg";
      const response = await fetch(image);
      const blob = await response.blob();

      // Corrected ref path
      const imageRef = ref(storage, `business-app/${fileName}`);

      // Upload image to Firebase Storage
       uploadBytes(imageRef, blob).then((snapshot)=>{

       }).then(resp=>{
        getDownloadURL(imageRef).then(async(downloadUrl)=>{
          saveBusinessDetail(downloadUrl)
        })
        setLoading(false)
       })
    } catch (error) {
      console.error("Error adding business: ", error);
    }
  };

  const saveBusinessDetail=async(imageUrl)=>{
    await setDoc(doc(db, "BusinessList",Date.now().toString()),{
      name,
      address,
      contact,
      about,
      website,
      imageUrl: imageUrl,
      category,
      username:user?.fullName,
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userImage:user?.imageUrl
    } );
    router.back()
    setLoading(false);
    ToastAndroid.show('New Business added.....',ToastAndroid.LONG)

    console.log("Document written with ID: ", name);

  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Business</Text>

      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an image from camera roll</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      <View>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          placeholder="Contact"
          style={styles.input}
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />
        <TextInput
          placeholder="About"
          style={styles.input}
          multiline
          numberOfLines={3}
          value={about}
          onChangeText={setAbout}
        />
        <TextInput
          placeholder="Website"
          style={[styles.input]}
          value={website}
          onChangeText={setWebsite}
        />
        <View style={styles.picker}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            value={category} // Bind the value here
            items={categoryList}
          />
        </View>
        <View>
          <TouchableOpacity
          disabled={loading}
            onPress={() => HandleSubmit()} // Correctly call HandleSubmit
          >
            {loading? 
            <ActivityIndicator
            size='large'
            color={Colors.PRIMARY}
            />:
            <Text style={styles.btnSubmit}>Add Business</Text>}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        height:200
      }}>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    backgroundColor: "#f8f8f8",
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  btnSubmit: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
});
