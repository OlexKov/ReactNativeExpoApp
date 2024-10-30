import CustomButton from "@/components/custom-button";
import FormField from "@/components/form-fields";
import images from "@/constants/images";
import { IUser, IUserCreate } from "@/models/account";
import { setCredentials } from "@/redux/clices/userSlice";
import { useAppDispatch } from "@/redux/store";
import { useRegisterMutation } from "@/services/accountService";
import { pickImage } from "@/utils/imagePicker";
import { jwtParse } from "@/utils/jwtParser";
import { saveToSecureStore } from "@/utils/secureStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, View, Image, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";

const userInitialState: IUserCreate = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    imageUri: ''
}

const SignUp = () => {
    const [user, setUser] = useState<IUserCreate>(userInitialState)
    const [errors, setErrors] = useState<string[]>([]);
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const router = useRouter();
    const dispatch = useAppDispatch()
    const [register, { isLoading }] = useRegisterMutation();

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        }
        else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    const submit = async () => {
        if (errors.length !== 0) {
            showMessage({
                message: "Правильно заповніть всі поля",
                type: "danger",
            });
            return;
        }
        try {
            const res = await register(user).unwrap()
            await saveToSecureStore('authToken', res.token)
            dispatch(setCredentials({ user: jwtParse(res.token) as IUser, token: res.token }))
            router.replace('/(main)')
        } catch (error: any) {
            console.log(error)
            alert(error.data.message ? error.data.message : "Unknown error")
        }
    }

    return (
        <SafeAreaView >
            <ScrollView className="bg-primary h-full">
                <View
                    className="w-full flex gap-2 items-center h-full px-4  py-7"
                    style={{
                        minHeight: Dimensions.get('window').height - 100,
                    }}>

                    <TouchableOpacity
                        className=' mb-5 self-center mx-2 w-[200px] h-[200px] rounded-full overflow-hidden '
                        onPress={async () => setUser({ ...user, imageUri: await pickImage() })}>
                        <Image source={user.imageUri ? { uri: user.imageUri } : images.noimage} className=" object-cover w-full h-full" />
                    </TouchableOpacity>

                    <FormField
                        placeholder="Enter your email"
                        title="Email"
                        value={user.email}
                        handleChangeText={(e) => setUser({ ...user, email: e })}
                        keyboardType="email-address"
                        rules={[
                            {
                                rule: 'required',
                                message: 'Email is required'
                            },
                            {
                                rule: 'regexp',
                                value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
                                message: 'Invalid email address'
                            },
                        ]}
                        onValidationChange={validationChange}
                    />

                    <FormField
                        placeholder="Enter your password"
                        title="Password"
                        value={user.password}
                        handleChangeText={(e) => setUser({ ...user, password: e })}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Password is required'
                            },
                            {
                                rule: 'regexp',
                                value: '[0-9]',
                                message: 'Password must have numbers '
                            },
                            {
                                rule: 'regexp',
                                value: '[!@#$%^&*(),.?":{}|<>]',
                                message: 'Password must have special chars '
                            },
                            {
                                rule: 'min',
                                value: 6,
                                message: 'Password must have min 6 symbols '
                            },
                            {
                                rule: 'max',
                                value: 40,
                                message: 'Password must have max 40 symbols '
                            }

                        ]}
                    />
                    <FormField
                        placeholder="Confirm your password"
                        title="Confirm password"
                        value={confirmPassword}
                        handleChangeText={(e) => setConfirmPassword(e)}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Confirm the password'
                            },
                            {
                                rule: 'equals',
                                value: user.password,
                                message: 'Passwords do not match'
                            },

                        ]}
                    />

                    <FormField
                        placeholder="Enter your firstname"
                        title="Firstname"
                        value={user.firstName}
                        handleChangeText={(e) => setUser({ ...user, firstName: e })}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Firstname is required'
                            },
                            {
                                rule: 'min',
                                value: 2,
                                message: 'Firstname must have min 2 symbols '
                            },
                            {
                                rule: 'max',
                                value: 100,
                                message: 'Firstname must have max 40 symbols '
                            }
                        ]}

                    />

                    <FormField
                        placeholder="Enter your lastname"
                        title="Lastname"
                        value={user.lastName}
                        handleChangeText={(e) => setUser({ ...user, lastName: e })}
                        onValidationChange={validationChange}
                        rules={[
                            {
                                rule: 'required',
                                message: 'Lastname is required'
                            },
                            {
                                rule: 'min',
                                value: 2,
                                message: 'Lastname must have min 2 symbols '
                            },
                            {
                                rule: 'max',
                                value: 100,
                                message: 'Lastname must have max 40 symbols '
                            }
                        ]}

                    />

                    <CustomButton title="Register" handlePress={submit} containerStyles="mt-7 w-full bg-slate-500 rounded-xl" isLoading={isLoading} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp