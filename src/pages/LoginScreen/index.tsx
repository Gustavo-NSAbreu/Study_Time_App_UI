import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View, SafeAreaView, Button, Pressable } from "react-native";
import { LoginDto, UserService } from "../../integration/study-time/user/user.service";
import { setUserInfo } from "../../utils/AsyncStorage";

export default function LoginScreen() {

  const userService = new UserService();

  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<LoginDto>({
    defaultValues: {
      email: '',
      password: '' 
    }
  })

  async function onSubmit(loginData: LoginDto) {
    const response = await userService.login(loginData);
    if (response?.status !== 200) {
      console.log(response);
      return;
    }
    const userInfo = {id: response.data.id, name: response.data.name}
    setUserInfo(userInfo);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' as never }],
    });
  }

  return (
    <SafeAreaView className='flex-1 items-center h-screen bg-gray-50'>
      <View className='items-center mb-10'>
        <Text className='text-slate-950 text-4xl mb-4 pt-10 w-22'>Time to Study</Text>
        <Text className='text-slate-950'>Acesse usando e-mail e senha</Text>
      </View>
      <View className='w-72 justify-center items-center gap-3 mb-4'>
        <View className='w-72 justify-center items-center'>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({field: {onChange, value}}) => (
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={onChange}
                placeholder='E-mail'
                value={value}
                className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
              />
            )}
            name='email'
          />
        </View>
        <View className='w-72 justify-center items-center'>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({field: {onChange, value}}) => (
              <TextInput
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={onChange}
                placeholder='Senha'
                value={value}
                className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
              />
            )}
            name='password'
          />
        </View>
      </View>

      <Button title='Entrar' onPress={handleSubmit(onSubmit)} />

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