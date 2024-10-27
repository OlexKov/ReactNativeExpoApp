
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import '../global.css'
import FlashMessage from "react-native-flash-message";
import { store } from '@/redux/store'
import { Provider } from "react-redux";

export default function RootLayout() {

  return (
    <Provider store={store}>
      <View className="flex-1">
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name="(main)" options={{ headerShown: false, }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false, }} />
        </Stack>

      </View>
      <FlashMessage position="bottom" />
    </Provider>

  );
}
