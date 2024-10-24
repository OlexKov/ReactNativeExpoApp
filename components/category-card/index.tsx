import React from 'react';
import { Category } from '../../models/Category'
import {  Image, StyleSheet, Text, View } from 'react-native';

interface CategoryCardProps {
    category: Category
}
export const CategoryCard: React.FC<CategoryCardProps> = ({ category }): React.JSX.Element => {
    return (
        <View style={[styles.card]}>
            <Image
                style={{ width: "100%", aspectRatio: "14/10" }}
                resizeMode="cover"
                source={{ uri: `http://3.72.67.233:5088/images/200_${category.image}` }} />
            <Text style={[styles.cardText]}>{category.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: "auto",
        width: "46%",
        margin: 5,
        backgroundColor: "lightgray",
        elevation: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        overflow: "hidden"
    },
    cardText: {
        margin: 10,
        alignSelf: "center"

    }
});