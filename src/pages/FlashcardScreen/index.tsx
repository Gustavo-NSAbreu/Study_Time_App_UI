import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { RootStackParamList } from "../../Router";
import FlashCardList from "./components/FlashCardList";
import { AntDesign } from '@expo/vector-icons';
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlashCard } from "../../entity/flashCard.entity";
import FlashCardCreationModal from "./components/FlashCardCreationModal";

type FlashCardScreenProps = NativeStackScreenProps<RootStackParamList, 'Flashcard'>;

export default function FlashcardScreen({ route }: FlashCardScreenProps) {

  const [subtopicId, _] = useState(route.params.subtopicId);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [isFlashCardCreationModalVisible, setIsFlashCardCreationModalVisible] = useState(false);

  function setAllFlashCards(flashCards: FlashCard[]) {
    setFlashCards(flashCards);
  }

  function addNewFlashCard(flashCard: FlashCard) {
    setFlashCards((flashCards: FlashCard[]) => [...flashCards, flashCard]);
  }

  function removeFlashCard(flashCardId: number) {
    setFlashCards((flashCards: FlashCard[]) => flashCards.filter(flashCard => flashCard.id !== flashCardId));
  }

  function showFlashCardCreationModal() { setIsFlashCardCreationModalVisible(true); }
  function hideFlashCardCreationModal() { setIsFlashCardCreationModalVisible(false); }

  const navigation = useNavigation();

  useLayoutEffect(() => {
  navigation.setOptions({
    title: route.params.subtopicName,
  });
  }, [navigation]);
  
  return (
    <SafeAreaView className='items-center w-screen h-fit'>
      <ScrollView>
        <View>
          <View className='items-center justify-center p-12 mb-10'>
            <Text className="text-4xl">Cronômetro</Text>
          </View>
          <View className='flex-row gap-44 self-center justify-center items-center mb-12'>
            <Text className='text-xl font-bold'>Flashcards</Text>
            <Pressable
              onPress={showFlashCardCreationModal}
            >
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>
          <FlashCardList
            subtopicId={subtopicId}
            flashCards={flashCards}
            addNewFlashCard={addNewFlashCard}
            setAllFlashCards={setAllFlashCards}
            removeFlashCard={removeFlashCard}
          />
        </View>
        <FlashCardCreationModal
          subtopicId={subtopicId}
          visible={isFlashCardCreationModalVisible}
          hide={hideFlashCardCreationModal}
          addNewFlashCard={addNewFlashCard}
        />
      </ScrollView>
    </SafeAreaView>
  );
}