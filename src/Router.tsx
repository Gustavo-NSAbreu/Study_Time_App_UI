import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import RegisterScreen from "./pages/RegisterScreen";
import TopicScreen from "./pages/TopicScreen";
import FlashcardScreen from "./pages/FashcardScreen";


const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
        <Stack.Screen name="Topic" component={TopicScreen} options={{ title: '' }} />
        <Stack.Screen name="Flashcard" component={FlashcardScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}