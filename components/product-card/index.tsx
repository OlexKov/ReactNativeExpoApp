import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, } from 'react-native';
import { useRouter } from 'expo-router';
import { IMAGE_200_URL } from '@/constants/Url';
import images from '../../constants/images'
import { IProduct } from '@/models/product/IProduct';
import { useGetAllCategoriesQuery } from '@/services/categoryService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ProductCardProps {
    product: IProduct,
}
export const ProductCard: React.FC<ProductCardProps> = ({ product }): React.JSX.Element => {
    const { data: categories } = useGetAllCategoriesQuery();
    const addToCard = () =>{

    }
    return (
        <View className='bg-gray-100 elevation-xl border border-gray-400 flex flex-row justify-between  rounded-md overflow-hidden w-full p-3'>
            <Image
                className='w-[120px] aspect-[16/12] rounded-md'
                resizeMode="cover"
                source={product.images ? { uri: IMAGE_200_URL + product.images[0] } : images.noimage} />
            <View className='flex flex-col justify-between p-2 flex-1 ml-3'>
                <View className='flex flex-col'>
                    <Text className='text-xl'>{product.name}</Text>
                    <Text className='text-sm text-gray-400'>{categories?.filter(x=>x.id == product.categoryId)[0].name}</Text>
                </View>
                <Text className='text-xl font-bold text-green-500'>{product.price} грн.</Text>
            </View>
            <TouchableOpacity  className=' self-center' onPress={addToCard}>
                <MaterialIcons name="local-grocery-store" size={46} color="brown" />
            </TouchableOpacity>

        </View>
    );
}
