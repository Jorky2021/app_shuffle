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
            <View style={[styles.segment, { flex: 6, paddingTop: 110 }]}>
               <Pressable
                  onPress={() => navigation.navigate("Game")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "#006ab7",
                     },
                     styles.button,
                     { borderColor: "#006699" },
                  ]}
               >
                  <Text style={styles.findStationsButtonLabel}>Start Game</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to How It Works page */}
            <View style={[styles.segment, { flex: 1 }]}>
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
                  ]}
               >
                  <Text style={styles.howItWorksButtonLabel}>How It Works</Text>
               </Pressable>
            </View>

            {/* 'Button' to navigate to About Us page */}
            <View
               style={[styles.segment, { flex: 3, justifyContent: "center" }]}
            >
               <Pressable
                  onPress={() => navigation.navigate("About Us")}
                  unstable_pressDelay={100}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(210, 230, 255)"
                           : "#579257", // #579257
                     },
                     styles.button,
                  ]}
               >
                  <Text style={styles.aboutMeButtonLabel}>About Us</Text>
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

   findStationsButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
   },
   howItWorksButtonLabel: {
      color: "black",
      fontFamily: "Nunito_400Regular",
      fontSize: 22,
   },
   aboutMeButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_400Regular",
      fontSize: 22,
   },
});
