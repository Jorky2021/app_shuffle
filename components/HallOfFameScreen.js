import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export function HallOfFameScreen({ navigation }) {
   return (
      <SafeAreaView>
         <ScrollView style={{ height: "100%" }}>
            <View style={styles.container}>
               {/* Creating a 'grid' of paragraphs with headers */}
               <View>
                  <Text style={styles.title}>Pedaling Through Finance</Text>
               </View>

               <View style={styles.contentContainer}>
                  <View>
                     <Text style={styles.content}>
                        I embarked on this journey with a solid background in
                        Finance, where I came to experience the intricate
                        balance between risk and reward – a skill that I have
                        found applicable to navigating the city streets on two
                        wheels.
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.content}>
                        I am passionate about sustainable public transport, and
                        I often found myself thinking about parallels between
                        financial markets and urban mobility. Just like with an
                        investment portfolio, I have diversified my routes, and
                        discovered hidden gems and shortcuts along the way.
                     </Text>
                  </View>
               </View>

               <View>
                  <Text style={styles.title}>Coding Adventures</Text>
               </View>

               <View style={styles.contentContainer}>
                  <View>
                     <Text style={styles.content}>
                        Armed with my trusty laptop and a cup of coffee, I have
                        dived into the world of code, and found inspiration in
                        the endless algorithms powering the bike rental app
                        itself.
                     </Text>
                  </View>
                  <View>
                     <Text style={styles.content}>
                        From tinkering with APIs to crafting custom features, I
                        enjoy the challenge of combining cycling and technology
                        to create innovative solutions that enhance the user
                        experience and simplify the journey from pedal to
                        pavement.
                     </Text>
                  </View>
               </View>

               <View>
                  <Text style={styles.title}>Enjoying the Open Road</Text>
               </View>

               <View style={styles.contentContainer}>
                  <View>
                     <Text style={styles.content}>
                        Let's not forget the thrill of the ride itself – the
                        wind in your hair, the flies in your eyes, the rhythm of
                        the pedals, - the freedom to explore new horizons at
                        your own pace.
                     </Text>
                  </View>

                  <View>
                     <Text style={styles.content}>
                        So whether you are a seasoned commuter, a weekend
                        warrior, or a curious newcomer to the world of cycling,
                        rest assured that you are in good company.
                     </Text>
                  </View>
               </View>
               <View style={styles.title} />
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#579257",
      alignItems: "left",
      justifyContent: "center",
   },
   title: {
      backgroundColor: "#71ab71",
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 22,
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
      color: "#fdfdfd",
      textAlign: "justify",
      fontFamily: "Nunito_400Regular",
      fontSize: 18,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
   },
});
