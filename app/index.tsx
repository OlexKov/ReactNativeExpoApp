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
    (async () => {
      const result = await axios.get<Category[]>("http://3.72.67.233:5088/get");
      if (result.status === 200) {
        setData(result.data)
      }
    })()
  }, [])
  return (
    <View style={{flex:1}} >
      <ScrollView style={{ height: "100%", width: "100%" }} >
        <View style={[styles.sectionContainer]}>
          {data.map(x => <CategoryCard key={x.id} category={x} />)}
        </View>
      </ScrollView>
      <Button title="Додати категорію" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
    width: "90%",
    marginLeft: "5%",
    alignItems: "center",
    gap: 5,
    marginBottom:15
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: "center"
  }
});
