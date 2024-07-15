import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Subtopic } from "../../../../entity/subtopic.entity";
import SubtopicDeletionModal from "../SubtopicDeletionModal";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";

interface SubtopicListProps {
  topicId: number;
  setSubtopics: React.Dispatch<React.SetStateAction<Subtopic[]>>
  subtopics: Subtopic[];
}

export default function SubtopicList({ topicId, subtopics, setSubtopics }: SubtopicListProps) {
  const subtopicService = new SubtopicService();

  const [currentSubtopicIdForDeletion, setCurrentSubtopicIdForDeletion] = useState<number | null>(null);

  function showSubTopicDeletionModal(subtopicId: number) {
    setCurrentSubtopicIdForDeletion(subtopicId);
  }

  function hideSubtopicDeletionModal() {
    setCurrentSubtopicIdForDeletion(null);
  }

  const navigation = useNavigation();

  async function fetchSubtopics() {
    return await subtopicService.findAllSubtopics(topicId);
  }

  useEffect(() => {
    console.log("Fetching subtopics for topic", topicId);
    fetchSubtopics().then((response) => {
      if (!response.data) return;
      setSubtopics(response.data);
    }).catch(error => {
      console.error("Failed to fetch subtopics:", error);
    });
  }, []);

  return (
    <View>
      {subtopics.length ? subtopics.map((subtopic) => (
        <View key={subtopic.id}>
          <Pressable
            onPress={() => navigation.navigate({ name: 'Flashcard', params: { subtopicId: subtopic.id, subtopicName: subtopic.title } } as never)}
            onLongPress={() => showSubTopicDeletionModal(subtopic.id)} // Pass subtopic ID here
            className='flex-row justify-between border-b border-gray-500 mb-8'
          >
            <Text className='text-lg ml-12'>{subtopic.title}</Text>
            <Text className='text-lg mr-12'>➡️</Text>
          </Pressable>
          {currentSubtopicIdForDeletion === subtopic.id && // Check if this subtopic's modal should be shown
            <SubtopicDeletionModal
              subtopicId={subtopic.id}
              visible={currentSubtopicIdForDeletion !== null}
              setSubtopics={setSubtopics}
              hide={hideSubtopicDeletionModal}
              subtopicTitle={subtopic.title}
            />
          }
        </View>
      )) : (
        <Text className='text-lg font-bold text-center'>Nenhum subtópico cadastrado</Text>
      )}
    </View>
  );
}