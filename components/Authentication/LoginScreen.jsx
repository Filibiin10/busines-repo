import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
// import { startOAuthFlow } from 'your-oauth-library';
import * as WebBrowser from 'expo-web-browser'
import {useWarmUpBrowser} from "@/hooks/useWarmUpBrowser"
import { useOAuth } from '@clerk/clerk-expo';
import busi from '@/assets/images/busi.png'

WebBrowser.maybeCompleteAuthSession();
export default function () {
    useWarmUpBrowser();

    const {startOAuthFlow } = useOAuth({strategy:'oauth_google'})

    const onPress = React.useCallback(async () => {
        try {
            const {createdSessionId, signIn , signOut , setActive} = await startOAuthFlow();

            if(createdSessionId){
                setActive({session:createdSessionId})
            }else{

            }
        } catch (error) {
            console.error('Failed to start authentication flow', error);
        }
    },[])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',
        marginTop:-40
    }}>
      <View >
        <Image style={styles.img} source={busi} />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.textHeader}>Your Ultimate 
            <Text style={{color:Colors.PRIMARY}}> Community Business Directory</Text> App</Text>
        <Text style={styles.textdes}>Find the perfect business for your needs</Text>
        <TouchableOpacity
        onPress={onPress}
        style={styles.btn}>
            <Text style={{
                color:'white',
                fontFamily:'outfit',
                fontSize:18,
                textAlign:'center'
            }}>Let`s Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    img:{
        display:'flex',
        width:220,
        height:400,
        borderRadius:25,
        borderWidth:6,
        alignItems:'center',
        justifyContent:'center'
        // resizeMode:'contain'
    },
    subContainer:{
        backgroundColor:'white',
        padding:20,
        marginTop:-20
    }
    ,
    textHeader:{
        fontSize:30,
        fontFamily:'outfit-bold',
        marginBottom:10,
        textAlign:'center',
    },
    textdes:{
        fontSize:16,
        fontFamily:'outfit',
        marginBottom:10,
        textAlign:'center',
        color:Colors.GRAY
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        padding:16,
        borderRadius:99,
        color:'white',
        marginTop:20,
        marginBottom:10,
    }
})