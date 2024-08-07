import { Button, Modal, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashCard } from "../../../../entity/flashCard.entity";
import { FlashCardService } from "../../../../integration/study-time/flashCard/flashCard.service";

interface TopicDeletionModalProps {
  subtopicId: number;
  deletedFlashcard: FlashCard;
  removeFlashCard: (flashCardId: number) => void;
  visible: boolean;
  hide: () => void;
}

export default function TopicDeletionModal({ deletedFlashcard, removeFlashCard, visible, hide }: TopicDeletionModalProps) {

  const flashCardService = new FlashCardService();

  async function handleDelete() {
    const response = await flashCardService.deleteFlashCard(deletedFlashcard.id);
    if (!response.data) return;
    removeFlashCard(response.data.id);
    hide();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={hide}
      className="items-center w-screen h-screen"
    >
      <SafeAreaView className="items-center w-screen h-screen mt-44">
        <ScrollView>
          <Text className="mb-11 text-2xl">Deseja apagar o flashcard?</Text>
          <Text className="mb-11 text-m mx-8d">P:{deletedFlashcard.question}</Text>
          <Text className="mb-11 text-md mx-8">R:{deletedFlashcard.answer}</Text>
          <View className="mb-8">
            <Button title="Apagar" onPress={handleDelete} />
          </View>
          <View>
            <Button title="Fechar" onPress={hide} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}