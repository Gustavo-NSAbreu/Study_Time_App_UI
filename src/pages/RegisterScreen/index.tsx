import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TextInput, View, SafeAreaView, Button, Pressable } from "react-native";

export default function RegisterScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  return (
    <SafeAreaView className='flex-1 h-full pt-[170px] bg-slate-50'>
      <View className='items-start-start pl-16'>
        <Text className='text-slate-950 text-2xl mt-4 mb-8'>Cadastre-se</Text>
      </View>
      <View className='w-72 justify-center items-center self-center gap-5 mb-4'>
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
            autoComplete="new-password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder='Senha'
            value={password}
            className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
          />
        </View>
      </View>
      <Button title='Cadastrar' onPress={() => navigation.navigate("Home" as never)} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}