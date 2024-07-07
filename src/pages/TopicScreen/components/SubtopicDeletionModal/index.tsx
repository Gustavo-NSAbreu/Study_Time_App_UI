import { Button, Modal, Text, View } from "react-native";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";
import { SafeAreaView } from "react-native-safe-area-context";

interface SubtopicDeletionModalProps {
  subtopicId: number;
  subtopicTitle: string;
  setSubtopics: (subtopics: any) => void;
  visible: boolean;
  hide: () => void;
}

export default function SubtopicDeletionModal({ subtopicId, subtopicTitle, setSubtopics, visible, hide }: SubtopicDeletionModalProps) {

  const subtopicService = new SubtopicService();

  async function handleDelete() {
    const response = await subtopicService.deleteSubtopic(subtopicId);
    if (!response.data) return;
    setSubtopics((subtopics: any) => subtopics.filter((subtopic: any) => subtopic.id !== subtopicId));
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
        <Text className="mb-11 text-2xl">Deseja apagar o tópico {subtopicTitle}?</Text>
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