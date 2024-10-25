import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Вхід" }}
                />
                {/*<Stack.Screen*/}
                {/*    name="sign-up"*/}
                {/*    options={{*/}
                {/*        headerShown: false,*/}
                {/*    }}*/}
                {/*/>*/}
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default AuthLayout