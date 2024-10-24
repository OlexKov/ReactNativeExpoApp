import { View ,Text} from "react-native";
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
export default function CategoryCreate() {
    const { id } = useLocalSearchParams();
    return (
        <View className="flex-1 justify-center align-middle">
        <Text>{id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
