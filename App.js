// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { Image } from "react-native";
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
// import { StationListScreen } from "./components/zzz-StationListScreen";
// import { StationDetailsScreen } from "./components/zzz-StationDetailsScreen";
import { HowItWorksScreen } from "./components/HowItWorksScreen";
import { AboutUsScreen } from "./components/AboutUsScreen";

import { generate, count } from "random-words";
import { HomeScreen } from "./components/HomeScreen";

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

   function LogoTitle() {
      // return (
      //    <Image
      //       source={require("./assets/bike-icon-02-purple.png")}
      //       style={{ width: 40, height: 40 }}
      //       resizeMode="contain"
      //    />
      // );
   }

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
               headerTitleStyle: {
                  fontWeight: "bold",
               },
               headerRight: (props) => <LogoTitle {...props} />,
            }}
         >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
               name="Game"
               component={GameScreen}
               options={{ title: "LETTER Shuffle" }}
            />
            {/* <Stack.Screen name="Station List" component={StationListScreen} /> */}
            {/* <Stack.Screen
               name="Station Details"
               component={StationDetailsScreen}
            /> */}
            <Stack.Screen name="How It Works" component={HowItWorksScreen} />
            <Stack.Screen name="About Us" component={AboutUsScreen} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default App;
