import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { FlashCard } from "../../../../entity/flashCard.entity";
import FlashCardDeletionModal from "../FlashCardDeletionModal";
import { FlashCardService } from "../../../../integration/study-time/flashCard/flashCard.service";

interface FlashcardProps {
  setFlashCards: (flashcards: any) => void;
  flashCards: FlashCard[];
  subtopicId: number;
}

interface Turned {
  [key: number]: boolean;
}

export default function FlashCardList({ subtopicId }: FlashcardProps) {

  const flashCardService = new FlashCardService();

  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);

  async function fetchFlashCards() {
    return await flashCardService.findAllFlashCard(subtopicId);
  }

  useEffect(() => {
    fetchFlashCards().then((response) => {
      console.log(response.data);
      if (!response.data) return;
      setFlashCards(response.data);
    });
  }, []);

  const [isFlashCardDeletionModalVisible, setIsFlashCardDeletionModalVisible] = useState(false);

  function showFlashCardDeletionModal() { setIsFlashCardDeletionModalVisible(true); }
  function hideFlashCardDeletionModal() { setIsFlashCardDeletionModalVisible(false); }

  const [isTurned, setIsTurned] = useState<Turned>({});

  function handlePress(id: number) {
    setIsTurned(state => ({ ...state, [id]: !state[id] }));
  }

  return (
    <View className='w-screen items-center'>
      {flashCards.length ? flashCards.map((flashCard) => (
        <View key={flashCard.id}>
          <Pressable
            onPress={() => handlePress(flashCard.id)}
            onLongPress={showFlashCardDeletionModal}
            className="justify-center items-center w-96 h-fit mb-4 p-5 animate-pulse border rounded-2xl border-gray-300 shadow-sm shadow-black bg-gray-100"
          >
            <Text>{isTurned[flashCard.id] ? flashCard.answer : flashCard.question}</Text>
          </Pressable>
          <FlashCardDeletionModal
            subtopicId={subtopicId}
            deletedFlashcard={flashCard}
            visible={isFlashCardDeletionModalVisible}
            hide={hideFlashCardDeletionModal}
            setFlashCards={setFlashCards}
          />
        </View>
      )) : (
        <Text className='text-lg font-bold text-center'>Nenhum flashcard cadastrado</Text>
      )}
    </View>
  );
}