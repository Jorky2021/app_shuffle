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
                           : "rgb(255,69,0)",
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
                  onPress={() => navigation.navigate("HALL OF FAME")}
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

            {/* 'Button' to navigate to How to play page */}
            <View style={[styles.segment]}>
               <Pressable
                  onPress={() => navigation.navigate("HOW TO PLAY")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "rgb(255,228,181)",
                     },
                     styles.otherButton,
                  ]}
               >
                  <Text style={styles.otherButtonLabel}>HOW TO PLAY</Text>
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
      width: 320,
      height: 120,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
   },

   startGameButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 42,
   },

   otherButton: {
      width: 280,
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
});
