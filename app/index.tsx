import { IUser } from "@/models/account";
import { setCredentials } from "@/redux/clices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { jwtParse } from "@/utils/jwtParser";
import { getFromSecureStore, removeFromSecureStore } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Start() {
    const dispatch = useAppDispatch()
    const router = useRouter();
    useEffect(() => {
        (async () => {
            let isAuthenticated = false;
            const token = await getFromSecureStore('authToken');
            if (token) {
                const user = jwtParse(token) as IUser;
                if (new Date(user.exp * 1000) >= new Date()) {
                    dispatch(setCredentials({ user: user, token: token }))
                    isAuthenticated = true;
                }
                else{
                    await removeFromSecureStore('authToken');
                }
            }
            router.replace(isAuthenticated ? '/(main)' : '/(auth)');
        })()
    }, [])
}