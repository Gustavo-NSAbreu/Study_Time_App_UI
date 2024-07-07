import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View, SafeAreaView, Button } from "react-native";
import { CreateUserDto, UserService } from "../../integration/study-time/user/user.service";
import { setUserInfo } from "../../utils/AsyncStorage";

export default function RegisterScreen() {

  const userService = new UserService();

  const { control, handleSubmit } = useForm<CreateUserDto>({
    defaultValues: {
      name: '',
      email: '',
      password: '' 
    }
  })

  const navigation = useNavigation();

  async function onSubmit(data: CreateUserDto) {
    const response = await userService.createUser(data);
    if (response?.status !== 201) {
      console.log('Error');
      return;
    }
    setUserInfo({id: response.data.id, name: data.name});
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' as never }],
    });
  }

  return (
    <SafeAreaView className='flex-1 h-screen pt-[170px] bg-slate-50'>
      <View className='items-start-start pl-16'>
        <Text className='text-slate-950 text-2xl mt-4 mb-8'>Cadastre-se</Text>
      </View>
      <View className='w-72 justify-center items-center self-center gap-5 mb-4'>
        <View className='w-72 justify-center items-center'>
          <Controller 
            control={control}
            rules={{ required: true }}
            render={({field: {onChange, value}}) => (
              <TextInput
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect={false}
                keyboardType="default"
                onChangeText={onChange}
                placeholder='Nome'
                value={value}
                className='border border-slate-600 rounded-sm w-72 h-12 p-2 text-[16px]'
              />
            )}
              name='name'
          />
        </View>
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
                autoComplete="new-password"
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
      <Button title='Cadastrar' onPress={handleSubmit(onSubmit)} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}