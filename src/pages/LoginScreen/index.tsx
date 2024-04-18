import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, View, SafeAreaView, Button, Pressable } from "react-native";

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1 items-center h-screen bg-gray-50'>
      <View className='items-center mb-10'>
        <Text className='text-slate-950 text-4xl mb-4 pt-10 w-22'>Time to Study</Text>
        <Text className='text-slate-950'>Acesse usando e-mail e senha</Text>
      </View>
      <View className='w-72 justify-center items-center gap-3 mb-4'>
        <View className='w-72 justify-center items-center'>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder='E-mail'
            value={email}
            className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
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
            className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
          />
        </View>
      </View>

      <Button title='Entrar' onPress={() => navigation.navigate("Home" as never)} />

      <Pressable
        onPress={() => navigation.navigate("Register" as never)}
        className='absolute bottom-0 w-40 pb-10'
      >
        <Text className="text-blue-500 text-center">Ainda não tem conta? Registre-se aqui</Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}