import { View, Text , StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import UserInfo from '../../components/Profile/UserInfo';
import MenuList from '../../components/Profile/MenuList';
export default function profile() {
  return (
    <ScrollView style={styles.container}>
      {/*Userinfo*/}
      <UserInfo/>
      {/*AddBusines*/}
      <MenuList/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
 
});

