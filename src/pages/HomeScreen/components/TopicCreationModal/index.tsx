import { Controller, useForm } from "react-hook-form";
import { Button, Modal, SafeAreaView, Text, TextInput, View } from "react-native";
import { TopicService } from "../../../../integration/study-time/topic/topic.service";
import { Topic } from "../../../../entity/topic.entity";

interface TopicCreationDto {
  title: string;
}

interface TopicCreationModalProps {
  userId: number;
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>
  visible: boolean;
  hide: () => void;
}

export default function TopicCreationModal({ userId, setTopics, visible, hide }: TopicCreationModalProps) {

  const topicService = new TopicService();

  const { handleSubmit, control } = useForm<TopicCreationDto>({
    defaultValues: {
      title: '',
    }
  });

  async function onSubmit(data: TopicCreationDto) {
    const response = await topicService.createTopic({...data, userId});
    if (!response.data.id) return;
    console.log(response.data);
    setTopics((topics: Topic[]) => [...topics, {id: response.data.id, title: data.title, userId: userId}]);
    hide();
  }

  return (
    <Modal 
      visible={visible}
      animationType="slide"
      onRequestClose={hide}
    >
      <SafeAreaView className="items-center w-screen h-fit">
        <View
          className="self-end p-4"
        >
          <Button title="Fechar" onPress={hide} />
        </View>
        <Text className="text-3xl p-10">Criar novo tópico</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({field: {onChange, value}}) => (
            <TextInput
              autoCapitalize="sentences"
              autoComplete="name"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={onChange}
              placeholder='Nome'
              value={value}
              className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
            />
          )}
          name='title'
        />
        <View className="p-10">
          <Button title="Criar" onPress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}