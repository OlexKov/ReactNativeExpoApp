import { CustomHeader } from '@/components/header'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false  }}/>
                <Stack.Screen name="sing-up" options={ { header:()=><CustomHeader title="Новий користувач"/> }}/>
            </Stack>
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default AuthLayout