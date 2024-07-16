import { Button, Modal, Text, View } from "react-native";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";
import { SafeAreaView } from "react-native-safe-area-context";

interface SubtopicDeletionModalProps {
  visible: boolean;
  subtopicId: number;
  subtopicTitle: string;
  hide: () => void;
  removeSubtopic: (subtopicId: number) => void;
}

export default function SubtopicDeletionModal({ subtopicId, subtopicTitle, removeSubtopic, visible, hide }: SubtopicDeletionModalProps) {

  const subtopicService = new SubtopicService();

  async function handleDelete() {
    const response = await subtopicService.deleteSubtopic(subtopicId);
    if (!response.data) return;
    removeSubtopic(response.data.id);
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
        <Text className="mb-11 mx-8 text-2xl text-center">Deseja apagar o tópico {subtopicTitle}?</Text>
        <View className="mb-8">
          <Button title="Apagar" onPress={handleDelete} />
        </View>
        <View>
          <Button title="Fechar" onPress={hide} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}