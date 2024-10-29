import { View, Text, TextInput, Button, ScrollView, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { IMAGE_200_URL } from "@/constants/Url";
import { useAddCategoryMutation, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/services/categoryService";
import { ICategoryCreationModel } from "@/models/category/ICategoryCreationModel";
import { pickImage } from "@/utils/imagePicker";
import images from '../../constants/images'

interface MyFormData {
    name: string,
    description: string,
}

export default function CategoryCreate() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { control, handleSubmit, formState: { errors }, reset } = useForm<MyFormData>();
    const { data: category, error } = useGetCategoryByIdQuery(id?.toString() || ' ', { skip: !id });
    const [image, setImage] = useState<string | undefined>(undefined);
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (id && !error && category) {
            reset(({ name: category.name, description: category.description || '' }))
            if (category.image) {
                setImage(IMAGE_200_URL + category.image)
            }
        }
    }, [category])

    const onSubmit = async (data: MyFormData) => {
        const creationModel: ICategoryCreationModel = {
            id: id,
            name: data.name,
            description: data.description,
            imageUri: image
        }

        try {
            id ? await updateCategory(creationModel).unwrap() : await addCategory(creationModel).unwrap();
            showMessage({
                message: "Категорія успішно збережена",
                type: "success",
            });
            router.back();
        }
        catch (error: any) {
            showMessage({
                message: "Помилка при збереженні категорії",
                type: "danger",
            });
        }
    };

    return (
        <View style={{ height: "100%" }} className="flex flex-col justify-between">
            <ScrollView style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
                <TouchableOpacity
                    className=' self-center mx-2 w-[200px] h-[200px] rounded-sm overflow-hidden my-5  shadow-2xl shadow-black ' 
                    onPress={async () => setImage(await pickImage())}>
                    <Image source={image ? { uri: image } : images.noimage} className=" object-cover w-full h-full rounded-sm" />
                </TouchableOpacity>
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
});


