import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../../components/Home/Explore/SearchBar'
import Categories from '../../components/Home/Categories'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import BusinessListExplore from '../../components/Home/Explore/BusinessListExplore'

export default function explore() {
  const [businessList, setBusinessList] = useState([])
  const getBusinessByCategory=async(category)=>{
    // setBusinessList([])
    const q=query(collection(db,'BusinessList'),where('category','==',category))
    const querySnapshot=await getDocs(q)
    const businesses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBusinessList(businesses)
  }
  console.log(businessList)
  return (
    <View>
      {/* Search bar  */}
      <SearchBar/>
      {/* Category */}
      <View style={{
        padding:20,
        backgroundColor:'#fff'
      }}>
      <Categories
      explore={true}
      onCategorySelected={(category)=> getBusinessByCategory(category)}
      />
      </View>
      <BusinessListExplore
        business={businessList}
        />
    </View>
  )
}