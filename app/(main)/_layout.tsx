import { isAdmin } from "@/redux/clices/userSlice";
import { RootState } from "@/redux/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSelector } from "react-redux";

export default function MainLayout() {
    const admin = useSelector((state: RootState) => isAdmin(state))
    return (
        <View className="flex-1">
            <Tabs>
                <Tabs.Screen name="(products)" options={{
                    headerShown: false,
                    title: 'Продукти',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="inventory" size={size} color={color} />
                    ),
                    tabBarStyle: {
                        display: admin ? 'flex' : 'none',
                    },

                }} />
                <Tabs.Screen name="(categories)" options={{
                    headerShown: false,
                    title: 'Категорії',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="category" size={size} color={color} />
                    ),

                    tabBarStyle: {
                        display: 'none',
                    },
                }} />
            </Tabs>
        </View>
    );
}