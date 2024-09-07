import {
   Image,
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
            <Image
               source={require("../assets/abc-block.png")}
               style={[
                  styles.segment,
                  {
                     flex: 1,
                     top: "7%",
                     width: "90%",
                     height: "100%",
                     resizeMode: "contain",
                  },
               ]}
            ></Image>

            {/* 'Button' to navigate to Game page */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 2,
                     top: "15%",
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
                           : "rgb(0,127,92)",
                        // : "#32cd32",
                        //   "#006ab7",
                     },
                     styles.startGameButton,
                  ]}
               >
                  <Text style={styles.startGameButtonLabel}>PLAY GAME</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to the Hall of Fame page */}
            <View style={[styles.segment]}>
               <Pressable
                  onPress={() => navigation.navigate("Hall of Fame")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "rgb(238,230,255)", // #579257
                     },
                     styles.otherButton,
                  ]}
               >
                  <Text style={styles.otherButtonLabel}>HALL OF FAME</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to How It Works page */}
            <View style={[styles.segment]}>
               <Pressable
                  onPress={() => navigation.navigate("How It Works")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "#ffdeb4", // ffdeb4
                     },
                     styles.otherButton,
                  ]}
               >
                  <Text style={styles.otherButtonLabel}>INSTRUCTIONS</Text>
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

   startGameButton: {
      width: 300,
      height: 120,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
   },

   startGameButtonLabel: {
      // color: "#fdfdfd",
      color: "black",
      fontFamily: "Nunito_700Bold",
      fontSize: 42,
   },

   otherButton: {
      width: 250,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
   },

   otherButtonLabel: {
      color: "black",
      fontFamily: "Nunito_700Bold",
      fontSize: 28,
   },

   // aboutMeButtonLabel: {
   //    // color: "#fdfdfd",
   //    color: "black",
   //    fontFamily: "Nunito_700Bold",
   //    fontSize: 30,
   // },
});
