import { Text, View, SafeAreaView, Pressable, ScrollView, TouchableOpacity } from "react-native";

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import TopicCreationModal from "./components/TopicCreationModal";
import { getUserInfo } from "../../utils/AsyncStorage";
import TopicList from "./components/TopicList";
import { Topic } from "../../entity/topic.entity";

export default function HomeScreen() {

  const [isTopicCreationModalVisible, setIsTopicCreationModalVisible] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserInfo().then((user) => {
      if (!user) return;
      console.log(user);
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
    <SafeAreaView className="items-center w-screen h-fit">
      <ScrollView className="w-full mt-20">
        <View className="w-full ">
          <View className="flex-row gap-52 self-center justify-center items-center mb-12">
            <Text className="text-2xl font-bold">Tópicos</Text>
            <Pressable
              onPress={showTopicCreationModal}
            >
              <AntDesign name="pluscircleo" size={20} color="#3b82f6" />
            </Pressable>
          </View>

          {userId > 0 ? <TopicList userId={userId} topics={topics} setTopics={setTopics} /> : null}
        </View>
        <TopicCreationModal
          userId={userId}
          visible={isTopicCreationModalVisible}
          setTopics={setTopics}
          hide={hideTopicCreationModal}
        />

      </ScrollView>
    </SafeAreaView>
  );
}