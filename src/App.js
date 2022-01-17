import Header from './components/header';
import GameMap from './components/gamemap';
import Keyboard from './components/keyboard';
import { Container } from './styles'
function App() {
  return (
    <Container>
      <Header />
      <GameMap />
      <Keyboard handleKeyPress={(a)=>{console.log('key/click = ', a)}}/>
    </Container>
  );
}

export default App;
