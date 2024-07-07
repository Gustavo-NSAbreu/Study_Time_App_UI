import { Button, Modal, Text, View } from "react-native";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { SafeAreaView } from "react-native-safe-area-context";

interface TopicDeletionModalProps {
  topicId: number;
  topicTitle: string;
  setTopics: (topics: any) => void;
  visible: boolean;
  hide: () => void;
}

export default function TopicDeletionModal({ topicId, topicTitle, setTopics, visible, hide }: TopicDeletionModalProps) {

  const topicService = new TopicService();

  async function handleDelete() {
    const response = await topicService.deleteTopic(topicId);
    if (!response.data) return;
    setTopics((topics: any) => topics.filter((topic: any) => topic.id !== topicId));
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
        <Text className="mb-11 text-2xl">Deseja apagar o tópico {topicTitle}?</Text>
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