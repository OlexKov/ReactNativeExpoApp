import { BASE_URL } from "@/constants/Url"
import { IUser } from "@/models/account"
import { getUser, logOut } from "@/redux/clices/userSlice"
import { RootState, useAppDispatch } from "@/redux/store"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import CustomButton from "../custom-button"
import { removeFromSecureStore } from "@/utils/secureStore"
import { useRouter } from "expo-router"
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import { useEffect } from "react"
const noImage = require('../../assets/images/noimage.jpg');

interface CustomHeaderCardProps {
    title: string | undefined,

}
export const CustomHeader: React.FC<CustomHeaderCardProps> = ({ title }): React.JSX.Element => {
    const user: IUser | null = useSelector((state: RootState) => getUser(state))
    const router = useRouter();
    const dispatcher = useAppDispatch();
    const logout = () => {
        removeFromSecureStore('authToken');
        router.replace('/(auth)')
    }

    useEffect(()=>{
        if(!user && title !== "Новий користувач"){
            logout();
        }
    },[user])

    return (
        <View className="w-full h-[90px] bg-orange-600  pt-7 flex flex-row justify-between items-center">
            <View className="flex flex-row gap-2 ml-4">
                {router.canGoBack() &&
                    <TouchableOpacity className=' self-center' onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>}
                <Text className="font-bold  text-2xl color-white">{title}</Text>
            </View>

            {user &&
                <View className="flex flex-row gap-4 mr-7 items-center">
                    <Image source={user.photo ? { uri: BASE_URL + "/images/200_" + user.photo } : noImage} className="w-[35px] h-[35px] rounded-full s" />
                    <CustomButton textStyles="color-white" title="Вийти" handlePress={()=> dispatcher(logOut())} />
                </View>
            }
        </View>
    )
}
