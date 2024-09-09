import { useEffect, useState } from "react";

// import functions to fetch word and shuffle letters
// Copyright (c) 2022 Apostrophe Technologies, Inc.
import { generate, count } from "random-words";

import Dictionary from "../assets/dict_mod.json";

// 1 - Fetch a word and return it
export function fetchWord(minLength, maxLength) {
   const minL = minLength;
   const maxL = maxLength;
   const fetchedWord = generate({
      minLength: minL,
      maxLength: maxL,
   }).toUpperCase();

   return fetchedWord;
}

// 2 - Generate all COMBINATIONS of a string of letters, then only keep the ones with length >= 3
// https://www.geeksforgeeks.org/how-to-generate-all-combinations-of-a-string-in-javascript/#approach-3-using-for-loop-and-push-method
export function combinations(str) {
   let tempArr = [];
   let resultArr = [];
   for (let i = 0; i < str.length; i++) {
      tempArr = [str[i]];
      let index = 0;
      while (resultArr[index]) {
         tempArr.push("" + resultArr[index] + str[i]);
         index++;
      }
      resultArr = resultArr.concat(tempArr);
   }
   // remove combinations with length < 3
   for (let i = 0; i < resultArr.length; i++) {
      if (resultArr[i].length < 3) {
         resultArr.splice(i, 1);
         i--;
      }
   }
   return resultArr;
}

// 3 - Find all PERMUTATIONS of a string in javascript
// https://levelup.gitconnected.com/find-all-permutations-of-a-string-in-javascript-af41bfe072d2
export function findPermutations(string) {
   if (!string || typeof string !== "string") {
      return "Please enter a string";
   } else if (string.length < 2) {
      return string;
   }

   let permutationsArray = [];

   for (let i = 0; i < string.length; i++) {
      let char = string[i];

      if (string.indexOf(char) != i) continue;

      let remainingChars =
         string.slice(0, i) + string.slice(i + 1, string.length);

      for (let permutation of findPermutations(remainingChars)) {
         permutationsArray.push(char + permutation);
      }
   }
   return permutationsArray;
}

// Create one array with the permutations for all possible combinations with length >= 3
export function allPermutations(combinations) {
   let allPermutationsArray = [];

   // iterate through the array 'combinations'
   for (var i = 0; i < combinations.length; i++) {
      allPermutationsArray = allPermutationsArray.concat(
         findPermutations(combinations[i])
      );
   }

   return allPermutationsArray;
}

// 4 - Find all valid WORDS in the permutations and return as a list
export function createWordList(permutations) {
   // console.log("In function createWordList");
   let wordList = [];
   // loop through permutations array and check if element exists inside the Dictionary
   for (var i = 0; i < permutations.length; i++) {
      if (Dictionary.hasOwnProperty(permutations[i].toLowerCase())) {
         // only add word to wordList if not already in list
         let inListAlready = wordList.find(
            (item) => item.word === permutations[i]
         );
         if (inListAlready == undefined) {
            // word object: word, wasFound (true/false), scoreValue (length)
            wordList.push({
               word: permutations[i],
               wasFound: false,
               scoreValue: permutations[i].length,
            });
         }
      }
   }
   return wordList;
}

// 5 - Create an array with the shuffled letters of the targetWord
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffleLetters(targetWord) {
   // convert string to array
   const tempArray = targetWord.split("");

   for (var i = tempArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
   }
   // create array to hold objects {letter: 'letter', wasPressed: true/false}
   let shuffledLetters = [];

   // create an array with objects
   for (var i = 0; i < tempArray.length; i++) {
      shuffledLetters.push({ id: i, letter: tempArray[i], wasPressed: false });
      // console.log("shuffledLetters: " + shuffledLetters[i].letter);
   }
   return shuffledLetters;
}

// 6 - Validate proposed solution against valid words
// Three possibilities:
// 1 - Submission is the Targetword
// 2 - Submission is a valid non-target word found for the first time
// 3 - Submission is a valid non-target word, but it was found already in earlier submission
// 4 - Submission is not a valid word
export function validateSubmission(submittedWord, winningWord, validWordList) {
   let levelWon = false; // indicator if winningWord found
   let repeatFind = false; // indicator if repeat find
   let wordValue = 0; // value of word in points
   if (submittedWord == winningWord) {
      // 1 - Submission is the Targetword
      levelWon = true;
      wordValue = winningWord.length * 2;
   } else {
      // check submittedWord against array of validWordList
      for (let i = 0; i < validWordList.length; i++) {
         if (submittedWord == validWordList[i].word) {
            // check if word was found already
            if (validWordList[i].wasFound == false) {
               // 2 - Submission is a valid non-target word found for the first time
               wordValue = validWordList[i].scoreValue;
               // change status to 'wasFound = true'
               validWordList[i].wasFound = true;
            } else {
               repeatFind = true;
            }
         }
      }
   }

   // validationResult object: won (boolean), foundAlready (boolean), score (int), result (string)
   const validationResult = {
      won: levelWon,
      foundAlready: repeatFind,
      score: wordValue,
   };
   return validationResult;
}
