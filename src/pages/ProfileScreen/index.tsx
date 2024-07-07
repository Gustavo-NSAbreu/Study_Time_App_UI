import { Button, SafeAreaView, Text, View } from "react-native";
import { clearUserInfo, getUserInfo } from "../../utils/AsyncStorage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ route }: ProfileScreenProps) {

  const [userName, setUserName] = useState(route.params.userName);  

  const navigation = useNavigation();

  useEffect(() => {
    getUserInfo().then((userInfo) => {
      if (!userInfo) return;
      setUserName(userInfo.name);
    })}, []
  );

  function handleLogout() {
    clearUserInfo();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  }

  return (
    <SafeAreaView className='h-screen w-screen bg-slate-50'>
      <View className='items-center justify-center mt-20'>
        <View className='flex-col gap-2 self-center justify-center items-center mb-12'>
          <FontAwesome name="user-circle-o" size={100} color="black" />
          <Text className='text-2xl font-bold'>{userName}</Text>
        </View>
        <Button title='Logout' onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}