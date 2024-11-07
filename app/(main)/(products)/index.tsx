import { ProductCard } from "@/components/product-card";
import { useGetAllCategoriesQuery } from "@/services/categoryService";
import { useGetAllProductsQuery } from "@/services/productService";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";

export default function Products() {
    const { data: products, isLoading: isProductLoading, refetch: productRefech } = useGetAllProductsQuery();
    const { isLoading: isCategoryLoading } = useGetAllCategoriesQuery();

    const router = useRouter();
    const isFocused = useIsFocused();

    useEffect(() => {
        productRefech()
    }, [isFocused])

    const refresh = () => {
        productRefech()
    }


    return (
        <>
            {!isCategoryLoading && !isProductLoading
                ? <View className="flex-1 relative">
                    <TouchableOpacity onPress={refresh} className="w-[42px] h-[42px] rounded-full absolute bg-green-400 z-50 top-[2%] right-[2%] elevation-xl">
                         <MaterialIcons name="refresh" size={34} color="white" className="mx-auto my-auto" />
                    </TouchableOpacity>
                    <ScrollView style={{ width: "100%" }} >
                        <View style={{ width: "93%", alignSelf: "center" }} className=" my-4 gap-4 flex flex-row flex-wrap justify-between">
                            {products?.map(x => <ProductCard key={x.id} product={x} />)}
                        </View>
                    </ScrollView>

                </View>
                : <ActivityIndicator className=" mx-auto my-auto" size="large" color="#f4511e" />}
        </>
    );
}