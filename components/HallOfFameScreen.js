import {
   Image,
   ImageBackground,
   SafeAreaView,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";

export function HallOfFameScreen({ navigation }) {
   return (
      <View style={styles.container}>
         {/* Themed background image */}
         <ImageBackground
            source={require("../assets/pexels-samfi17-2106249-half-size.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
         >
            <Image
               source={require("../assets/medal-256-col.png")}
               style={[
                  styles.segment,
                  {
                     flex: 1,
                     width: "100%",
                     height: "100%",
                     resizeMode: "contain",
                  },
               ]}
            ></Image>

            <View style={{ flex: 4, paddingTop: 10 }}>
               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>tigres</Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>192</Text>
               </View>

               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>ROY</Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>187</Text>
               </View>

               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>
                     cat4ward
                  </Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>175</Text>
               </View>

               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>tekTap</Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>86</Text>
               </View>

               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>
                     Lisa007
                  </Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>52</Text>
               </View>

               <View style={[styles.segment, { flexDirection: "row" }]}>
                  <Text style={[styles.contentNames, { flex: 3 }]}>
                     Reigh_k
                  </Text>
                  <Text style={[styles.contentScores, { flex: 1 }]}>50</Text>
               </View>
            </View>
         </ImageBackground>
      </View>
   );

   //    return (
   //       <SafeAreaView>
   //          <ScrollView style={{ height: "100%" }}>
   //             <View style={styles.container}>
   //                {/* Creating a 'grid' of paragraphs with headers */}
   //                <View>
   //                   <Text style={styles.title}>Pedaling Through Finance</Text>
   //                </View>

   //                <View style={styles.contentContainer}>
   //                   <View>
   //                      <Text style={styles.content}>
   //                         I embarked on this journey with a solid background in
   //                         Finance, where I came to experience the intricate
   //                         balance between risk and reward – a skill that I have
   //                         found applicable to navigating the city streets on two
   //                         wheels.
   //                      </Text>
   //                   </View>
   //                   <View>
   //                      <Text style={styles.content}>
   //                         I am passionate about sustainable public transport, and
   //                         I often found myself thinking about parallels between
   //                         financial markets and urban mobility. Just like with an
   //                         investment portfolio, I have diversified my routes, and
   //                         discovered hidden gems and shortcuts along the way.
   //                      </Text>
   //                   </View>
   //                </View>

   //                <View>
   //                   <Text style={styles.title}>Coding Adventures</Text>
   //                </View>

   //                <View style={styles.contentContainer}>
   //                   <View>
   //                      <Text style={styles.content}>
   //                         Armed with my trusty laptop and a cup of coffee, I have
   //                         dived into the world of code, and found inspiration in
   //                         the endless algorithms powering the bike rental app
   //                         itself.
   //                      </Text>
   //                   </View>
   //                   <View>
   //                      <Text style={styles.content}>
   //                         From tinkering with APIs to crafting custom features, I
   //                         enjoy the challenge of combining cycling and technology
   //                         to create innovative solutions that enhance the user
   //                         experience and simplify the journey from pedal to
   //                         pavement.
   //                      </Text>
   //                   </View>
   //                </View>

   //                <View>
   //                   <Text style={styles.title}>Enjoying the Open Road</Text>
   //                </View>

   //                <View style={styles.contentContainer}>
   //                   <View>
   //                      <Text style={styles.content}>
   //                         Let's not forget the thrill of the ride itself – the
   //                         wind in your hair, the flies in your eyes, the rhythm of
   //                         the pedals, - the freedom to explore new horizons at
   //                         your own pace.
   //                      </Text>
   //                   </View>

   //                   <View>
   //                      <Text style={styles.content}>
   //                         So whether you are a seasoned commuter, a weekend
   //                         warrior, or a curious newcomer to the world of cycling,
   //                         rest assured that you are in good company.
   //                      </Text>
   //                   </View>
   //                </View>
   //                <View style={styles.title} />
   //             </View>
   //          </ScrollView>
   //       </SafeAreaView>
   //    );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#579257",
      alignItems: "left",
      justifyContent: "center",
   },

   contentNames: {
      // color: "#fdfdfd",
      color: "rgb(252,194,0)",
      // color: "rgb(250,240,190)",
      textAlign: "justify",
      fontFamily: "Nunito_700Bold",
      fontSize: 35,
      paddingLeft: 35,
      paddingRight: 35,
      paddingTop: 5,
      paddingBottom: 10,
   },

   contentScores: {
      // color: "#fdfdfd",
      // color: "rgb(252,194,0)",
      color: "rgb(250,240,190)",
      textAlign: "justify",
      fontFamily: "Nunito_700Bold",
      fontSize: 35,
      paddingLeft: 35,
      paddingRight: 35,
      paddingTop: 5,
      paddingBottom: 10,
   },
});
