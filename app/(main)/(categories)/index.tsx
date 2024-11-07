import { useEffect} from "react";
import { ActivityIndicator, Button, ScrollView, View } from "react-native";
import { CategoryCard } from "@/components/category-card";
import { useRouter } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { useIsFocused } from "@react-navigation/native";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/services/categoryService";
import CustomButton from "@/components/custom-button";

export default function Categories() {
  const { data: categories, isLoading, refetch } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const router = useRouter();
  const isFocused = useIsFocused();
  const handlePress = () => {
    router.push(`/category-create`)
  };

  useEffect(() => {
    refetch()
  }, [isFocused])

  const onDelete = async (id: number) => {
    try {
      await deleteCategory(id.toString()).unwrap();
      refetch();
      showMessage({
        message: "Категорія успішно видалена",
        type: "success",
      });
    }
    catch (error) {
      showMessage({
        message: "Сталася помилка при видаленні категорії",
        type: "danger",
      });
    }
    
  }

  return (
    <>{!isLoading
      ? <View className="flex-1">
        <ScrollView style={{ width: "100%" }} >
          <View style={{ width: "93%", alignSelf: "center" }} className=" my-4 gap-4 flex flex-row flex-wrap justify-between">
            {categories?.map(x => <CategoryCard onDelete={onDelete} key={x.id} category={x} />)}
          </View>
        </ScrollView>
        <CustomButton title="Додати категорію" containerStyles="bg-blue-500" textStyles="text-white font-bold text-xl" handlePress={handlePress} />
      </View>
      : <ActivityIndicator className=" mx-auto my-auto" size="large" color="#f4511e" />}
    </>
  );
}


