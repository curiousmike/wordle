import { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import Winner from './components/winner';
import Loser from './components/loser';
import Instructions from './components/instructions';
import NotWord from './components/notWord';
import { Container } from './styles';
import { globalWordList } from "./globalWordList.js";
import { readLevel, setLevel } from './storage';
import { WordsToGuess }  from './wordList';
const maxWordLength = 5;
const maxRows = 6;
const backSpaceKey = '<=';
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

// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight();

const doDebug = true; // true;

function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentMapValues, setCurrentMapValues] = useState(buildDefaultMap());
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);
  const [keyboardData, setKeyboardData] = useState({});
  const [notWord, setNotWord] = useState(null);
  const [currentWordToGuessIndex, setCurrentWordToGuessIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [cheatCount, setCheatCount] = useState(0);
  const [animateHeader, setAnimateHeader] = useState(false);
  
  // waded / fazed - the D isn't shown correctly
  // idled / added - two d's
  const GlobalWordsToGuess = doDebug ? ['haste'] : WordsToGuess; 
  useEffect(() => {
    const value = readLevel();
    if (value) {
      setCurrentWordToGuessIndex(doDebug ? 0 : value);
    }
  }, []); // empty second argument = "componentDidMount"

  const handleClearWinner = () => {
    setIsWinner(false);
    setIsLoser(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    const blankMap = buildDefaultMap();
    setCurrentMapValues(blankMap);
    setKeyboardData({});
    setCurrentWordToGuessIndex(currentWordToGuessIndex + 1);
    setLevel(currentWordToGuessIndex + 1);
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (e) => {
    if (notWord) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        setNotWord(null);
        return;
      }
    }
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
    setNotWord(false);
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
      if (keyEvent === 'ENTER' || keyEvent === 'GO') {
        if (map[currentRow][currentColumn].value !== '' && currentColumn === maxWordLength - 1) {
          if (checkWinnerWord()) {
            setIsWinner(true);
            return;
          }
          if (checkIsLoser()) {
            setIsLoser(true);
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
    const submittedWord = buildWordFromCurrentRow().toLowerCase();
    return submittedWord === GlobalWordsToGuess[currentWordToGuessIndex];
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
    if (!isValid) {
      setNotWord(submittedWord);
    }
    return isValid;
  }

  const doesLetterExistInWord = (letter) => {
    for (let column = 0; column < GlobalWordsToGuess[currentWordToGuessIndex].length; column++) {
      if (GlobalWordsToGuess[currentWordToGuessIndex][column] === letter.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  const generateLetterCounts = () => {
    const counts = {};
    [...GlobalWordsToGuess[currentWordToGuessIndex]].forEach((letter) => {
      if (counts[letter]) {
        counts[letter].count = counts[letter].count + 1;
      } else {
        counts[letter] = {count: 1}
      }
    });
    return counts;
  }
  const checkValidLetters = () => {
    const updatedKeyboardData = { ...keyboardData };
    const updatedMapValues = [...currentMapValues];
    let submittedWord = buildWordFromCurrentRow();
    const letterCounts = generateLetterCounts();
    // do check for right letter in right column
    for (let column = 0; column < maxWordLength; column++) {
      const letterToCheck = submittedWord[column].toLowerCase();
      if (letterToCheck === GlobalWordsToGuess[currentWordToGuessIndex][column]) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 2 };
        updatedKeyboardData['key-' + letterToCheck] = 2;
        letterCounts[letterToCheck].used = letterCounts[letterToCheck].used ? letterCounts[letterToCheck].used + 1 : letterCounts[letterToCheck].used = 1;
      }
    }
    // do check for letter in word, but not in right spot
    for (let column = 0; column < maxWordLength; column++) {
      const letterToCheck = submittedWord[column].toLowerCase();
      // console.log('letterToCheckCounts - ', letterToCheck, letterCounts[letterToCheck] ? letterCounts[letterToCheck].used : 'missing')
      const letterDone = letterCounts[letterToCheck] ? letterCounts[letterToCheck].used === letterCounts[letterToCheck].count : false;
      if (doesLetterExistInWord(letterToCheck) && !letterDone && !updatedMapValues[currentRow][column].result) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 1 };
        if (updatedKeyboardData['key-' + letterToCheck] !== 2) {
          updatedKeyboardData['key-' + letterToCheck] = 1;
        }
      }
    }
    // do check for letters that are not in word
    for (let column = 0; column < maxWordLength; column++) {
      const letterToCheck = submittedWord[column].toLowerCase();
      if (!updatedMapValues[currentRow][column].result) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 0 };
        if (updatedKeyboardData['key-' + letterToCheck] !== 1 && updatedKeyboardData['key-' + letterToCheck] !== 2) {
          updatedKeyboardData['key-' + letterToCheck] = 0;
        }
      }
    }
    console.log('letterCounts = ', letterCounts);
    setKeyboardData(updatedKeyboardData);
    setCurrentMapValues(updatedMapValues);
  }
  
  const handleCheat = () => {
    setCheatCount(cheatCount + 1);
    if (cheatCount + 1 >= 3) {
      alert('word = ' + GlobalWordsToGuess[currentWordToGuessIndex]);
      setCheatCount(0);
    }
  }

  const clearInstructions = () => {
    setShowInstructions(false);
    setAnimateHeader(true);
  }

  const showGameMap = !isWinner && !isLoser && !showInstructions;
  const showKeyboard = !showInstructions;
  return (
    <Container>
      <Header animate={animateHeader} level={currentWordToGuessIndex} handleClick={() => handleCheat()}/>
      {showGameMap && <GameMap data={currentMapValues} row={currentRow} column={currentColumn} isWrongGuess={notWord}/>}
      {showInstructions && <Instructions onClick={() => clearInstructions()} />}
      {isWinner && <Winner onClick={()=>handleClearWinner()}/>}
      {isLoser && <Loser onClick={() => handleClearWinner()} />}
      {notWord && <NotWord word={notWord} onClick={()=>setNotWord(null)}/>}
      {!showInstructions && <Keyboard keyboardData={keyboardData} handleKeyPress={(e) => handleKey(e)} visible={showKeyboard} />}
    </Container>
  );
}

export default App;
