import {
   Alert,
   Dimensions,
   FlatList,
   Image,
   ImageBackground,
   Pressable,
   StyleSheet,
   Text,
   View,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";

// import functions to fetch word and shuffle letters
import * as ShuffleMechs from "./ShuffleMechs";

export function GameScreen({ navigation }) {
   // target word
   let fetchedWord = "";
   let combinations = [];
   let permutations = [];
   let validWords = [];
   let shuffled = [];
   let countdownValue = 60;

   // create state elements
   const [targetWord, setTargetWord] = useState("");
   const [proposedWord, setProposedWord] = useState("");
   const [shuffledWord, setShuffledWord] = useState(null);
   const [wordList, setWordList] = useState(null);
   const [level, setLevel] = useState(1);
   const [gameScore, setGameScore] = useState(0);
   const [levelStart, setLevelStart] = useState(true);
   const [gameOver, setGameOver] = useState(false);
   const [levelCleared, setLevelCleared] = useState(false);
   const [countdown, setCountdown] = useState(countdownValue);

   // updated states pre next level
   function nextLevel() {
      setLevel(level + 1);
      setLevelCleared(false);
      setLevelStart(true);
   }

   // update states at game over
   function resetGame() {
      setGameOver(false);
      setLevel(1);
      setGameScore(0);
      setLevelStart(true);
   }

   // countdown setup
   const myInterval = useRef(undefined);
   let counter;

   function countDownOn(toRun) {
      function start() {
         setGameOver(false);
         counter = countdownValue;
         myInterval.current = setInterval(() => {
            counter -= 1;
            setCountdown(counter);
            if (counter == 0) {
               setGameOver(true);
               stop();
            }
         }, 1000);
      }

      function stop() {
         clearInterval(myInterval.current);
      }

      if (toRun) {
         start();
      }

      if (!toRun) {
         stop();
      }
   }

   function fetchButtonPressed() {
      setLevelStart(false);
      setCountdown(countdownValue); // reset countdown
      countDownOn(true);
      setProposedWord(""); // clear proposedWord, entered by user

      // set word length based on level: L1_to_L3: wL=4; L4_to_L6: wL=5; and so on
      let wordLength = Math.ceil(level / 3) + 3;

      // 1 - Fetch a word
      fetchedWord = ShuffleMechs.fetchWord(wordLength, wordLength);
      setTargetWord(fetchedWord);
      console.log("1 - fetchedWord: " + fetchedWord);

      // 2 - Generate all COMBINATIONS of a word, then only keep the ones with length >= 3
      combinations = ShuffleMechs.combinations(fetchedWord);
      // console.log("2 - combinations:");

      // 3 - Find all PERMUTATIONS of a string in javascript
      permutations = ShuffleMechs.allPermutations(combinations);
      // console.log("3 - All permutations of fetchedWord:");

      // 4 - Find all valid WORDS in the permutations
      validWords = ShuffleMechs.createWordList(permutations);
      // console.log("4 - Valid words in permutations of fetchedWord:");
      // console.log(validWords);

      // 4a - use useState to update wordList
      setWordList(validWords);
      // console.log("4a - wordList:");

      // 5 - Get an array with shuffled letters of the fetchedWord
      shuffled = ShuffleMechs.shuffleLetters(fetchedWord);
      // console.log("5 - Shuffled letters:");
      // console.log(shuffled);

      // 5a - use useState to update shuffledWord
      setShuffledWord(shuffled);

      // Alert.alert("Fetched word: " + fetchedWord);
   }

   // Reset the status of all letter buttons to Available to press
   function resetLetterButtons() {
      if (shuffledWord != null) {
         for (let i = 0; i < shuffledWord.length; i++) {
            shuffledWord[i].wasPressed = false;
         }
      }
   }

   function flatListButtonPressed(value) {
      setProposedWord(proposedWord + value);
   }

   function enterButtonPressed() {
      // only check if at least 3 letters have been entered
      if (proposedWord.length > 2) {
         let validated = ShuffleMechs.validateSubmission(
            proposedWord,
            targetWord,
            wordList
         );
         if (validated.won) {
            countDownOn(false);
            setLevelCleared(true); // set flag to display 'Level cleared' component
         }
         setGameScore(gameScore + validated.score);
      }
      setProposedWord(""); // clear proposedWord entered
      resetLetterButtons(); // reset 'wasPressed' status of letter buttons
   }

   function reshuffleButtonPressed() {
      console.log(
         ">>> in function 'reshuffleButtonPressed, var 'shuffledWord' = " +
            shuffledWord
      );
      // create a single string from the current array 'shuffled' from objed items 'letter'
      let currentShuffleString = "";
      for (let i = 0; i < shuffledWord.length; i++) {
         currentShuffleString += shuffledWord[i].letter;
      }
      // 5 - Get an array with shuffled letters of the submitted shuffle
      shuffled = ShuffleMechs.shuffleLetters(currentShuffleString);
      // 5a - use useState to update shuffledWord
      setShuffledWord(shuffled);
      // clear proposedWord entered
      setProposedWord("");
      // reset 'wasPressed' status of letter buttons
      resetLetterButtons();
   }

   // Screen for basic layer overlay
   const OverlayPrime = () => <View style={styles.overlayPrimeScreen} />;

   // Screen for LevelStart overlay
   const LevelStart = () => (
      <View style={styles.LevelStartOverlayScreen}>
         <Image
            source={require("../assets/level-up.png")}
            style={{
               flex: 3,
               width: "60%",
               height: "60%",
               resizeMode: "contain",
            }}
         ></Image>

         <View style={{ flex: 1 }}>
            <Text
               style={{
                  fontSize: 55,
                  fontFamily: "Nunito_700Bold",
               }}
            >
               LEVEL {level}
            </Text>
         </View>

         <View style={{ flex: 2 }}>
            <Pressable
               onPress={() => fetchButtonPressed()}
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(210, 230, 255)"
                        : "rgb(33,79,198)",
                  },
                  styles.button,
                  { borderRadius: 20, width: 200, height: 70 },
               ]}
            >
               <Text
                  style={[
                     styles.findStationsButtonLabel,
                     { fontSize: 30, letterSpacing: 3 },
                  ]}
               >
                  GO!
               </Text>
            </Pressable>
         </View>
      </View>
   );

   // Screen for LevelCleared overlay
   const LevelCleared = () => (
      <View style={styles.LevelClearedOverlayScreen}>
         <Image
            source={require("../assets/trophy.png")}
            style={{
               flex: 2,
               width: "50%",
               height: "50%",
               resizeMode: "contain",
            }}
         ></Image>

         <View style={{ flex: 2 }}>
            <Text
               style={{
                  textAlign: "center",
                  fontSize: 55,
                  fontFamily: "Nunito_700Bold",
               }}
            >
               WELL DONE!
            </Text>
         </View>

         <View style={{ flex: 2 }}>
            <Pressable
               onPress={() => nextLevel()}
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(210, 230, 255)"
                        : "rgb(0, 106, 78)", // #579257
                  },
                  styles.button,
                  { borderRadius: 20, width: 250, height: 80 },
               ]}
            >
               <Text
                  style={[
                     styles.findStationsButtonLabel,
                     { fontSize: 30, letterSpacing: 3 },
                  ]}
               >
                  Next Level
               </Text>
            </Pressable>
         </View>
      </View>
   );

   // Screen for GameOver overlay
   const GameOver = () => (
      <View style={styles.GameOverOverlayScreen}>
         <Image
            source={require("../assets/game-over.png")}
            style={{
               flex: 2,
               width: "70%",
               height: "60%",
               resizeMode: "contain",
            }}
         ></Image>

         <View style={{ flex: 1 }}>
            <Text
               style={{
                  textAlign: "center",
                  fontSize: 45,
                  fontFamily: "Nunito_700Bold",
               }}
            >
               SCORE {gameScore}
            </Text>
         </View>

         <View style={{ flex: 1 }}>
            <Pressable
               onPress={() => resetGame()}
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(210, 230, 255)"
                        : "darkblue", // #579257
                  },
                  styles.button,
                  { borderRadius: 20, width: 270, height: 80 },
               ]}
            >
               <Text
                  style={[
                     styles.findStationsButtonLabel,
                     { fontSize: 30, letterSpacing: 3 },
                  ]}
               >
                  PLAY AGAIN
               </Text>
            </Pressable>
         </View>

         <View style={{ flex: 1 }}>
            <Pressable
               onPress={() => navigation.navigate("Home")}
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(210, 230, 255)"
                        : "rgb(83,104,120)", // #579257
                  },
                  styles.button,
                  { borderRadius: 20, width: 200, height: 60 },
               ]}
            >
               <Text
                  style={[
                     styles.findStationsButtonLabel,
                     { fontSize: 30, letterSpacing: 3 },
                  ]}
               >
                  QUIT
               </Text>
            </Pressable>
         </View>
      </View>
   );

   return (
      <View style={styles.container}>
         <ImageBackground
            source={require("../assets/pexels-jplenio-1996035-half-size.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
         >
            {/* STATUS bar */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 2,
                     flexDirection: "row",
                     justifyContent: "space-around",
                     alignItems: "flex-end",
                  },
               ]}
            >
               <View style={[styles.statusBox]}>
                  <Text style={[styles.statusBoxTextRegular]}>LEVEL</Text>
                  <Text style={[styles.statusBoxTextRegular]}>{level}</Text>
               </View>

               <View style={[styles.statusBox]}>
                  <Text style={[styles.statusBoxTextBold]}>TIME</Text>
                  <Text style={[styles.statusBoxTextBold, { fontSize: 25 }]}>
                     {countdown}
                  </Text>
               </View>

               <View style={[styles.statusBox]}>
                  <Text style={[styles.statusBoxTextRegular]}>SCORE</Text>
                  <Text style={[styles.statusBoxTextRegular]}>{gameScore}</Text>
               </View>
            </View>

            {/* Solution GRID area */}
            <View
               style={
                  ([styles.segment],
                  {
                     flex: 3,
                     justifyContent: "center",
                     alignItems: "center",
                  })
               }
            >
               <View
                  style={[
                     {
                        width: "95%",
                        height: "40%",
                        backgroundColor: "rgb(111,78,55)",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                     },
                  ]}
               >
                  <Text style={[styles.proposedText, { letterSpacing: 2 }]}>
                     {proposedWord}
                  </Text>
               </View>
            </View>

            {/* Display buttons of shuffled word */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 3,
                     justifyContent: "space-evenly",
                     alignItems: "center",
                  },
               ]}
            >
               <FlatList
                  contentContainerStyle={styles.flatListBox}
                  horizontal={true}
                  data={shuffledWord}
                  renderItem={({ item }) => (
                     <Pressable
                        unstable_pressDelay={100}
                        onPress={() => {
                           // Check if letter was pressed already, if not set ot to true
                           if (!item.wasPressed) {
                              flatListButtonPressed(item.letter);
                              item.wasPressed = true;
                           }
                        }}
                        style={[
                           {
                              backgroundColor: item.wasPressed
                                 ? "rgb(153, 153, 255)"
                                 : "rgb(0,0,156)",
                           },
                           styles.flatListButton,
                        ]}
                     >
                        <Text style={styles.flatListButtonText}>
                           {item.letter}
                        </Text>
                     </Pressable>
                  )}
                  keyExtractor={(item) => item.id}
               />
            </View>

            {/* 'ENTER' Button */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 2,
                     flexDirection: "row",
                     justifyContent: "space-evenly",
                  },
               ]}
            >
               <Pressable
                  unstable_pressDelay={100}
                  onPress={() => {
                     reshuffleButtonPressed();
                  }}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(250, 227, 158)"
                           : "rgb(255,191,0)",
                     },
                     styles.button,
                     { width: "20%", height: "50%" },
                  ]}
               >
                  <Image
                     source={require("../assets/pngwing-refresh.png")}
                     style={{
                        width: "75%",
                        height: "75%",
                        resizeMode: "contain",
                     }}
                  ></Image>
               </Pressable>

               <Pressable
                  unstable_pressDelay={100}
                  onPress={() => {
                     enterButtonPressed();
                  }}
                  style={({ pressed }) => [
                     {
                        backgroundColor: pressed
                           ? "rgb(160, 219, 178)"
                           : "rgb(60,179,113)",
                     },
                     styles.button,
                     { width: "60%", height: "70%", borderRadius: 20 },
                  ]}
               >
                  <Text
                     style={[
                        styles.findStationsButtonLabel,
                        { fontSize: 50, letterSpacing: 5 },
                     ]}
                  >
                     ENTER
                  </Text>
               </Pressable>
            </View>

            {/* 'Button' to re-shuffle the available letters */}
            <View
               style={[
                  styles.segment,
                  {
                     flex: 1,
                  },
               ]}
            ></View>

            {(levelStart || gameOver || levelCleared) && <OverlayPrime />}

            {levelStart && (
               <LevelStart title="READY TO START" showButton={true} />
            )}
            {gameOver && <GameOver title="GAME OVER" showButton={true} />}
            {levelCleared && (
               <LevelCleared title="LEVEL CLEARED!" showButton={true} />
            )}
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

   statusBox: {
      width: "25%",
      height: "60%",
      backgroundColor: "rgb(250,235,215)",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
   },

   statusBoxTextRegular: {
      color: "black",
      fontFamily: "Nunito_700Bold",
      fontSize: 23,
   },

   statusBoxTextBold: {
      color: "rgb(192,54,44)",
      fontFamily: "Nunito_700Bold",
      fontSize: 30,
   },

   proposedText: {
      color: "rgb(238,255,27)",
      fontFamily: "Nunito_700Bold",
      fontSize: 55,
   },

   overlayPrimeScreen: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
   },

   LevelStartOverlayScreen: {
      position: "absolute",
      top: (Dimensions.get("screen").height * (1 - 0.8)) / 2,
      left: (Dimensions.get("screen").width * (1 - 0.8)) / 2,
      height: Dimensions.get("screen").height * 0.8,
      width: Dimensions.get("screen").width * 0.8,

      backgroundColor: "rgba(95, 158, 160, 0.8)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      borderRadius: 20,
   },

   LevelClearedOverlayScreen: {
      position: "absolute",
      top: (Dimensions.get("screen").height * (1 - 0.8)) / 2,
      left: (Dimensions.get("screen").width * (1 - 0.8)) / 2,
      height: Dimensions.get("screen").height * 0.8,
      width: Dimensions.get("screen").width * 0.8,

      backgroundColor: "rgba(252, 194, 0, 0.8)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      borderRadius: 20,
   },

   GameOverOverlayScreen: {
      position: "absolute",
      top: (Dimensions.get("screen").height * (1 - 0.8)) / 2,
      left: (Dimensions.get("screen").width * (1 - 0.8)) / 2,
      height: Dimensions.get("screen").height * 0.8,
      width: Dimensions.get("screen").width * 0.8,

      backgroundColor: "rgba(255, 55, 155, 0.8)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      borderRadius: 20,
   },

   segment: {
      flex: 1,
      width: "100%",
      alignItems: "center",
   },

   button: {
      width: 300,
      height: 90,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
   },

   flatListBox: {
      width: "100%",
      justifyContent: "space-evenly",
      flexWrap: "wrap",
      alignContent: "center",
      alignItems: "center",
   },

   flatListButton: {
      width: 75,
      height: 75,
      margin: 7,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
   },

   flatListButtonText: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 40,
   },

   findStationsButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
   },
});
