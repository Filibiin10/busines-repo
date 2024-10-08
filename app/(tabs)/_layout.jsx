import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "../../constants/Colors"
export default function Tablayout() {
  return <Tabs 
  screenOptions={{
    headerShown:false,
    tabBarActiveTintColor:Colors.PRIMARY
  }}
  >
    <Tabs.Screen
    options={{
      tabBarLabel:"Home",
      tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
    }} 
    name="home"  />
    <Tabs.Screen
     options={{
      tabBarLabel:"Explore",
      tabBarIcon:({color})=><Ionicons name="search" size={24} color={color} />
    }} 
    name="explore" />
    <Tabs.Screen
     options={{
      tabBarLabel:"Profile",
      tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
    }} 
    name="profile"/>
  </Tabs>
}