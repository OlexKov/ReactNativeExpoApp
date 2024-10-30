import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { View, Text, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import { jwtParse } from '@/utils/jwtParser'
import { useAppDispatch } from '@/redux/store'
import FormField from '@/components/form-fields'
import CustomButton from '@/components/custom-button'
import { useLoginMutation } from '@/services/accountService'
import { ILogin, IUser } from '@/models/account'
import { setCredentials } from '@/redux/clices/userSlice'
import { saveToSecureStore } from '@/utils/secureStore'


const SignIn = () => {
    const [loginData , setLoginData] = useState<ILogin>({email:'',password:''})
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const submit = async () => {
        try {
            const res = await login(loginData).unwrap()
            await saveToSecureStore('authToken', res.token)
            dispatch(setCredentials({ user: jwtParse(res.token) as IUser, token: res.token }))
            router.replace('/(main)')
        } catch (error: any) {
            console.log(error)
            alert(error.data.message ? error.data.message : "Unknown error")
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full gap-2 flex justify-center items-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get('window').height - 100,
                    }}>
                    <View className="flex flex-row items-center justify-center">
                        {/* <Image source={images.pizzaLogo} className=" w-[40px] h-[34px]" resizeMode="contain" /> */}
                        <Text className="mt-2 text-4xl font-pbold font-bold text-secondary">MYAPP</Text>
                    </View>

                    <Text className="text-2xl font-semibold text-slate-4Ad00 mt-10 font-psemibold">Log in to My App</Text>

                    <FormField
                        placeholder="Enter your email"
                        title="Email"
                        value={loginData.email}
                        handleChangeText={(e) => setLoginData({...loginData,email:e})}
                        keyboardType="email-address"
                    />

                    <FormField
                        placeholder="Enter your password"
                        title="Password"
                        value={loginData.password}
                        handleChangeText={(e) => setLoginData({...loginData,password:e})}
                    />

                    <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7 w-full bg-slate-500 rounded-xl" isLoading={isLoading} />
                    <View className="flex justify-center items-center pt-5 flex-row gap-2">
                        <Text className="text-sm text-gray-600 font-pregular">Don't have an account?</Text>
                        <Link href="/(auth)/sing-up" className="text-base  font-psemibold text-secondary">
                            Signup
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn


