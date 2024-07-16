import { View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Subtopic } from "../../../../entity/subtopic.entity";
import SubtopicDeletionModal from "../SubtopicDeletionModal";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";
import { AntDesign } from '@expo/vector-icons';


interface SubtopicListProps {
  topicId: number;
  subtopics: Subtopic[];
  removeSubtopic: (subtopicId: number) => void;
  setAllSubtopics: (subtopics: Subtopic[]) => void;
}

export default function SubtopicList({ topicId, subtopics, setAllSubtopics, removeSubtopic }: SubtopicListProps) {
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
    fetchSubtopics().then((response) => {
      if (!response.data) return;
      setAllSubtopics(response.data);
    }).catch(error => {
      console.error("Failed to fetch subtopics:", error);
    });
  }, []);

  return (
    <View className="bg-gray-50 mx-6 rounded-lg">
      {subtopics.length ? subtopics.map((subtopic, index) => (
        <View key={subtopic.id}>
          <Pressable
            onPress={() => navigation.navigate({ name: 'Flashcard', params: { subtopicId: subtopic.id, subtopicName: subtopic.title } } as never)}
            onLongPress={() => showSubTopicDeletionModal(subtopic.id)}
            className={`flex-row justify-between items-center h-12 active:bg-gray-200 ${
              index === 0 ? 'rounded-t-lg' : ''} ${
              index === subtopics.length - 1 ? 'rounded-b-lg' : ''} ${
              index !== subtopics.length - 1 ? 'border-b border-gray-200' : ''}`}
          >
            <Text className='text-lg ml-5'>{subtopic.title}</Text>
            <View className="mr-3">
              <AntDesign 
                name="right"
                size={16}
              />
            </View>
          </Pressable>
          {currentSubtopicIdForDeletion === subtopic.id &&
            <SubtopicDeletionModal
              subtopicId={subtopic.id}
              visible={currentSubtopicIdForDeletion !== null}
              removeSubtopic={removeSubtopic}
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