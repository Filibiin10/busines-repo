import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import {Colors} from "../../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header() {

    const {user} =useUser()
  return (
    <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    }}>
        <View style={styles.Header}>
            <Image source={{uri:user?.imageUrl}}
            style={{
                width:45,
                height:45,
                borderRadius:99,
            }}
            />
            <View>
                <Text style={{
                    fontSize:16,
                    fontFamily:'outfit',
                    color:'white'
                }}>Welcome,</Text>
                <Text style={{
                    fontSize:19,
                    fontFamily:'outfit-medium',
                    color:'white'
                }}>{user?.fullName}</Text>
            </View>
        </View>
        <View style={{
            flexDirection:'row',
            gap:10,
            padding:10,
            alignItems:'center',
            backgroundColor:'white',
            marginVertical:10,
            marginTop:15,
            borderRadius:8
        }}>
            <Ionicons name="search" size={25} color={Colors.PRIMARY} style={{paddingRight:10}} />
            <TextInput 
            placeholder="Search businesses..."
            style={{
                fontFamily:'outfit',
                fontSize:16,
                paddingHorizontal:10,
                borderRadius:10,
                flex:1,
                // paddingVertical:10,
            }}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    },
    HeaderText:{
        fontSize:16,
    }
 
})