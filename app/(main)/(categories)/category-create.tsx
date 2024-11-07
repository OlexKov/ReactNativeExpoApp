import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { IMAGE_200_URL } from "@/constants/Url";
import { useAddCategoryMutation, useGetAllCategoriesQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation } from "@/services/categoryService";
import { ICategoryCreationModel } from "@/models/category/ICategoryCreationModel";
import { pickImage } from "@/utils/imagePicker";
import images from '../../../constants/images'
import FormField from "@/components/form-fields";
import CustomButton from "@/components/custom-button";

const categoryInitial = {
    id: 0,
    name: '',
    description: undefined,
    imageUri: undefined
}

export default function CategoryCreate() {
    const router = useRouter();
    const { id }: { id?: number } = useLocalSearchParams();
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [categoryData, setCategoryData] = useState<ICategoryCreationModel>(categoryInitial)
    const { data: categories, error } = useGetAllCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        setIsLoading(true)
        const category = categories?.filter(x => x.id == id)[0];
        if (id && !error && category) {
            setCategoryData({
                name: category.name,
                description: category.description,
                id: category.id,
                imageUri: category.image ? IMAGE_200_URL + category.image : ''
            })
        }
        setIsLoading(false)
    }, [id])

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        }
        else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    const onSubmit = async () => {
        if (errors.length !== 0) {
            showMessage({
                message: "Правильно заповніть всі поля",
                type: "danger",
            });
            return;
        }
        try {
            id ? await updateCategory(categoryData).unwrap() : await addCategory(categoryData).unwrap();
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
        <>
            {isLoading ? <ActivityIndicator className=" mx-auto my-auto" size="large" color="#f4511e" /> :
                <View className="flex flex-col justify-between  h-full ">
                    <ScrollView >
                        <View className=" flex gap-y-2 self-center  m-5" >
                            <TouchableOpacity
                                className=' self-center mx-2 w-[200px] h-[200px] rounded-sm overflow-hidden my-5  shadow-2xl shadow-black '
                                onPress={async () => setCategoryData({ ...categoryData, imageUri: await pickImage() })}>
                                <Image source={categoryData.imageUri ? { uri: categoryData.imageUri } : images.noimage} className=" object-cover w-full h-full rounded-sm" />
                            </TouchableOpacity>

                            <FormField
                                placeholder="Введіть назву категрії"
                                title="Назва"
                                value={categoryData.name}
                                handleChangeText={(e) => setCategoryData({ ...categoryData, name: e })}
                                onValidationChange={validationChange}
                                rules={[
                                    {
                                        rule: 'required',
                                        message: 'Назва обовязкова'
                                    },
                                    {
                                        rule: 'min',
                                        value: 2,
                                        message: 'Назва повинна містити не менше я 2 символи '
                                    },
                                    {
                                        rule: 'max',
                                        value: 100,
                                        message: 'Назва повинна містити не більше я 40 символів '
                                    }
                                ]}

                            />
                            <FormField
                                placeholder="Введіть опис категрії якщо потрібно"
                                title="Опис"
                                value={categoryData.description || ''}
                                handleChangeText={(e) => setCategoryData({ ...categoryData, description: e })}
                                otherStyles=" min-h-[100px]"
                                onValidationChange={validationChange}
                                multiline={true}
                                numberOfLines={5}
                                textAlignVertical="top"
                                rules={[
                                    {
                                        rule: 'min',
                                        value: 10,
                                        message: 'Опис повиннен містити не менше я 10 символів'
                                    },
                                    {
                                        rule: 'max',
                                        value: 3000,
                                        message: 'Назва повинна містити не більше я 3000 символів '
                                    }
                                ]}

                            />
                        </View>

                    </ScrollView>
                    <CustomButton title="Зберегти" containerStyles="bg-blue-500" textStyles="text-white font-bold text-xl" handlePress={onSubmit} />
                </View>}
        </>


    );
}




