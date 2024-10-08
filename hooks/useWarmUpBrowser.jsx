import React from "react";
import * as WebBrowser from 'expo-web-browser'
import { Platform } from "react-native";

export const useWarmUpBrowser = () => {
    React.useEffect(()=>{
        // void  WebBrowser.warmUpAsync()
        if (Platform.OS !== 'web') {
            void WebBrowser.warmUpAsync();
          }
        return () => {
            // // Cleanup
            // void WebBrowser.coolDownAsync();
            if (Platform.OS !== 'web') {
               void WebBrowser.coolDownAsync();
              }
        }
    },[])
}