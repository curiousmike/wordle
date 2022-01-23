import { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import Winner from './components/winner';
import Loser from './components/loser';
import { Container } from './styles';
import { globalWordList } from "./globalWordList.js";
const maxWordLength = 5;
const maxRows = 6;
const backSpaceKey = '<=';
const wordToGuess = ['BEETS', 'CANDY', 'SPANS', 'SPICE', 'NEARS', 'CRYER', 'ACIDS', 'ACRID', 'ACTOR', 'ACUTE', 'ADEPT', 'BASED', 'BARNS', 'BOLTS', 'BOLTED', 'CLUES', 'COACH', 'COALS', 'ELDER', 'ELBOW', 'ELITE', 'REIGN', 'AISLE'];

const buildDefaultMap = () => {
  const map = [];
  for (let row = 0; row < maxRows; row++) {
    map[row] = [];
    for (let col = 0; col < maxWordLength; col++) {
      map[row][col] = { value: '' };
    }
  }
  return map;
}

const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight();


function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentMapValues, setCurrentMapValues] = useState(buildDefaultMap());
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [keyboardData, setKeyboardData] = useState({});
  const [currentWordToGuessIndex, setCurrentWordToGuessIndex] = useState(0);

  const handleClearWinner = () => {
    setIsWinner(false);
    setIsLoser(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    const blankMap = buildDefaultMap();
    setCurrentMapValues(blankMap);
    setKeyboardData({});
    setCurrentWordToGuessIndex(currentWordToGuessIndex + 1);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (e) => {
    if (isWinner) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleClearWinner();
      }
    } else {
      if (e.key === 'Backspace') {
        handleKey('<=');
      } else {
        handleKey(e.key.toUpperCase());
      }
    }
  }
  const savedHandler = useRef();
  
  useEffect(() => {
    savedHandler.current = handleKeyPress;
  }, [handleKeyPress]);

  useEffect(
    () => {
      const isSupported = document && document.addEventListener;
      if (!isSupported) return;
      const eventListener = event => savedHandler.current(event);
      document.addEventListener('keydown', eventListener);
      return () => {
        document.removeEventListener('keydown', eventListener);
      };
    },
    [] // Re-run if eventName or element changes
  );  

  const handleKey = (keyEvent) => {
    if (isWinner) {
      handleClearWinner();
      return;
    }
    const map = [...currentMapValues];
    if (keyEvent === backSpaceKey) {
      if (currentColumn > 0) {
        if (map[currentRow][currentColumn].value !== '') {
          map[currentRow][currentColumn].value = '';
        } else {
          map[currentRow][currentColumn].value = '';
          setCurrentColumn(currentColumn - 1);
          map[currentRow][currentColumn - 1].value = '';
        }
        setCurrentMapValues(map);
      }
    } else
      if (keyEvent === 'ENTER') {
        if (map[currentRow][currentColumn].value !== '' && currentColumn === maxWordLength - 1) {
          if (checkWinnerWord()) {
            console.log('winner');
            setIsWinner(true);
            return;
          }
          if (checkIsLoser()) {
            setIsLoser(true);
            console.log('loser');
            return;
          }
          if (checkValidWord() && currentRow + 1 < maxRows) {
            checkValidLetters();
            setCurrentColumn(0);
            // console.log('currentROW, nextROW = ', currentRow, currentRow + 1);
            setCurrentRow(currentRow + 1);
          }
        }
    }
    else if (keyEvent.length === 1 && keyEvent >= 'A' && keyEvent <= 'Z') {
      map[currentRow][currentColumn].value = keyEvent;
      setCurrentMapValues(map);
      if (currentColumn + 1 < maxWordLength) {
        setCurrentColumn(currentColumn + 1);
      }
    }
  }

  const buildWordFromCurrentRow = () => {
    let word = '';
    for (let column = 0; column < maxWordLength; column++) {
      word += currentMapValues[currentRow][column].value;
    }
    return word;
  }

  const checkWinnerWord = () => {
    const submittedWord = buildWordFromCurrentRow();
    console.log('currentWordToGuessIndex = ', currentWordToGuessIndex);
    console.log('wordToGuesss = ', wordToGuess[currentWordToGuessIndex]);
    return submittedWord === wordToGuess[currentWordToGuessIndex];
  }

  const checkIsLoser = () => {
    if (currentRow + 1 >= maxRows) {
      return true;
    }
  }
  const checkValidWord = () => {
    let submittedWord = buildWordFromCurrentRow();
    submittedWord = submittedWord.toLowerCase();
    let isValid = false;
    for (let word of globalWordList) {
      if (submittedWord === word) {
        isValid = true;
        break;
      }
    }
    return isValid;
  }

  const doesLetterExistInWord = (letter) => {
    for (let column = 0; column < wordToGuess[currentWordToGuessIndex].length; column++) {
      if (wordToGuess[currentWordToGuessIndex][column] === letter) {
        return true;
      }
    }
    return false;
  }

  // const updateKeyboard = (letter, value) => {
  //   const updatedKeyboardData = {};//  { ...keyboardData };
  //   updatedKeyboardData[letter] = { value: value };
  //   setKeyboardData(keyboardData => ({ ...keyboardData, updatedKeyboardData }));
  //   console.log('updatedKeyboardData = ', updatedKeyboardData);
  // }
  const checkValidLetters = () => {
    const updatedKeyboardData = { ...keyboardData };
    const updatedMapValues = [...currentMapValues];
    let submittedWord = buildWordFromCurrentRow();

    for (let column = 0; column < maxWordLength; column++) {
      const letterToCheck = submittedWord[column];
      if (letterToCheck === wordToGuess[currentWordToGuessIndex][column]) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 2 };
        updatedKeyboardData['key-'+letterToCheck] = 2;
      } else if (doesLetterExistInWord(letterToCheck)) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 1 };
        if (updatedKeyboardData['key-' + letterToCheck] !== 2) {
          updatedKeyboardData['key-' + letterToCheck] = 1;
        }
      } else {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 0 };
        updatedKeyboardData['key-'+letterToCheck] = 0;
      }
    }
    setKeyboardData(updatedKeyboardData);
    setCurrentMapValues(updatedMapValues);
    // console.log('updatedKeyboardData = ', updatedKeyboardData);
    // console.log('updatedMapValues = ', updatedMapValues);
  }
  
  return (
    <Container>
      <Header />
      {!isWinner && !isLoser && <GameMap data={currentMapValues} row={currentRow} column={currentColumn} />}
      {isWinner && <Winner onClick={()=>handleClearWinner()}/>}
      {isLoser && <Loser onClick={()=>handleClearWinner()}/>}
      <Keyboard keyboardData={keyboardData} handleKeyPress={(e)=>handleKey(e)}/>
    </Container>
  );
}

export default App;
