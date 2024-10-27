import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToSecureStore = async (name: string, token: string) => {
  try {
    await AsyncStorage.setItem(name, token);
  } catch (error) {
    console.log("Помилка при збереженні токена:", error);
  }
}

export const getFromSecureStore = async (name: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(name);
  } catch (error) {
    console.log("Помилка при отриманні токена:", error);
    return null;
  }
}

export const removeFromSecureStore = async (name: string) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    console.log("Помилка при видаленні токена:", error);
    return null;
  }
}