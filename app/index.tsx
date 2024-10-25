import { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { Button, ScrollView, View } from "react-native";
import axios from 'axios';
import { CategoryCard } from "@/components/category-card";
import { useRouter } from "expo-router";
import { showMessage } from "react-native-flash-message";




export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const router = useRouter();
  const handlePress = () => {
    router.push(`/category-create`)
  };
  useEffect(() => {
    (async () => { await setCategoryData() })()
  }, [])
  const onDelete = async (id: number) => {
    const result = await axios.delete(`http://3.72.67.233:5088/delete/${id}`);
    if (result.status === 200) {
      await setCategoryData()
      showMessage({
        message: "Категорія успішно видалена",
        type: "success",
      });
      router.push('/');
    }
    else {
      showMessage({
        message: "Сталася помилка при видаленні категорії",
        type: "danger",
      });
    }
  }

  const setCategoryData = async () => {
    const result = await axios.get<Category[]>("http://3.72.67.233:5088/get");
    if (result.status === 200) {
      setData(result.data)
    }

  }

  return (
    <View className="flex-1">
      <ScrollView style={{ width: "100%" }} >
        <View style={{ width: "93%", alignSelf: "center" }} className=" my-4 gap-4 flex flex-row flex-wrap justify-between">
          {data.map(x => <CategoryCard onDelete={onDelete} key={x.id} category={x} />)}
        </View>
      </ScrollView>
      <Button title="Додати категорію" onPress={handlePress} />
    </View>
  );
}


