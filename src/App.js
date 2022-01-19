import { useState } from 'react';
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
  
  const handleKey = (keyEvent) => {
    const map = [...currentMapValues];
    console.log('keyEvent = ', keyEvent, currentRow, currentColumn);
    if (keyEvent === backSpaceKey) {
      if (currentColumn > 0) {
        map[currentRow][currentColumn].value = '';
        setCurrentColumn(currentColumn - 1);
        map[currentRow][currentColumn - 1].value = '';
        setCurrentMapValues(map);
      }
    } else
      if (keyEvent === 'ENTER') {
        if (currentRow + 1 < maxRows) {
          setCurrentColumn(0);
          console.log('currentROW, nextROW = ', currentRow, currentRow + 1);
          setCurrentRow(currentRow + 1);
        } else {
          map[currentRow][currentColumn].value = keyEvent;
          setCurrentMapValues(map);
          if (currentColumn + 1 < maxWordLength) {
            setCurrentColumn(currentColumn + 1);
          }
        }
      }
  }
  console.log('currentMapValues = ', currentMapValues);
  return (
    <Container>
      <Header />
      <GameMap data={currentMapValues}/>
      <Keyboard handleKeyPress={(e)=>handleKey(e)}/>
    </Container>
  );
}

export default App;
