import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { Topic } from "../../../../entity/topic.entity";
import TopicDeletionModal from "../TopicDeletionModal";
import { AntDesign } from '@expo/vector-icons';

interface TopicListProps {
  userId: number;
  topics: Topic[];
  setAllTopics: (topics: Topic[]) => void;
  removeTopic: (topicId: number) => void;
}

export default function TopicList({ userId, topics, removeTopic, setAllTopics }: TopicListProps) {
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
      setAllTopics(response.data);
    });
  }, []);

  return (
    <View className="bg-gray-50 mx-6 rounded-lg">
      {topics.length ? topics.map((topic, index) => (
        <View key={topic.id}>
          <Pressable
            onPress={() => navigation.navigate(({ name: 'Topic', params: { topicId: topic.id, topicName: topic.title } } as never))}
            onLongPress={() => showTopicDeletionModal(topic.id)}
            className={`flex-row justify-between items-center h-12 active:bg-gray-200
              ${index === 0 ? 'rounded-t-lg' : ''}
              ${index === topics.length - 1 ? 'rounded-b-lg' : ''}
              ${index !== topics.length - 1 ? 'border-b border-gray-200' : ''}
            `}
          >
            <Text className='text-lg ml-5'>{topic.title}</Text>
            <View className="mr-3">
              <AntDesign 
                name="right"
                size={16}
              />
            </View>
          </Pressable>
          {currentTopicIdForDeletion === topic.id &&
            <TopicDeletionModal
              topicId={topic.id}
              topicTitle={topic.title}
              visible={currentTopicIdForDeletion !== null}
              removeTopic={removeTopic}
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