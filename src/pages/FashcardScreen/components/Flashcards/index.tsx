import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { flashcardList } from "../../../../../mock/mock_data";

interface FlashcardProps {
  topicId: number;
}

interface Turned {
  [key: number]: boolean;
}

export default function Flashcard({ topicId }: FlashcardProps) {

  const [filteredFlashcards, _] = useState(flashcardList.filter(flashcard => flashcard.topicId === topicId));

  const [isTurned, setIsTurned] = useState<Turned>({});

  function handlePress(id: number) {
    setIsTurned(state => ({ ...state, [id]: !state[id] }));
  }

  return (
    <View className='w-screen items-center'>
      {filteredFlashcards.length ? filteredFlashcards.map((flashcard) => (
          <View key={flashcard.id}>
            <Pressable
              onPress={() => handlePress(flashcard.id)}
              className="justify-center items-start w-96 h-fit mb-4 p-5 animate-pulse border rounded-2xl border-gray-300 shadow-sm shadow-black bg-gray-100"
            >
              <Text>{isTurned[flashcard.id] ? flashcard.answer : flashcard.question}</Text>
            </Pressable>
          </View>
        )) : (
          <Text className='text-lg font-bold self-center'>Nenhum flashcard cadastrado</Text>
        )}
    </View>
  );
}