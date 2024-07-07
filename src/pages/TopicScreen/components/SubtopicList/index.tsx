import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Subtopic } from "../../../../entity/subtopic.entity";
import SubtopicDeletionModal from "../SubtopicDeletionModal";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";

interface SubtopicsProps {
  topicId: number;
  setSubtopics: (subtopics: any) => void;
  subtopics: Subtopic[];
}

export default function Subtopics({ topicId, subtopics, setSubtopics }: SubtopicsProps) {

  const subtopicService = new SubtopicService();

  const [isSubTopicDeletionModalVisible, setIsSubTopicDeletionModalVisible] = useState(false);

  function showsubTopicDeletionModal() { setIsSubTopicDeletionModalVisible(true); }
  function hideSubtopicDeletionModal() { setIsSubTopicDeletionModalVisible(false); }

  const navigation = useNavigation();

  async function fetchSubtopcis() {
    return await subtopicService.findAllSubtopics(topicId);
  }

  useEffect(() => {
    fetchSubtopcis().then((response) => {
      if (!response.data) return;
      setSubtopics(response.data);
    });
  }, []);

  return (
    <View>
      {subtopics.map((subtopic) => (
        <View key={subtopic.id}>
          <Pressable
            onPress={() => navigation.navigate({ name: 'Flashcard', params: { subtopicId: subtopic.id, subtopicName: subtopic.title } } as never)}
            onLongPress={showsubTopicDeletionModal}
            className='flex-row justify-between border-b border-gray-500 mb-8'
          >
            <Text className='text-lg ml-12'>{subtopic.title}</Text>
            <Text className='text-lg mr-12'>➡️</Text>
          </Pressable>
          <SubtopicDeletionModal
            subtopicId={subtopic.id}
            visible={isSubTopicDeletionModalVisible}
            setSubtopics={setSubtopics}
            hide={hideSubtopicDeletionModal}
            subtopicTitle={subtopic.title}
          />
        </View>
      ))}
    </View>
  );
}