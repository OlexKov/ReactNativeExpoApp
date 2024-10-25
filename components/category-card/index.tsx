import React, { useState } from 'react';
import { Category } from '../../models/Category'
import { Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Confirmation } from '../modal';
const noImage = require('../../assets/images/noimage.jpg');



interface CategoryCardProps {
    category: Category,
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
        <View  style={[styles.card]}>
            <Confirmation
                isVisible={modalVisible}
                title={`Ви впевненні що бажаєте видалити "${category.name}" ?`}
                onConfirm={() => confirmAction(category.id)}
                onCancel={() => setModalVisible(false)} />
            <Image
                style={{width:"100%",height:"auto", aspectRatio: "14/10" }}
                resizeMode="cover"
                source={category.image?{ uri: `http://3.72.67.233:5088/images/200_${category.image}` }:noImage} />
            <View className=' flex flex-row justify-between'>
                <TouchableOpacity className=' self-center mx-1'  onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="delete-forever" size={24} color="red" />
                </TouchableOpacity>

                <Text style={[styles.cardText]}>{category.name}</Text>
                <TouchableOpacity className=' self-center mx-2' onPress={() => router.push(`/category-create?id=${category.id}`)}>
                    <MaterialIcons name="edit-square" size={24} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "47%",
        backgroundColor: "lightgray",
        elevation: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        overflow: "hidden",

    },
    cardText: {
        margin: 10,
        alignSelf: "center",
        flexShrink:1

    }
});