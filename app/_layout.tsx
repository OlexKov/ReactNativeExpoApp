
import { Stack, useGlobalSearchParams, useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const params = useGlobalSearchParams();
  const path = usePathname();
  const [categoryTitle,setCategoryTitle] = useState<string>()
  useEffect(() => {
    if(path.includes("category-create")){
      setCategoryTitle(`${params.id?"Редагувати":"Додати"} категорію`)
    }
    
  }, [params]);
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen
          name="index"
          options={{ title: "Kатегорії" }} />
        <Stack.Screen
          name="category-create"
          options={{ title: categoryTitle }} />
      </Stack>
    </View>
  );
}
