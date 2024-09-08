import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as SplashScreen from "expo-splash-screen";

// import some Google fonts
import {
   useFonts,
   Nunito_400Regular,
   Nunito_700Bold,
} from "@expo-google-fonts/nunito";

import { GameScreen } from "./components/GameScreen";
import { HallOfFameScreen } from "./components/HallOfFameScreen";
import { HomeScreen } from "./components/HomeScreen";
import { HowToPlayScreen } from "./components/HowToPlayScreen";

import { generate, count } from "random-words";

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function App() {
   let [fontsLoaded] = useFonts({
      Nunito_400Regular,
      Nunito_700Bold,
   });

   if (!fontsLoaded) {
      return null;
   }

   console.log("Testing123");
   console.log(generate({ minLength: 4, maxLength: 4 }));

   const Stack = createNativeStackNavigator();

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
               headerShown: false,
            }}
         >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
               name="Game"
               component={GameScreen}
               options={{ title: "LETTER Shuffle" }}
            />
            <Stack.Screen
               name="HOW TO PLAY"
               component={HowToPlayScreen}
               options={{ headerShown: true }}
            />
            <Stack.Screen
               name="HALL OF FAME"
               component={HallOfFameScreen}
               options={{ headerShown: true }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;
