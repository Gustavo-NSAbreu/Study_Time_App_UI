import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { RootStackParamList } from "../../Router";
import FlashCardList from "./components/FlashCardList";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlashCard } from "../../entity/flashCard.entity";
import FlashCardCreationModal from "./components/FlashCardCreationModal";
import Timer from "./components/TImer";

type FlashCardScreenProps = NativeStackScreenProps<RootStackParamList, 'Flashcard'>;

export default function FlashcardScreen({ route }: FlashCardScreenProps) {

  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [subtopicId, _] = useState<number>(route.params.subtopicId);
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [isFlashCardCreationModalVisible, setIsFlashCardCreationModalVisible] = useState<boolean>(false);

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
    <SafeAreaView className='items-center justify-start w-screen h-fit'>
      <ScrollView>
        <View>
          <Timer />
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