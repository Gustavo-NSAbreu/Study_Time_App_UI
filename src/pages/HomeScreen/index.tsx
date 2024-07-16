import { Text, View, SafeAreaView, Pressable, ScrollView, TouchableOpacity } from "react-native";

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import TopicCreationModal from "./components/TopicCreationModal";
import { getUserInfo } from "../../utils/AsyncStorage";
import TopicList from "./components/TopicList";
import { Topic } from "../../entity/topic.entity";
import { TopicService } from "../../integration/study-time/topic/topic.service";
import { TimerContext } from "../../contexts/timer.context";

export default function HomeScreen() {

  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [isTopicCreationModalVisible, setIsTopicCreationModalVisible] = useState(false);
  
  const topicService = new TopicService();
  
  async function getAllTopics() {
    const allTopics = await topicService.findAllTopics(userId);
    return allTopics;
  }

  const { stopTimer } = useContext(TimerContext);
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTriggerRerender(!triggerRerender);
      getAllTopics().then((response) => setTopics(response.data));
      stopTimer();
    }
  }, [isFocused]);



  function addNewTopic(topic: Topic) {
    setTopics((topics: Topic[]) => [...topics, topic]);
  }

  function setAllTopics(topics: Topic[]) {
    setTopics(topics);
  }

  function removeTopic(topicId: number) {
    setTopics((topics: Topic[]) => topics.filter(topic => topic.id !== topicId));
  }


  useEffect(() => {
    getUserInfo().then((user) => {
      if (!user) return;
      setUserId(user.id);
      setUserName(user.name);
    });
  }, []);

  function showTopicCreationModal() { setIsTopicCreationModalVisible(true); }
  function hideTopicCreationModal() { setIsTopicCreationModalVisible(false); }


  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate({ name: 'Profile', params: { userName } } as never)}>
          <FontAwesome name="user-circle-o" size={30} color="black" />
        </TouchableOpacity>
    )});
  }, [navigation]);

  return (
    <SafeAreaView className="items-center w-screen h-full">
      <ScrollView className="w-full h-full mt-20">
        <View className="w-full">
          <View className="flex-row gap-52 self-center justify-center items-center mb-12">
            <Text className="text-2xl font-bold">Tópicos</Text>
            <Pressable
              onPress={showTopicCreationModal}
            >
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>
          {userId ? 
            <TopicList
              userId={userId}
              topics={topics}
              removeTopic={removeTopic}
              setAllTopics={setAllTopics}
            /> : null
          }
        </View>
        <TopicCreationModal
          userId={userId}
          visible={isTopicCreationModalVisible}
          addNewTopic={addNewTopic}
          hide={hideTopicCreationModal}
        />
      </ScrollView>
    </SafeAreaView>
  );
}