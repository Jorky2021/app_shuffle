import {
   ImageBackground,
   Pressable,
   StyleSheet,
   Text,
   View,
} from "react-native";

export function HomeScreen({ navigation }) {
   return (
      <View style={styles.container}>
         {/* Themed background image */}
         <ImageBackground
            source={require("../assets/pexels-jplenio-1103970-half-size.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
         >
            {/* 'Button' to navigate to Game page */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 2,
                     top: "20%",
                     // justifyContent: "center",

                     // backgroundColor: "red",
                  },
               ]}
            >
               <Pressable
                  onPress={() => navigation.navigate("Game")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "#32cd32",
                        // : "#006ab7",
                     },
                     styles.button,
                     { height: 125, borderColor: "#006699" },
                  ]}
               >
                  <Text style={styles.startGameButtonLabel}>Start Game</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to the Hall of Fame page */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 1,
                     backgroundColor: "yellow",
                  },
               ]}
            >
               <Pressable
                  onPress={() => navigation.navigate("Hall of Fame")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "rgb(238,230,255)", // #579257
                     },
                     styles.button,
                     { height: 100 },
                  ]}
               >
                  <Text style={styles.aboutMeButtonLabel}>Hall of Fame</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to How It Works page */}
            <View
               style={[styles.segment, { flex: 1, backgroundColor: "green" }]}
            >
               <Pressable
                  onPress={() => navigation.navigate("How It Works")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "#ffdeb4", // ffdeb4
                     },
                     styles.button,
                     { height: 100 },
                  ]}
               >
                  <Text style={styles.howItWorksButtonLabel}>How It Works</Text>
               </Pressable>
            </View>
         </ImageBackground>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
   },
   segment: {
      flex: 1,
      width: "100%",
      alignItems: "center",
   },
   button: {
      width: 300,
      height: 75,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
   },

   startGameButtonLabel: {
      // color: "#fdfdfd",
      color: "black",
      fontFamily: "Nunito_700Bold",
      fontSize: 40,
   },
   howItWorksButtonLabel: {
      color: "black",
      fontFamily: "Nunito_400Regular",
      fontSize: 30,
   },
   aboutMeButtonLabel: {
      // color: "#fdfdfd",
      color: "black",
      fontFamily: "Nunito_400Regular",
      fontSize: 30,
   },
});
