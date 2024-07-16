import { Controller, useForm } from "react-hook-form";
import { Button, Modal, SafeAreaView, Text, TextInput, View } from "react-native";
import { SubtopicService } from "../../../../integration/study-time/subtopic/subtopic.service";
import { Subtopic } from "../../../../entity/subtopic.entity";

interface SubtopicCreationDto {
  title: string;
}

interface SubtopicCreationModalProps {
  topicId: number;
  visible: boolean;
  hide: () => void;
  addNewSubtopic: (subtopic: Subtopic) => void;
}

export default function SubtopicCreationModal({ topicId, addNewSubtopic, visible, hide }: SubtopicCreationModalProps) {

  const subtopicService = new SubtopicService();

  const { handleSubmit, control, reset } = useForm<SubtopicCreationDto>({
    defaultValues: {
      title: '',
    }
  });

  async function onSubmit(data: SubtopicCreationDto) {
    const response = await subtopicService.createSubtopic({...data, topicId});
    if (!response.data.id) return;
    const newSubtopic = { id: response.data.id, title: data.title, topicId };
    addNewSubtopic(newSubtopic);
    reset();
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
        <Text className="text-3xl p-10">Criar novo subtópico</Text>
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