import { View, Pressable, Text } from "react-native";
import { topicList } from "../../../../../mock/mock_data";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

interface TopicProps {
  subjectId: number;
}

export default function Topics({ subjectId }: TopicProps) {

  const [filteredTopics, _] = useState(topicList.filter((topic) => topic.subjectId === subjectId));

  const navigation = useNavigation();

  return (
    <View>
      {filteredTopics?.map((topic) => (
        <Pressable
          key={topic.id}
          onPress={() => navigation.navigate(({ name: 'Flashcards', params: { topicId: topic.id } } as never))}
          className='flex-row justify-between border-b border-gray-500 mb-8'
        >
          <Text className='text-lg ml-12'>{topic.name}</Text>
          <Text className='text-lg mr-12'>➡️</Text>
        </Pressable>
      ))}
    </View>
  );
}