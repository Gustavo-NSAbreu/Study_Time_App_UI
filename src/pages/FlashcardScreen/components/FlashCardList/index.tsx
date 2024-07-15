import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { FlashCard } from "../../../../entity/flashCard.entity";
import FlashCardDeletionModal from "../FlashCardDeletionModal";
import { FlashCardService } from "../../../../integration/study-time/flashCard/flashCard.service";

interface FlashCardListProps {
  subtopicId: number;
  flashCards: FlashCard[];
  removeFlashCard: (flashCardId: number) => void;
  addNewFlashCard: (flashCard: FlashCard) => void;
  setAllFlashCards: (flashCards: FlashCard[]) => void;
}

interface Turned {
  [key: number]: boolean;
}

export default function FlashCardList({ subtopicId, flashCards, addNewFlashCard, setAllFlashCards, removeFlashCard }: FlashCardListProps) {
  const flashCardService = new FlashCardService();
  
  const [isTurned, setIsTurned] = useState<Turned>({});
  const [selectedFlashCard, setSelectedFlashCard] = useState<FlashCard>({} as FlashCard);
  const [isFlashCardDeletionModalVisible, setIsFlashCardDeletionModalVisible] = useState(false);

  function showFlashCardDeletionModal(flashCard: FlashCard) {
    setSelectedFlashCard(flashCard);
    setIsFlashCardDeletionModalVisible(true);
  }

  function hideFlashCardDeletionModal() {
    setIsFlashCardDeletionModalVisible(false);
    setSelectedFlashCard({} as FlashCard);
  }

  async function fetchFlashCards() {
    return await flashCardService.findAllFlashCard(subtopicId);
  }

  useEffect(() => {
    fetchFlashCards().then((response) => {
      if (!response.data) return;
      setAllFlashCards(response.data);
    });
  }, []);

  function handlePress(id: number) {
    setIsTurned(state => ({ ...state, [id]: !state[id] }));
  }

  return (
    <View className='w-screen items-center mb-10'>
      {flashCards.length ? flashCards.map((flashCard) => (
        <View key={flashCard.id}>
          <Pressable
            onPress={() => handlePress(flashCard.id)}
            onLongPress={() => showFlashCardDeletionModal(flashCard)}
            className={`${isTurned[flashCard.id] ? `bg-emerald-200 border-emerald-300 shadow-red-900` : `bg-gray-100 border-gray-300 shadow-gray-800`} justify-center items-center w-96 h-fit mb-4 p-5 animate-pulse border rounded-2xl shadow-md`}
          >
            <Text>{isTurned[flashCard.id] ? flashCard.answer : flashCard.question}</Text>
          </Pressable>
          {isFlashCardDeletionModalVisible && (
            <FlashCardDeletionModal
              subtopicId={subtopicId}
              deletedFlashcard={selectedFlashCard}
              visible={isFlashCardDeletionModalVisible}
              hide={hideFlashCardDeletionModal}
              removeFlashCard={removeFlashCard}
            />
          )}
        </View>
      )) : (
        <Text className='text-lg font-bold text-center'>Nenhum flashcard cadastrado</Text>
      )}
    </View>
  );
}