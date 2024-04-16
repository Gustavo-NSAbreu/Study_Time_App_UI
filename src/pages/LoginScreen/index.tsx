import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, View, SafeAreaView, Button } from "react-native";

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: any ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className='flex-1 items-center h-full pt-[170px] bg-gray-50'>
      <View>
        <Text className='text-gray-950 text-4xl justify-self-start'>Time to Study</Text>
        <Text className='text-gray-950'>Acesse usando e-mail e senha</Text>
      </View>
      <View className='w-72 justify-center items-center gap-2'>
        <View className='w-72 justify-center items-center'>
          <TextInput
            autoFocus={true}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder='E-mail'
            value={email}
            className='border border-gray-400 rounded-md w-72 p-1'
          />
        </View>
        <View className='w-72 justify-center items-center'>
          <TextInput
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder='Senha'
            value={password}
            className='border border-gray-400 rounded-md w-72 p-1'
          />
        </View>
      </View>
      <Button title='Entrar' onPress={() => navigation.navigate('Home')} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}