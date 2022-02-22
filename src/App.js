import { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import Instructions from './components/instructions';
import Alert from './components/alert';
import Options from './components/options';
import { Container } from './styles';
import { globalWordList } from "./globalWordList.js";
import { readLevel, setLevel, readGameState, saveGameState, saveGameResult } from './storage';
import { WordsToGuess } from './wordList';
import { doesLetterExistInWord, maxRows, maxWordLength, buildDefaultMap, keyboardConstants } from './utils';
import { hintRemoveKeys, hintGiveKeys, hintGiveLetterInLocation } from './hints';
const backSpaceKey = '<=';
let winnerAnimTimeoutID = null;
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
  const [preMapValues, setPreMapValues] = useState(buildDefaultMap());
  const [isWinner, setIsWinner] = useState(false);
  const [isWinnerAnim, setWinnerAnim] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isLoser, setIsLoser] = useState(false);
  const [keyboardData, setKeyboardData] = useState({});
  const [notWord, setNotWord] = useState(null);
  const [currentWordToGuessIndex, setCurrentWordToGuessIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isHintAvailable, setHintAvailable] = useState(true);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [currentHintStep, setCurrentHintStep] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  

  // waded / fazed - the D isn't shown correctly
  // idled / added - two d's
  // reset / haste - two e's
  // eerie / verse - test word
  // abyss / atlas - two a's
  // haste / taste 
  const doDebug = false; // true;
  const GlobalWordsToGuess = doDebug ? ['donor'] : WordsToGuess; 
  useEffect(() => {
    const level = readLevel();
    if (level) {
      setCurrentWordToGuessIndex(doDebug ? 0 : level);
    }

    const gameState = readGameState();
    if (gameState) {
      setCurrentMapValues(gameState.map);
      setKeyboardData(gameState.keyboard);
      setCurrentRow(gameState.row);
      setHintAvailable(false);
      setCurrentHintStep(gameState.hintStep);
      setCurrentStreak(gameState.currentStreak ? gameState.currentStreak : 0);
      setLongestStreak(gameState.longestStreak ? gameState.longestStreak : 0);
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

  const handleResetGame = () => {
    console.log('resetGame');
    saveGameResult(currentMapValues, currentWordToGuessIndex);
    setWinnerAnim(false);
    setCurrentHintStep(0);
    setHintAvailable(true);
    setIsWinner(false);
    setIsLoser(false);
    setCurrentRow(0);
    setCurrentColumn(0);
    const blankMap = buildDefaultMap();
    setCurrentMapValues(blankMap);
    const preMap = buildDefaultMap();
    setPreMapValues(preMap);
    setKeyboardData({});
    if (currentWordToGuessIndex + 1 < WordsToGuess.length) {
      setCurrentWordToGuessIndex(currentWordToGuessIndex + 1);
      setLevel(currentWordToGuessIndex + 1);
    } else {
      alert('no more words - email me me if you see this curiousmike@gmail.com');
    }
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (notWord) {
      if (key === keyboardConstants.ESCAPE || key === keyboardConstants.ENTER) {
        setNotWord(null);
        return;
      }
      return;
    }
    if (isWinner) {
      if (key === keyboardConstants.ESCAPE || key === keyboardConstants.ENTER) {
        clearTimeout(winnerAnimTimeoutID);
        handleResetGame();
      }
    } else if (!isWinnerAnim) {
      if (key === keyboardConstants.BACKSPACE) {
        handleKey('<=');
      } else {
        handleKey(key);
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
    saveGameState(currentMapValues, keyboardData, currentRow, currentHintStep, longestStreak, currentStreak);
  }, [currentMapValues, keyboardData, currentRow, currentHintStep, longestStreak, currentStreak]);

  const handleKey = (keyEvent) => {
    setNotWord(false);
    if (isWinner) {
      clearTimeout(winnerAnimTimeoutID);
      handleResetGame();
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
    } else if (keyEvent === keyboardConstants.ENTER || keyEvent === 'GO') {
        handleGoingToNextRow();
    }
    else if (keyEvent.length === 1 && keyEvent >= 'A' && keyEvent <= 'Z') {
      map[currentRow][currentColumn].value = keyEvent;
      setCurrentMapValues(map);
      if (currentColumn + 1 < maxWordLength) {
        setCurrentColumn(currentColumn + 1);
      }
    }
  }

  const handleGoingToNextRow = () => {
    const revealTime = 100;
    const map = [...currentMapValues];
    if (map[currentRow][currentColumn].value !== '' && currentColumn === maxWordLength - 1) {
      if (checkValidWord()) {
        checkValidLetters();
        for (let i = 0; i < maxWordLength; i++) {
          setTimeout(() => revealLetter(currentRow, i), i * revealTime);
        }
        setTimeout(() => finalizeNextRow(), revealTime * maxWordLength);
      }
    }
  }

  const revealLetter = (row, col) => {
    copyLetterIntoFinalMap(row, col);
    const map = [...currentMapValues];
    if (checkWinnerWord()) {
      map[row][col].winnerReveal = 1;  
    } else {
      map[row][col].reveal = 1;
    }
    setCurrentMapValues(map);
  }

  const finalizeNextRow = () => {
    if (checkWinnerWord()) {
      setWinnerAnim(true);
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(longestStreak + 1);
      }
      setTimeout(() => {
        setIsWinner(true);
        winnerAnimTimeoutID = setTimeout(() => {
          handleResetGame();
        }, 3000)
      }, 1500);
      return;
    }
    if (checkIsLoser()) {
      setCurrentStreak(0);
      setTimeout(() => {
        setIsLoser(true);
      }, 1000);
      return;
    }
    setCurrentColumn(0);
    setCurrentRow(currentRow + 1);
    if (currentRow === 2 || currentRow === 4) {
      setHintAvailable(true);
    }
    updateKeyboardValues();
  }

  const updateKeyboardValues = () => {
    const updatedKeyboardData = { ...keyboardData };
    for (let col = 0; col < maxWordLength; col++) {
      const colValue = currentMapValues[currentRow][col];
      const key = colValue.value.toLowerCase();
      if (updatedKeyboardData['key-' + key]) {
        if (updatedKeyboardData['key-' + key] < colValue.result) {
          updatedKeyboardData['key-' + key] = colValue.result;          
        }
      } else {
        updatedKeyboardData['key-' + key] = colValue.result;
      }
    }
    setKeyboardData(updatedKeyboardData);
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
    const updatedMapValues = [...preMapValues];
    let submittedWord = buildWordFromCurrentRow();
    const letterCounts = generateLetterCounts();
    // do check for right letter in right column
    for (let column = 0; column < maxWordLength; column++) {
      const letterToCheck = submittedWord[column].toLowerCase();
      if (letterToCheck === GlobalWordsToGuess[currentWordToGuessIndex][column]) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 2 };
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
      }
    }
    // do check for letters that are not in word
    for (let column = 0; column < maxWordLength; column++) {
      if (!updatedMapValues[currentRow][column].result) {
        updatedMapValues[currentRow][column] = { value: currentMapValues[currentRow][column].value, result: 0 };
      }
    }
    setPreMapValues(updatedMapValues);
  }

  const copyLetterIntoFinalMap = (r, c) => {
    const updatedMapValues = [...currentMapValues];
    updatedMapValues[r][c] = preMapValues[r][c];
    setCurrentMapValues((prev) => ( {...prev, ...updatedMapValues}));
  }
  

  const clearInstructions = () => {
    setShowInstructions(false);
    setAnimateHeader(true);
  }
  
  const handleHint = () => {
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
  const showGameMap =  !showInstructions;
  const showKeyboard = !showInstructions;

  return (
    <Container>
      <Header
        animate={animateHeader}
        level={currentWordToGuessIndex}
        isHintAvailable={!showInstructions && isHintAvailable}
        handleOptions={()=>setShowOptions(true)}
        handleHint={() => handleHint()} />
      {showOptions &&
        <Options text={['options']} onClick={()=>setShowOptions(false)}/>
      }
      {!showInstructions &&
        <GameMap
          show={showGameMap}
          data={currentMapValues}
          row={currentRow}
          column={currentColumn}
          isWrongGuess={notWord}
          />}
      {showInstructions &&
        <Instructions onClick={() => clearInstructions()} />}
      {isWinner &&
        <Alert
          text={['Winner !', GlobalWordsToGuess[currentWordToGuessIndex], getGrade(), `Current streak ${currentStreak}`, `Longest Streak ${longestStreak}`]}
          onClick={() => handleResetGame()} />}
      {isLoser &&
        <Alert
          text={['Sorry!', 'Try next word.', `Current streak ${currentStreak}`, `Longest Streak ${longestStreak}`]}
          onClick={() => handleResetGame()} />}
      {notWord &&
        <Alert
          text={[notWord, 'is not a word']}
          onClick={() => setNotWord(null)} />}
      {!showInstructions &&
        <Keyboard
          keyboardData={keyboardData}
          handleKeyPress={(e) => handleKey(e)}
          visible={showKeyboard} />}
    </Container>
  );
}

export default App;
