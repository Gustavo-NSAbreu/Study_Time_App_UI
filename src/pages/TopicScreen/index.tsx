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
  
  const [isSubtopicCreationModalVisible, setIssubTopicCreationModalVisible] = useState(false);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [topicId, _] = useState(route.params.topicId);

  function showSubtopicCreationModal() { setIssubTopicCreationModalVisible(true); }
  function hideSubtopicCreationModal() { setIssubTopicCreationModalVisible(false); }

  useLayoutEffect(() => {
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
            <Text className="text-2xl font-bold">Subtopicos</Text>
            <Pressable
              onPress={showSubtopicCreationModal}
            >
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>
          {topicId > 0 ? subtopics.length ? <SubtopicList topicId={topicId}  subtopics={subtopics} setSubtopics={setSubtopics} /> : <Text className="text-lg font-bold text-center">Nenhum subtópico cadastrado</Text> : null}
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