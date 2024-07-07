import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { Topic } from "../../../../entity/topic.entity";
import TopicDeletionModal from "../TopicDeletionModal";

interface TopicListProps {
  userId: number;
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
}

export default function TopicList({ userId, topics, setTopics }: TopicListProps) {

  const topicService = new TopicService();

  const [isTopicDeletionModalVisible, setIsTopicDeletionVisible] = useState(false);

  function showTopicDeletionModal() { setIsTopicDeletionVisible(true); }
  function hideTopicDeletionModal() { setIsTopicDeletionVisible(false); }

  const navigation = useNavigation();

  async function fetchTopcis() {
    return await topicService.findAllTopics(userId);
  }

  useEffect(() => {
    fetchTopcis().then((response) => {
      if (!response.data) return;
      setTopics(response.data);
    });
  }, []);

  return (
    <View>
      {topics.length ? topics.map((topic) => (
        <View key={topic.id}>
          <Pressable
            onPress={() => navigation.navigate(({ name: 'Topic', params: { topicId: topic.id, topicName: topic.title } } as never))}
            onLongPress={showTopicDeletionModal}
            className='flex-row justify-between border-b border-gray-500 mb-8'
          >
            <Text className='text-lg ml-12'>{topic.title}</Text>
            <Text className='text-lg mr-12'>➡️</Text>
          </Pressable>
          <TopicDeletionModal
            topicId={topic.id}
            topicTitle={topic.title}
            visible={isTopicDeletionModalVisible}
            setTopics={setTopics}
            hide={hideTopicDeletionModal}
          />
        </View>
      )):
        (
          <Text className='text-lg text-center font-bold'>Nenhum tópíco cadastrado</Text>
      )}
    </View>
  );
}