import { Text, View, SafeAreaView, Pressable, ScrollView } from "react-native";
import Subjects from "./components/Subjects";
import { AntDesign, FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {

  return (
    <SafeAreaView className="items-center w-screen h-screen">
      <ScrollView className="w-full">
        <View className="items-end justify-center p-12 mb-10">
          <Pressable>
            <FontAwesome name="user-circle-o" size={24} color="black" />
          </Pressable>
        </View>

        <View className="w-full">
          <View className="flex-row gap-52 self-center justify-center items-center mb-12">
            <Text className="text-2xl font-bold">Matérias</Text>
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