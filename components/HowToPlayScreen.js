import {
   ImageBackground,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";

export function HowToPlayScreen({ navigation }) {
   return (
      <SafeAreaView>
         <ScrollView style={{ height: "100%" }}>
            <View style={styles.container}>
               <ImageBackground
                  source={require("../assets/pexels-scottwebb-2824173-half-size.jpg")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
               >
                  {/* Creating a 'grid' of paragraphs with headers */}
                  <View>
                     <Text style={styles.title}>HOW TO PLAY</Text>
                  </View>

                  <View style={styles.contentContainer}>
                     <View>
                        <Text style={styles.content}>
                           The goal of this game is to guess and find a specific
                           word. All letters of this word are presented in the
                           centre of the screen. Every letter must be used only
                           once.
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.content}>
                           Tap the letters and they will appear in the top part
                           of the screen. Click on ENTER to submit your word.
                           Click on the REFRESH button to change the order of
                           the letters on the keyboard. You can also enter other
                           words that are at least 3 letters long.
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.content}>
                           The time to find the target word is limited. When the
                           time is up, the game is over and you can start a new
                           game. If you find the correct word, you proceed to
                           the next level.
                        </Text>
                     </View>
                  </View>

                  <View>
                     <Text style={styles.title}>HOW TO SCORE POINTS</Text>
                  </View>

                  <View style={styles.contentContainer}>
                     <View>
                        <Text style={styles.content}>
                           If you find the correct word, you will score an
                           amount twice the length of the word. For example,
                           correctly guessing the word HOUSE will score 10
                           points.
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.content}>
                           If you find any other word, you will score an amount
                           equal to the length of this word. For example,
                           finding TEAM will earn you 4 points.
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.content}>
                           Words shorter than length 2 don't earn points. Words
                           entered more than once don't earn points.
                        </Text>
                     </View>
                  </View>

                  <View>
                     <Text style={styles.title}>STRATEGIES</Text>
                  </View>

                  <View style={styles.contentContainer}>
                     <View>
                        <Text style={styles.content}>
                           If you have enough time left, you can try and score
                           points by entering words that (you think) are not the
                           target word. Make sure not to run out of time to
                           avoid a game over.
                        </Text>
                     </View>
                     <View>
                        <Text style={styles.content}>
                           Entering the target word will propel you to the next
                           level. After every three levels there will be an
                           extra letter. The starting number of letters is 4.
                           From level 4 the number of letters will be 5, and so
                           on.
                        </Text>
                     </View>
                  </View>
                  <View style={styles.title} />
               </ImageBackground>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      // backgroundColor: '#ffdeb4',
      alignItems: "left",
      justifyContent: "center",
   },
   title: {
      // backgroundColor: "#faebd7",
      backgroundColor: " rgb(8,69,126)",
      // color: "black",
      color: "white",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
   },
   contentContainer: {
      padding: 5,
      paddingBottom: 10,
   },
   content: {
      color: "black",
      textAlign: "justify",
      fontFamily: "Nunito_700Bold",
      fontSize: 20,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 10,
   },
});
