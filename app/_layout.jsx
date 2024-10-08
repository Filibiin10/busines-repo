import {useFonts} from "expo-font";
import { Stack } from 'expo-router';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import outfitRegular from '@/assets/fonts/Outfit-Regular.ttf';
import outfitMedium from '@/assets/fonts/Outfit-Medium.ttf';
import outfitBold from '@/assets/fonts/Outfit-Bold.ttf';
import LoginScreen from '@/components/Authentication/LoginScreen';
import * as SecureStore from 'expo-secure-store';

export default function _layout() {
  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log('No values stored under key: ' + key);
        }
        return item;
      } catch (error) {
        console.error('SecureStore get item error: ', error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  // Load fonts and check if they are loaded
  const [fontsLoaded] = useFonts({
    'outfit': outfitRegular,
    'outfit-medium': outfitMedium,
    'outfit-bold': outfitBold
  });

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        </SafeAreaView>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
