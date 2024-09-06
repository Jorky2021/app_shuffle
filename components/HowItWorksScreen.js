import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function HowItWorksScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ height: '100%' }}>
        <View style={styles.container}>
          {/* Creating a 'grid' of paragraphs with headers */}
          <View>
            <Text style={styles.title}>How to use it</Text>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.content}>
                We help you to find a bike rental station that is close to your
                own location. We will show you a list of all stations ordered by
                distance, beginning with the closest one.
              </Text>
            </View>
            <View>
              <Text style={styles.content}>
                You will see the name of the station, the distance from your
                position, the number of available bikes to rent, and the number
                of free bike return slots.
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.title}>Find nearest station</Text>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.content}>
                On the the main page, find and click on the button 'Find
                Stations nearby'. Next, the app will request your permission to
                use your phone's location details.
              </Text>
            </View>
            <View>
              <Text style={styles.content}>
                If you grant permission to use your phone's location details,
                the app will use your gps-location. It will determine the
                distance of each station from your own position.
              </Text>
            </View>
            <View>
              <Text style={styles.content}>
                If you do not grant permission to use your phone's location
                details, the app will use the location of Dublin city centre
                (O'Connell Bridge). It will determine the station distances from
                that position (O'Connell Bridge).
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.title}>Show station on map</Text>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.content}>
                Tap on any station in the list to enter the map view, the app will show this
                station on the map. It will also show your own location, and
                centre the map around it.
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
    backgroundColor: '#ffdeb4',
    alignItems: 'left',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: '#faebd7',
    color: 'black',
    fontFamily: 'Nunito_700Bold',
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
    color: 'black',
    textAlign: 'justify',
    fontFamily: 'Nunito_400Regular',
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
