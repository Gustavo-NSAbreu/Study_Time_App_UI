import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View, SafeAreaView, Pressable, ScrollView, Button } from "react-native";
import { RootStackParamList } from "../../Router";
import { AntDesign } from '@expo/vector-icons';
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Subtopic } from "../../entity/subtopic.entity";
import SubtopicList from "./components/SubtopicList";
import SubtopicCreationModal from "./components/SubtopicCreationModal";
import { TopicService, UpdateTopicDto } from "../../integration/study-time/topic/topic.service";
import { getUserInfo, UserInfo } from "../../utils/AsyncStorage";
import { TimerContext } from "../../contexts/timer.context";

type subTopicScreenProps = NativeStackScreenProps<RootStackParamList, 'Topic'>;

export default function TopicScreen({ route, navigation }: subTopicScreenProps) {

  const topicService = new TopicService();
  
  const [user, setUser] = useState<UserInfo>({} as UserInfo);
  const [topicId, _] = useState(route.params.topicId);
  const [topicTitle, __] = useState(route.params.topicName);
  const [subtopics, setSubtopics] = useState<Subtopic[]>([]);
  const [isSubtopicCreationModalVisible, setIssubTopicCreationModalVisible] = useState(false);

  const { formatTime, timer, isTimerRunning, runTimer, stopTimer } = useContext(TimerContext);

  function addNewSubtopic(subtopic: Subtopic) {
    setSubtopics((subtopics: Subtopic[]) => [...subtopics, subtopic]);
  }

  function setAllSubtopics(subtopics: Subtopic[]) {
    setSubtopics(subtopics);
  }

  function removeSubtopic(subtopicId: number) {
    setSubtopics((subtopics: Subtopic[]) => subtopics.filter(subtopic => subtopic.id !== subtopicId));
  }

  async function handleStudyFinalization() {
    const updatedTopic: UpdateTopicDto = { id: topicId, lastDateStudy: new Date(), title: topicTitle, userId: user.id};
    await topicService.updateTopic(updatedTopic);
    stopTimer();
    navigation.navigate('Home');
  }

  async function getUser() {
    const userInfo = await getUserInfo();
    setUser(userInfo!);
    return userInfo;
  }

  function showSubtopicCreationModal() { setIssubTopicCreationModalVisible(true); }
  function hideSubtopicCreationModal() { setIssubTopicCreationModalVisible(false); }

  
  useEffect(() => {
    let interval = 0;
    if (isTimerRunning) {
      interval = setInterval(() => {
        runTimer();
        formatTime();
      }, 1);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: topicTitle,
    });
    getUser().then((data) => console.log('User:', data))
  }, [navigation]);

  return (
    <SafeAreaView className="items-center w-screen h-fit">
      <ScrollView className="w-full">
        <View className="w-full mt-20 mb-12">
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
            removeSubtopic={removeSubtopic}
            setAllSubtopics={setAllSubtopics}
          />
        </View>
        <Button
          title="Finalizar estudo"
          onPress={handleStudyFinalization}
        />
        <SubtopicCreationModal
          topicId={topicId}
          visible={isSubtopicCreationModalVisible}
          addNewSubtopic={addNewSubtopic}
          hide={hideSubtopicCreationModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}