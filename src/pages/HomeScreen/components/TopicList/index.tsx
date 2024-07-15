import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { Topic } from "../../../../entity/topic.entity";
import TopicDeletionModal from "../TopicDeletionModal";

interface TopicListProps {
  userId: number;
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>
}

export default function TopicList({ userId, topics, setTopics }: TopicListProps) {
  const topicService = new TopicService();

  const [currentTopicIdForDeletion, setCurrentTopicIdForDeletion] = useState<number | null>(null);

  function showTopicDeletionModal(topicId: number) {
    setCurrentTopicIdForDeletion(topicId);
  }

  function hideTopicDeletionModal() {
    setCurrentTopicIdForDeletion(null);
  }

  const navigation = useNavigation();

  async function fetchTopics() {
    return await topicService.findAllTopics(userId);
  }

  useEffect(() => {
    fetchTopics().then((response) => {
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
            onLongPress={() => showTopicDeletionModal(topic.id)}
            className='flex-row justify-between border-b border-gray-500 mb-8'
          >
            <Text className='text-lg ml-12'>{topic.title}</Text>
            <Text className='text-lg mr-12'>➡️</Text>
          </Pressable>
          {currentTopicIdForDeletion === topic.id &&
            <TopicDeletionModal
              topicId={topic.id}
              topicTitle={topic.title}
              visible={currentTopicIdForDeletion !== null}
              setTopics={setTopics}
              hide={hideTopicDeletionModal}
            />
          }
        </View>
      )) : (
        <Text className='text-lg text-center font-bold'>Nenhum tópico cadastrado</Text>
      )}
    </View>
  );
}