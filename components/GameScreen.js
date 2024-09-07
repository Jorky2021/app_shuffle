import {
   Alert,
   Dimensions,
   FlatList,
   FlatListComponent,
   ImageBackground,
   Pressable,
   StyleSheet,
   Text,
   View,
} from "react-native";

// PLAYING AROUND
import { Button } from "react-native";

import React, { useEffect, useRef, useState } from "react";

import { generate, count, wordsList } from "random-words";

// import functions to fetch word and shuffle letters
import * as ShuffleMechs from "./ShuffleMechs";
import { Cell, Section, TableView } from "react-native-tableview-simple";

// dummy data for Table View
// const DATA = [
//    {
//       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//       letter: "A",
//    },
//    {
//       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//       letter: "M",
//    },
//    {
//       id: "58694a0f-3da1-471f-bd96-145571e29d72",
//       letter: "I",
//    },
//    {
//       id: "69498a0f-3da1-471f-bd96-145571e29d72",
//       letter: "K",
//    },
//    {
//       id: "58694a0f-3db5-471f-bd96-145571e29d72",
//       letter: "W",
//    },
// ];

export function GameScreen({ navigation }) {
   // target word
   let fetchedWord = "";
   let combinations = [];
   let permutations = [];
   let validWords = [];
   let shuffled = [];
   // let levelCounter = 1;
   let countdownValue = 12;

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
   // const [letterPressed, setLetterPressed] = useState(false);

   // set up countdown timer
   const [countdown, setCountdown] = useState(countdownValue);

   // Screen for basic layer overlay
   const OverlayPrime = () => <View style={styles.overlayPrimeScreen} />;

   // Screen for LevelStart overlay
   const LevelStart = ({ title, showButton }) => (
      <View style={styles.overlayScreen}>
         <Text style={{ fontSize: 50 }}>{title}</Text>
         <Text style={{ fontSize: 30 }}>LEVEL: {level}</Text>
         {/* <Text style={{ fontSize: 30 }}>SCORE: {gameScore}</Text> */}
         {showButton && (
            <Button
               title="Start Now!"
               onPress={() => {
                  fetchButtonPressed();
               }}
            />
         )}
      </View>
   );

   // Screen for GameOver overlay
   const GameOver = ({ title, showButton }) => (
      <View style={styles.overlayScreen}>
         <Text style={{ fontSize: 40 }}>{title}</Text>
         {/* <Text style={{ fontSize: 30 }}>LEVEL: {level}</Text> */}
         <Text style={{ fontSize: 30 }}>SCORE: {gameScore}</Text>
         {showButton && (
            <Button
               title="Play again"
               onPress={() => {
                  resetGame();
               }}
            />
         )}
         <Button
            title="MAIN MENU"
            onPress={() => navigation.navigate("Home")}
         />
      </View>
   );

   // Screen for Level completed overlay
   const LevelCleared = ({ title, showButton }) => (
      <View style={styles.overlayScreen}>
         <Text style={{ fontSize: 60, color: "green" }}>{title}</Text>
         {showButton && (
            <Button
               title="Next Level"
               onPress={() => {
                  nextLevel();
               }}
            />
         )}
      </View>
   );

   // // PLAYING AROUND
   // useEffect(() => {
   //    // console.log("render");
   // });

   function nextLevel() {
      // levelCounter = level + 1;
      // setLevel(levelCounter);
      setLevel(level + 1);
      setLevelCleared(false);
      setLevelStart(true);
      // fetchButtonPressed();
   }

   function resetGame() {
      setGameOver(false);
      setLevel(1);
      setGameScore(0);
      setLevelStart(true);
      // fetchButtonPressed();
   }

   const myInterval = useRef(undefined);
   let counter;

   // function countDownStart() {
   //    setGameOver(false);
   //    counter = countdownValue;
   //    myInterval.current = setInterval(() => {
   //       counter -= 1;
   //       setCountdown(counter);
   //       console.log(counter);
   //       if (counter == 0) {
   //          setGameOver(true);
   //          countDownStop();
   //       }
   //    }, 1000);
   // }

   // function countDownStop() {
   //    // console.log("in function 'countDownStop()'");
   //    clearInterval(myInterval.current);
   // }

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
      // setGameOver(false);
      setLevelStart(false);
      // reset countdown
      setCountdown(countdownValue);
      // startCountDown();

      // countDownStart();
      countDownOn(true);

      // clear proposedWord, entered by user
      setProposedWord("");

      // console.log(
      //    "|||||| in fetchButtonPressed(), level=",
      //    level,
      //    "levelCounter=",
      //    levelCounter
      // );

      // set word length based on level: L1_to_L3: wL=4; L4_to_L6: wL=5; ...
      // let wordLength = Math.ceil(levelCounter / 3) + 3;
      let wordLength = Math.ceil(level / 3) + 3;
      // 1 - Fetch a word
      fetchedWord = ShuffleMechs.fetchWord(wordLength, wordLength);
      setTargetWord(fetchedWord);
      console.log("1 - fetchedWord: " + fetchedWord);

      // 2 - Generate all COMBINATIONS of a word, then only keep the ones with length >= 3
      combinations = ShuffleMechs.combinations(fetchedWord);
      console.log("2 - combinations:");
      // console.log(combinations);

      // 3 - Find all PERMUTATIONS of a string in javascript
      permutations = ShuffleMechs.allPermutations(combinations);
      console.log("3 - All permutations of fetchedWord:");
      // console.log(permutations);

      // 4 - Find all valid WORDS in the permutations
      validWords = ShuffleMechs.createWordList(permutations);
      console.log("4 - Valid words in permutations of fetchedWord:");
      console.log(validWords);

      // 4a - use useState to update wordList
      setWordList(validWords);
      console.log("4a - wordList:");
      // console.log(wordList);

      // 5 - Get an array with shuffled letters of the fetchedWord
      shuffled = ShuffleMechs.shuffleLetters(fetchedWord);
      console.log("5 - Shuffled letters:");
      console.log(shuffled);

      // 5a - use useState to update shuffledWord
      setShuffledWord(shuffled);
      console.log("5a - shuffledWord: " + shuffledWord);

      Alert.alert("Fetched word: " + fetchedWord);
   }

   function resetLetterButtons() {
      // Reset the status of all letter buttons to Available to press
      if (shuffledWord != null) {
         for (let i = 0; i < shuffledWord.length; i++) {
            shuffledWord[i].wasPressed = false;
         }
      }
   }

   function flatListButtonPressed(value) {
      setProposedWord(proposedWord + value);
      // Alert.alert(value + proposedWord);
   }

   function enterButtonPressed() {
      // only check if at least 3 letters have been entered
      if (proposedWord.length > 2) {
         // let validated = [];
         let validated = ShuffleMechs.validateSubmission(
            proposedWord,
            targetWord,
            wordList
         );
         if (validated.won) {
            // stop the countdown timer <<< NOT WORKING!!!

            // countDownStop();
            countDownOn(false);
            // set flag to display 'Level cleared' component
            setLevelCleared(true);
         }
         setGameScore(gameScore + validated.score);
         if (validated.foundAlready) {
            Alert.alert("Word found already!");
         }
      }
      // clear proposedWord entered
      setProposedWord("");
      // reset 'wasPressed' status of letter buttons
      resetLetterButtons();
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

   // console.log("countdownOn: " + countdownOn);
   // console.log("countdownValue: " + countdown);

   return (
      <View style={styles.container}>
         {/* 'BUTTON' to fetch a word */}
         {/* <View style={[styles.segment, { flex: 2, paddingTop: 50 }]}>
            <Pressable
               // onPress={() => navigation.navigate("Station List")}
               onPress={() =>
                  // Alert.alert(generate({ minLength: 5, maxLength: 5 }))
                  // Alert.alert(ShuffleMechs.fetchWord(4, 4))
                  fetchButtonPressed()
               }
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(242, 182, 210)"
                        : "rgb(176, 2, 83)",
                  },
                  styles.button,
                  { borderColor: "#006699" },
               ]}
            >
               <Text style={styles.findStationsButtonLabel}>Fetch a word</Text>
            </Pressable>
         </View> */}

         {/* STATUS bar */}
         <View
            style={[
               styles.segment,
               {
                  flex: 2,
                  backgroundColor: "blue",
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
               <Text style={[styles.statusBoxTextBold]}>{countdown}</Text>
            </View>

            <View style={[styles.statusBox]}>
               <Text style={[styles.statusBoxTextRegular]}>SCORE</Text>
               <Text style={[styles.statusBoxTextRegular]}>{gameScore}</Text>
            </View>
         </View>

         {/* Solution GRID area */}
         <View style={[styles.segment, { flex: 3, justifyContent: "center" }]}>
            <Pressable
               // onPress={() => navigation.navigate("About Us")}
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(239,222,205)"
                        : "rgb(239,222,205)",
                  },
                  styles.solutionArea,
               ]}
            >
               {/* <Text style={styles.howItWorksButtonLabel}>Level: {level}</Text>

               <Text style={styles.howItWorksButtonLabel}>
                  Remaining time: {countdown}
               </Text>
               <Text style={styles.howItWorksButtonLabel}>
                  SCORE count: {gameScore}
               </Text> */}
               <Text style={styles.howItWorksButtonLabel}>{proposedWord}</Text>
            </Pressable>
         </View>

         {/* Display buttons of shuffled word */}
         <View style={[styles.segment, { flex: 2, justifyContent: "center" }]}>
            <FlatList
               horizontal={true}
               // data={DATA}
               // data={shuffled}
               data={shuffledWord}
               // renderItem={({ item }) => <Item title={item.letter} />}
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
                     style={({ pressed }) => [
                        {
                           // backgroundColor: pressed
                           backgroundColor: item.wasPressed
                              ? "rgb(153, 153, 255)"
                              : "rgb(0, 0, 102)", // ffdeb4
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
         <View style={[styles.segment, { flex: 2 }]}>
            <Pressable
               unstable_pressDelay={100}
               onPress={() => {
                  enterButtonPressed();
               }}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(160, 219, 178)"
                        : "rgb(60, 194, 100)",
                  },
                  styles.button,
               ]}
            >
               <Text style={styles.findStationsButtonLabel}>E N T E R</Text>
            </Pressable>
         </View>

         {/* 'Button' to re-shuffle the available letters */}
         <View style={[styles.segment, { flex: 2 }]}>
            <Pressable
               unstable_pressDelay={100}
               onPress={() => {
                  reshuffleButtonPressed();
               }}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(250, 227, 158)"
                        : "rgb(230, 180, 20)",
                  },
                  styles.button,
               ]}
            >
               <Text style={styles.findStationsButtonLabel}>Re-Shuffle</Text>
            </Pressable>
         </View>

         {/* Area to display letters / keyboard */}
         {/* <View style={[styles.segment, { flex: 2 }]}> */}
         {/* <View style={[styles.row, { flex: 2 }]}> */}
         {/* <View style={styles.letterButton}> */}
         {/* </View> */}

         {/* <Pressable
               // onPress={() => navigation.navigate("How It Works")}
               // onPress={() =>
               //    Alert.alert(generate({ minLength: 5, maxLength: 5 }))
               // }
               unstable_pressDelay={100}
               style={({ pressed }) => [
                  {
                     backgroundColor: pressed
                        ? "rgb(153, 153, 255)"
                        : "rgb(0, 0, 102)", // ffdeb4
                  },
                  styles.letterButton,
               ]}
            >
               <Text style={styles.findStationsButtonLabel}>L2</Text>
            </Pressable> */}

         {/* </View> */}

         {/* PLAYING AROUND */}
         {/* <GameOver title="Title" showButton={false} /> */}
         {(levelStart || gameOver || levelCleared) && <OverlayPrime />}

         {levelStart && <LevelStart title="READY TO START" showButton={true} />}
         {gameOver && <GameOver title="GAME OVER" showButton={true} />}
         {levelCleared && (
            <LevelCleared title="LEVEL CLEARED!" showButton={true} />
         )}
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
      height: "45%",
      backgroundColor: "yellow",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
   },

   statusBoxTextRegular: {
      color: "red",
      fontFamily: "Nunito_400Regular",
      fontSize: 22,
   },

   statusBoxTextBold: {
      color: "red",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
   },

   overlayPrimeScreen: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
   },

   overlayScreen: {
      position: "absolute",
      // top: 0,
      // left: 0,

      top: (Dimensions.get("screen").height * (1 - 0.8)) / 2,
      left: (Dimensions.get("screen").width * (1 - 0.8)) / 2,

      height: Dimensions.get("screen").height * 0.8,
      width: Dimensions.get("screen").width * 0.8,
      // width: Dimensions.get("window").width,
      // height: Dimensions.get("window").height,

      // backgroundColor: "rgba(255, 255, 255, 0.75)",
      backgroundColor: "rgba(255, 55, 155, 0.75)",
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
      height: 75,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
   },

   solutionArea: {
      width: 400,
      height: 150,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
   },

   flatListButton: {
      // backgroundColor: "rgb(0, 0, 102)",
      width: 60,
      height: 60,
      margin: 7,
      borderRadius: 5,

      // width: 80,
      // width: windowWidth * 0.2,
      // height: windowWidth * 0.2,
      // borderWidth: 3,
      // borderColor: "red",
      // borderRadius: windowWidth*0.2,
      // margin: buttonWidth * 0.1,
      alignItems: "center",
      justifyContent: "center",
   },

   flatListButtonText: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
   },

   letterButton: {
      // backgroundColor: "rgb(0, 0, 102)",
      width: 70,
      height: 70,
      borderRadius: 5,
      // width: 80,
      // width: windowWidth * 0.2,
      // height: windowWidth * 0.2,
      // borderWidth: 3,
      // borderColor: "red",
      // borderRadius: windowWidth*0.2,
      // margin: buttonWidth * 0.1,
      alignItems: "center",
      justifyContent: "center",
   },

   findStationsButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_700Bold",
      fontSize: 24,
   },

   aboutMeButtonLabel: {
      color: "#fdfdfd",
      fontFamily: "Nunito_400Regular",
      fontSize: 22,
   },
   row: {
      width: "100%",
      // backgroundColor: "black",
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingTop: 10,
      paddingBottom: 10,
   },
});
