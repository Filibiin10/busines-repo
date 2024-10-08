import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'
import { useRouter } from 'expo-router'

export default function PopularBusinessLists() {

  const router = useRouter();

    const [businessList,setBusinessList]=useState([])

    useEffect(()=>{
        getBusinessList();
    },[])

    const getBusinessList =async () => {
        const q=query(collection(db,'BusinessList'));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
           ...doc.data(),
        })); 
        setBusinessList(data);
        console.log(data)   
    }

  return (
    <View style={{
        // padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 24,
        marginBottom: 5,
        marginLeft:20,
        marginTop:10
        // padding:20
      }}>Popular Business</Text>
      <FlatList
      horizontal={true}
      // showsHorizontalScrollIndicator={false}
      style={{
        marginLeft:20,
      }}
      data={businessList}
      renderItem={({item, index})=>(
        <PopularBusinessCard business={item}
        key={index}
        />
      )}
      />
    </View>
  )
}