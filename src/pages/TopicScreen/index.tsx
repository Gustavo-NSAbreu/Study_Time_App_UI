import { Text, View, SafeAreaView } from "react-native";

export default function TopicScreen() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center h-full">
        <Text className="text-4xl">Topics</Text>
      </View>
    </SafeAreaView>
  );
}