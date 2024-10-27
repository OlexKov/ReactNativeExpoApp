import { View, Text, TextInput, Button, ScrollView, Image } from "react-native";
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import { Category } from "@/models/Category";
import * as ImagePicker from 'expo-image-picker';
import axios, { AxiosResponse } from "axios";
const noImage = require('../../assets/images/noimage.jpg');
import { showMessage } from "react-native-flash-message";
import { BASE_URL,API_URL } from "@/constants/Url";

const formHeader = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}
interface MyFormData {
    name: string,
    description: string,
}

export default function CategoryCreate() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<MyFormData>();
    const [image, setImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (id) {
            (async () => {
                const result = await axios.get<Category>(`${API_URL}/get/${id}`);
                if (result.status === 200) {
                    reset(({ name: result.data.name, description: result.data.description || '' }))
                    if (result.data.image) {
                        setImage(`${BASE_URL}/images/200_${result.data.image}`)
                    }

                }
            })()
        }
    },[])

    const onSubmit = async (data: MyFormData) => {

        const formData = new FormData();
        if (image) {
            formData.append('imageFile', {
                uri: image,
                type: "image/" + image.split('.').pop(),
                name: image.split('/').pop(),
            } as any);

        }
        formData.append('name', data.name)
        formData.append('description', data.description || '')
        formData.append('id', id ? `${id}` : "0");
        let result: AxiosResponse | undefined = undefined;
        if (id) {
            result = await axios.put(`${API_URL}/update`, formData, formHeader);
        }
        else {
            result = await axios.post(`${API_URL}/create`, formData, formHeader);
        }
        if (result && result.status === 200) {
            showMessage({
                message: "Категорія успішно збережена",
                type: "success",
            });
            router.back();
        }
        else {
            showMessage({
                message: "Сталася помилка при збереженні категорії",
                type: "danger",
            });
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ height: "100%" }} className="flex flex-col justify-between">
            <ScrollView style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
                <View style={{ alignSelf: "center", marginBottom: 20 }}>
                    <View style={styles.imageContainer}>
                        <Image source={image ? { uri: image } : noImage} style={styles.image} />
                    </View>
                    <Button title="Вибрати фото" onPress={pickImage} />
                </View>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Ім'я категорії"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={typeof value === 'string' ? value : ''}
                        />
                    )}

                    rules={{ required: "Ім'я обов'язкове..." }}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name?.message}</Text>}

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            maxLength={4000}
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical="top"
                            style={styles.inputArea}
                            placeholder="Опис"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={typeof value === 'string' ? value : ''}
                        />
                    )}
                />
            </ScrollView>
            <Button title="Зберегти" onPress={handleSubmit(onSubmit)} />
        </View>

    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 4,
    },
    inputArea: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 10,
        elevation: 20,
        marginVertical: 10,
        alignSelf: 'center',
    },
    image: {
        width: "100%",
        height: '100%',
        objectFit: "cover",
        borderRadius: 10,
    },
});


