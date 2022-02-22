import { doesLetterExistInWord, maxWordLength } from "./utils";

export const hintRemoveKeys = (word, keyboardData) => {
    const updatedKeyboardData = { ...keyboardData };
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    let removedCharacterCount = 0;
    let loopCount = 0;
    console.log('removeKeys');
    while (removedCharacterCount < 3 && loopCount < 20) {
      const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length));
      if (!doesLetterExistInWord(word, randomLetter) && updatedKeyboardData['key-' + randomLetter] !== 2 && updatedKeyboardData['key-' + randomLetter]!==1 && updatedKeyboardData['key-' + randomLetter] !== 0 && updatedKeyboardData['key-' + randomLetter] !== -1) {
        removedCharacterCount++;
        updatedKeyboardData['key-' + randomLetter] = -1;
      }
      loopCount++;
    }
    console.log('removedCharacterCount = ', removedCharacterCount);
    return (updatedKeyboardData);
  }


export  const hintGiveKeys = (word, keyboardData) => {
    const updatedKeyboardData = { ...keyboardData };
    var characters = word;
    let revealedCharacterCount = 0;
    let loopCount = 0;
    console.log('giveKeys');
    while (revealedCharacterCount < 3 && loopCount < 20) {
      const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length));
      if (doesLetterExistInWord(word, randomLetter) && updatedKeyboardData['key-' + randomLetter] !== 2 && updatedKeyboardData['key-' + randomLetter]!==1 && updatedKeyboardData['key-' + randomLetter] !== 0) {
        revealedCharacterCount++;
        updatedKeyboardData['key-' + randomLetter] = 3;
      }
      loopCount++;
    }
    console.log('hintGivekeys = ', revealedCharacterCount);
    return (updatedKeyboardData);
  }

const isLetterInRow = (map, row, letter) => {
for (let column = 0; column < maxWordLength; column++) {
    if (map[row][column] === letter) {
    return true;
    }
}
return false;
}

export  const hintGiveLetterInLocation = (word, mapValues, row ) => {
    const map = [...mapValues];
    var characters = word;
    let revealedCharacterCount = 0;
    let loopCount = 0;
    console.log('giveLetterInLocation');
    while (revealedCharacterCount < 3 && loopCount < 20) {
      const randCol = Math.floor(Math.random() * characters.length); 
      const randomLetter = characters.charAt(randCol);
      if (!isLetterInRow(map, row, randomLetter)) {
        map[row][randCol].value = randomLetter.toUpperCase();
        map[row][randCol].result = 3;
        revealedCharacterCount++;
      }
      loopCount++;
    }
    console.log('giveLetterInLocation = ', revealedCharacterCount);
    return (map);
  }
