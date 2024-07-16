import { Button, Modal, Text, View } from "react-native";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { SafeAreaView } from "react-native-safe-area-context";
import { Topic } from "../../../../entity/topic.entity";

interface TopicDeletionModalProps {
  topicId: number;
  topicTitle: string;
  removeTopic: (topicId: number) => void;
  visible: boolean;
  hide: () => void;
}

export default function TopicDeletionModal({ topicId, topicTitle, removeTopic, visible, hide }: TopicDeletionModalProps) {

  const topicService = new TopicService();

  async function handleDelete() {
    const response = await topicService.deleteTopic(topicId);
    if (!response.data) return;
    removeTopic(response.data.id);
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
        <Text className="mb-11 mx-8 text-2xl text-center">Deseja apagar o tópico {topicTitle}?</Text>
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