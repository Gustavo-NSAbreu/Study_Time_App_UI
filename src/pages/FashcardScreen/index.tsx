import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView } from "react-native";
import { RootStackParamList } from "../../Router";

type TopicScreenProps = NativeStackScreenProps<RootStackParamList, 'Topic'>;


export default function FlashcardScreen() {
  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center h-full">
        <Text className="text-4xl">Flashcards</Text>
      </View>
    </SafeAreaView>
  );
}