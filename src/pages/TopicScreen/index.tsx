import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView, Pressable, ScrollView } from "react-native";
import { RootStackParamList } from "../../Router";
import { AntDesign } from '@expo/vector-icons';
import { useLayoutEffect, useState } from "react";
import { Subtopic } from "../../entity/subtopic.entity";
import SubtopicList from "./components/SubtopicList";
import SubtopicCreationModal from "./components/SubtopicCreationModal";

type subTopicScreenProps = NativeStackScreenProps<RootStackParamList, 'Topic'>;

export default function TopicScreen({ route, navigation }: subTopicScreenProps) {
  
  const [topicId, _] = useState(route.params.topicId);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [isSubtopicCreationModalVisible, setIssubTopicCreationModalVisible] = useState(false);

  function addNewSubtopic(subtopic: Subtopic) {
    setSubtopics((subtopics: Subtopic[]) => [...subtopics, subtopic]);
  }

  function removeSubtopic(subtopicId: number) {
    setSubtopics((subtopics: Subtopic[]) => subtopics.filter(subtopic => subtopic.id !== subtopicId));
  }

  function setAllSubtopics(subtopics: Subtopic[]) {
    setSubtopics(subtopics);
  }

  function showSubtopicCreationModal() { setIssubTopicCreationModalVisible(true); }
  function hideSubtopicCreationModal() { setIssubTopicCreationModalVisible(false); }

  useLayoutEffect(() => {
    console.log("Subtopics length:", subtopics.length);
    navigation.setOptions({
      title: route.params.topicName,
    });
    }, [navigation]
  );

  return (
    <SafeAreaView className="items-center w-screen h-fit">
      <ScrollView className="w-full">
        <View className="w-full mt-20">
          <View className="flex-row gap-52 self-center justify-center items-center mb-12">
            <Text className="text-2xl font-bold">Subtópicos</Text>
            <Pressable
              onPress={showSubtopicCreationModal}
            >
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>
          <SubtopicList 
            topicId={topicId}
            subtopics={subtopics}
            setSubtopics={setSubtopics}
          />
        </View>
        <SubtopicCreationModal
          topicId={topicId}
          visible={isSubtopicCreationModalVisible}
          setSubtopics={setSubtopics}
          hide={hideSubtopicCreationModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}