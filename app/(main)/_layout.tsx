
import { CustomHeader } from "@/components/header";
import { Stack, useGlobalSearchParams, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function MainLayout() {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const path = usePathname();
  const [categoryTitle, setCategoryTitle] = useState<string | undefined>()
  useEffect(() => {
    if (path.includes("category-create")) {
      setCategoryTitle(`${params.id ? "Редагувати" : "Додати"}`)
    }

  }, [params]);

  
  return (
    <>
      <View className="flex-1">
        <Stack>
          <Stack.Screen  name="index" options={ { header:()=><CustomHeader title="Категорії"/> } } />
          <Stack.Screen name="category-create" options={{ header:()=><CustomHeader title={categoryTitle}/> }} />
        </Stack>
      </View>
    </>



  );
}
