
import { Stack } from "expo-router";
import React from "react";
import '../global.css'
import FlashMessage from "react-native-flash-message";
import { store } from '@/redux/store'
import { Provider } from "react-redux";

export const unstable_settings = {
  initialRouteName: "(main)/(products)/index",
};
export default function RootLayout() {
  return (
    <Provider store={store}>
        <Stack>
           <Stack.Screen name="index" options={{ headerShown: false }} />
           <Stack.Screen name="(main)" options={{ headerShown: false }} />
           <Stack.Screen name="(auth)" options={{ headerShown: false }} />
         </Stack>
      <FlashMessage position="bottom" />
    </Provider>

  );
}
