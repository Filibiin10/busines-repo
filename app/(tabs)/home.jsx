import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Slider from "../../components/Home/Slider"
import Header from '../../components/Home/Header'
import Categories from '../../components/Home/Categories'
import PopularBusinessLists from '../../components/Home/PopularBusinessLists'
export default function home() {
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#F9F9F9',
    }} >
      <Header/>
      <Slider />
      <Categories/>
      <PopularBusinessLists/>
      <View style={{height:150}}></View>
    </ScrollView>
  )
}