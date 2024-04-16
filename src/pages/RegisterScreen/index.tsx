import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, SafeAreaView } from "react-native";

export default function RegisterScreen() {
  return (
    <SafeAreaView>
      <View className='flex-1 items-center h-full pt-[170px] bg-gray-50'>
        <View>
          <Text className='text-gray-950 text-4xl justify-self-start'>Time to Study</Text>
          <Text className='text-gray-950'>Acesse usando e-mail e senha</Text>
        </View>
        <View className='w-72 justify-center items-center'>
          <View className='w-72 justify-center items-center'>
            <Text className='text-gray-950 self-start'>E-mail</Text>
            <TextInput placeholder='E-mail' className='border border-gray-400 rounded-sm w-72 p-1' />
          </View>
          <View className='w-72 justify-center items-center'>
            <Text className='text-gray-950 self-start'>Senha</Text>
            <TextInput placeholder='Senha' className='border border-gray-400 rounded-sm w-72 p-1' />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}