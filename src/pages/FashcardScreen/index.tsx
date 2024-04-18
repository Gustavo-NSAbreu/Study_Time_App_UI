import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { RootStackParamList } from "../../Router";
import Flashcard from "./components/Flashcards";
import { AntDesign, FontAwesome  } from '@expo/vector-icons';



type TopicScreenProps = NativeStackScreenProps<RootStackParamList, 'Flashcard'>;


export default function FlashcardScreen({ route }: TopicScreenProps) {
  return (
    <SafeAreaView className='items-center w-screen h-screen'>
      <ScrollView>
        <View className='items-end justify-center p-12 mb-10'>
          <Pressable>
            <FontAwesome name="user-circle-o" size={24} color="black" />
          </Pressable>
        </View>
        <View className='items-center justify-center p-12 mb-10'>
          <Text className="text-4xl">Cronômetro</Text>
        </View>
        <View className='flex-row gap-44 self-center justify-center items-center mb-12'>
          <Text className='text-xl font-bold'>Flashcards</Text>
          <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
        </View>
        <Flashcard topicId={route.params.topicId} />
      </ScrollView>
    </SafeAreaView>
  );
}