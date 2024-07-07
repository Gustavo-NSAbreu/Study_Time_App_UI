import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import RegisterScreen from "./pages/RegisterScreen";
import TopicScreen from "./pages/TopicScreen";
import FlashcardScreen from "./pages/FlashcardScreen";
import ProfileScreen from "./pages/ProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: { userName: string};
  Home: undefined;
  Topic: { topicId: number, topicName: string};
  Flashcard: { subtopicId: number, subtopicName: string};
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Register" component={RegisterScreen} options={{ title: '' }} />
        <RootStack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
        <RootStack.Screen name="Profile" component={ProfileScreen} options={{ title: '' }} />
        <RootStack.Screen name="Topic" component={TopicScreen} options={{ title: '' }} />
        <RootStack.Screen name="Flashcard" component={FlashcardScreen} options={{ title: '' }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}