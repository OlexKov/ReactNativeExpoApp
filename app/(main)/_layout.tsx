
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";



export default function MainLayout() {
  const params = useGlobalSearchParams();
  const path = usePathname();
  const [categoryTitle, setCategoryTitle] = useState<string>()
  useEffect(() => {
    if (path.includes("category-create")) {
      setCategoryTitle(`${params.id ? "Редагувати" : "Додати"} категорію`)
    }

  }, [params]);
  return (
   <>
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
          <Stack.Screen  name="index" options={{ title: "Kатегорії" }} />
          <Stack.Screen  name="category-create" options={{ title: categoryTitle }} />
        </Stack>

      </View>
   </>
      
   

  );
}
