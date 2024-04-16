import { Text, View, SafeAreaView } from "react-native";


export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center h-full">
        <Text className="text-4xl">Home</Text>
      </View>
    </SafeAreaView>
  );
}