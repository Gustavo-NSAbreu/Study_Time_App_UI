import { Controller, useForm } from "react-hook-form";
import { Button, Modal, SafeAreaView, Text, TextInput, View } from "react-native";
import { FlashCardService } from "../../../../integration/study-time/flashCard/flashCard.service";
import { FlashCard } from "../../../../entity/flashCard.entity";

interface FlashCardCreationDto {
  question: string;
  answer: string;
}

interface FlashCardCreationModalProps {
  subtopicId: number;
  addNewFlashCard: (flashCard: FlashCard) => void;
  visible: boolean;
  hide: () => void;
}

export default function FlashCardCreationModal({ subtopicId, visible, hide, addNewFlashCard }: FlashCardCreationModalProps) {

  const flashCardService = new FlashCardService();

  const { handleSubmit, control, reset } = useForm<FlashCardCreationDto>({
    defaultValues: {
      question: "",
      answer: ""
    }
  });

  async function onSubmit(data: FlashCardCreationDto) {
    const response = await flashCardService.createFlashCard({
      ...data,
      subtopicId,
    });
    if (!response.data.id) return;
    const newFlashCard = { id: response.data.id, question: data.question, answer: data.answer, subtopicId };
    addNewFlashCard(newFlashCard);
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
        <Text className="text-3xl p-10">Criar novo flashcard</Text>
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
              placeholder='Pergunta'
              value={value}
              className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-base mb-5'
            />
          )}
          name='question'
        />
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
              placeholder='Resposta'
              value={value}
              className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-base'
            />
          )}
          name='answer'
        />
        <View className="p-10">
          <Button title="Criar" onPress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}