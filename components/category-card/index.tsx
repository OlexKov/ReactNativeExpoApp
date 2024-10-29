import React, { useState } from 'react';
import { ICategory } from '../../models/category/ICategory'
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Confirmation } from '../modal';
import { IMAGE_200_URL } from '@/constants/Url';
import images from '../../constants/images'

interface CategoryCardProps {
    category: ICategory,
    onDelete: Function | undefined
}
export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete = undefined }): React.JSX.Element => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const confirmAction = (id: number) => {
        if (onDelete) {
            onDelete(id)
        }
        setModalVisible(false)
    };
    return (
        <View style={{ width: "47%" }} className='bg-gray-300 elevation-xl border border-gray-500  rounded-md overflow-hidden'>
            <Confirmation
                isVisible={modalVisible}
                title={`Ви впевненні що бажаєте видалити "${category.name}" ?`}
                onConfirm={() => confirmAction(category.id)}
                onCancel={() => setModalVisible(false)} />
            <Image
                className='w-full aspect-[16/12]'
                resizeMode="cover"
                source={category.image ? { uri: IMAGE_200_URL + category.image } : images.noimage} />
            <View className=' flex flex-row  justify-between'>
                <TouchableOpacity className=' self-center mx-1' onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="delete-forever" size={24} color="red" />
                </TouchableOpacity>

                <Text className='self-center m-3 flex-shrink'>{category.name}</Text>
                <TouchableOpacity className=' self-center mx-2' onPress={() => router.push(`/category-create?id=${category.id}`)}>
                    <MaterialIcons name="edit-square" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
