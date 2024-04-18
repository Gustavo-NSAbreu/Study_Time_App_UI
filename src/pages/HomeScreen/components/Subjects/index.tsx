import { View, Pressable, Text } from "react-native";
import { subjectList } from "../../../../../mock/mock_data";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function Subjects() {

  const [subjects, _] = useState(subjectList);

  const navigation = useNavigation();

  return (
    <View>
      {subjects.length ? subjects.map((subject) => (
        <Pressable
          key={subject.id}
          onPress={() => navigation.navigate(({ name: 'Topic', params: { subjectId: subject.id } } as never))}
          className='flex-row justify-between border-b border-gray-500 mb-8'
        >
          <Text className='text-lg ml-12'>{subject.name}</Text>
          <Text className='text-lg mr-12'>➡️</Text>
        </Pressable>
      )):
        (
          <Text className='text-lg ml-12 font-bold'>Nenhuma matéria cadastrada</Text>
      )}
    </View>
  );
}