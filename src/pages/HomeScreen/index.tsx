import { Text, View, SafeAreaView, Pressable, ScrollView } from "react-native";
import Subjects from "./components/Subjects";
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {

  return (
    <SafeAreaView className="items-center w-screen">
      <ScrollView className="w-full">
        <View className="items-center justify-center p-12 mb-10">
          <Pressable>
            <Text>UserIcon</Text>
          </Pressable>
        </View>

        <View className="w-full">
          <View className="flex-row gap-60 self-center justify-center items-center mb-12">
            <Text className="text-2xl">Matérias</Text>
            <Pressable>
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>
          <Subjects />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}