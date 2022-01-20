import { useState, useEffect, useRef } from 'react';
import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import { Container } from './styles';
const maxWordLength = 5;
const maxRows = 6;
const backSpaceKey = '<=';
const defaultMap = [
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''},],
];
function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [currentMapValues, setCurrentMapValues] = useState(defaultMap);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyPress = (e) => {
    if (e.key === 'Backspace') {
      handleKey('<=');
    } else {
      handleKey(e.key.toUpperCase());
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
        if (map[currentColumn][currentRow] !== '' && currentColumn === maxWordLength - 1) {
          if (currentRow + 1 < maxRows) {
            setCurrentColumn(0);
            // console.log('currentROW, nextROW = ', currentRow, currentRow + 1);
            setCurrentRow(currentRow + 1);
          }
        }
    }
    else {
      map[currentRow][currentColumn].value = keyEvent;
      setCurrentMapValues(map);
      if (currentColumn + 1 < maxWordLength) {
        setCurrentColumn(currentColumn + 1);
      }
    }
  }
  // console.log('currentMapValues = ', currentMapValues[0][0], currentMapValues[0][1], currentMapValues[0][2], currentMapValues[0][3], currentMapValues[0][4]);
  return (
    <Container>
      <Header />
      <GameMap data={currentMapValues} row={currentRow} column={currentColumn}/>
      <Keyboard handleKeyPress={(e)=>handleKey(e)}/>
    </Container>
  );
}

export default App;
