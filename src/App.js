import { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import Instructions from './components/instructions';
import Alert from './components/alert';
import { Container } from './styles';
import { globalWordList } from "./globalWordList.js";
import { readLevel, setLevel, readGameState, saveGameState } from './storage';
import { WordsToGuess } from './wordList';
import { doesLetterExistInWord, maxRows, maxWordLength, buildDefaultMap } from './utils';
import { hintRemoveKeys, hintGiveKeys, hintGiveLetterInLocation } from './hints';
const backSpaceKey = '<=';

// This "appHeight" is the "fix" for iOS safari representing vh differently based on whether their footer is visible.
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
  const [notWord, setNotWord] = useState(null);
  const [currentWordToGuessIndex, setCurrentWordToGuessIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isHintAvailable, setHintAvailable] = useState(true);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [currentHintStep, setCurrentHintStep] = useState(0);
  

  // waded / fazed - the D isn't shown correctly
  // idled / added - two d's
  // reset / haste - two e's
  // eerie / verse - test word
  const doDebug = false; // true;
  const GlobalWordsToGuess = doDebug ? ['haste'] : WordsToGuess; 
  useEffect(() => {
    const level = readLevel();
    if (level) {
      setCurrentWordToGuessIndex(doDebug ? 0 : level);
    }

    const gameState = readGameState();
    if (gameState) {
      console.log('gameState = ', gameState);
      setCurrentMapValues(gameState.map);
      setKeyboardData(gameState.keyboard);
      setCurrentRow(gameState.row);
      setHintAvailable(false);
      setCurrentHintStep(gameState.hintStep);
      if (gameState.hintStep === 0) {
        setHintAvailable(true);
      }
      if ( (gameState.row >= 2 && gameState.row <= 4) && gameState.hintStep === 1) {
          setHintAvailable(true);
      }
      if ( (gameState.row >= 4 ) && gameState.hintStep <= 2) {
          setHintAvailable(true);
      }
    }
  }, []); // empty second argument = "componentDidMount"

  const handleClearWinner = () => {
    setCurrentHintStep(0);
    setHintAvailable(true);
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

  useEffect(() => {
    saveGameState(currentMapValues, keyboardData, currentRow, currentHintStep);
  }, [currentMapValues, keyboardData, currentRow, currentHintStep]);

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
            setCurrentRow(currentRow + 1);
            if (currentRow === 2 || currentRow === 4) {
              setHintAvailable(true);
            }
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
      setTimeout(() => {
        setNotWord(null);
      }, 1000);
    }
    return isValid;
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
      const letterDone = letterCounts[letterToCheck] ? letterCounts[letterToCheck].used === letterCounts[letterToCheck].count : false;
      if (doesLetterExistInWord(GlobalWordsToGuess[currentWordToGuessIndex], letterToCheck) && !letterDone && !updatedMapValues[currentRow][column].result) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 1 };
        letterCounts[letterToCheck].used ? letterCounts[letterToCheck].used++ : letterCounts[letterToCheck].used = 1;
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
    setKeyboardData(updatedKeyboardData);
    setCurrentMapValues(updatedMapValues);
  }
  

  const clearInstructions = () => {
    setShowInstructions(false);
    setAnimateHeader(true);
  }
  
  const handleHint = () => {
    console.log('word = ', GlobalWordsToGuess[currentWordToGuessIndex]);
    if (isHintAvailable) {
      if (currentHintStep === 0) {
        const updatedKeyboardData = hintRemoveKeys(GlobalWordsToGuess[currentWordToGuessIndex], keyboardData);
        setKeyboardData(updatedKeyboardData);
      } else if (currentHintStep === 1) {
        const updatedKeyboardData = hintGiveKeys(GlobalWordsToGuess[currentWordToGuessIndex], keyboardData);
        setKeyboardData(updatedKeyboardData);
      } else {
        const updatedMap = hintGiveLetterInLocation(GlobalWordsToGuess[currentWordToGuessIndex], currentMapValues, currentRow);
        setCurrentMapValues(updatedMap);
      }
      setCurrentHintStep(currentHintStep + 1);
      setHintAvailable(false);
    }
  }

  const getGrade = () => {
    const grades = ['A', 'B', 'C', 'D'];
    return `Grade ${grades[currentHintStep]}`;
  }
  const showGameMap = !isWinner && !isLoser && !showInstructions;
  const showKeyboard = !showInstructions;
  return (
    <Container>
      <Header animate={animateHeader} level={currentWordToGuessIndex} isHintAvailable={!showInstructions && isHintAvailable}  handleHint={() => handleHint()}/>
      {showGameMap && <GameMap data={currentMapValues} row={currentRow} column={currentColumn} isWrongGuess={notWord}/>}
      {showInstructions && <Instructions onClick={() => clearInstructions()} />}
      {isWinner && <Alert text={['Winner !', getGrade()]} onClick={()=>handleClearWinner()}/>}
      {isLoser && <Alert text={ ['Sorry!', 'Try next word.']}onClick={() => handleClearWinner()} />}
      {notWord &&  <Alert text={[notWord, 'is not a word']} onClick={()=>setNotWord(null)}/>}
      {!showInstructions && <Keyboard keyboardData={keyboardData} handleKeyPress={(e) => handleKey(e)} visible={showKeyboard} />}
    </Container>
  );
}

export default App;
