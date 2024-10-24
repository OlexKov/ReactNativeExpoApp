import { Category } from "@/models/Category";
import { useEffect, useState } from "react";
import { Button, ScrollView, View } from "react-native";
import axios from 'axios';
import { CategoryCard } from "@/components/category-card";
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";



export default function Categories() {
  const [data, setData] = useState<Category[]>([]);
  const router = useRouter();
  const handlePress = () => {
     router.push(`/category-create`)
  };
  useEffect(() => {
    (async () => { await setCategoryData()})()
  }, [])
const onDelete = (id:number)=>{

}

const setCategoryData = async()=>{
  const result = await axios.get<Category[]>("http://3.72.67.233:5088/get");
  if (result.status === 200) {
    setData(result.data)
  }
}


  return (
    <View className="flex-1">
      <ScrollView >
        <View className="flex flex-row flex-wrap justify-between">
          {data.map(x => <CategoryCard onDelete={onDelete} key={x.id} category={x} />)}
        </View>
      </ScrollView>
      <Button title="Додати категорію" onPress={handlePress} />
    </View>
  );
}


