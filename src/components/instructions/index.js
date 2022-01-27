import { Container, Title, ImageContainer, Line, GreenLetter, YellowLetter, BlackLetter, StartTitle } from './styles'
import instruction_image from '../../images/instructions_1.jpg';

function Instructions({onClick}) {

    return (
        <Container onClick={()=>onClick()}>
            <Title>
                Instructions
            </Title>
            <ImageContainer>
                <img src={instruction_image} alt="instruction" width="200" ></img>
            </ImageContainer>
            <Line>
                You have six attempts to guess the word.
            </Line>
            <Line>
                Each guess must be an actual word.
            </Line>
            <Line>
                Letters that are both correct letter AND in the correct slot are <GreenLetter>GREEN.</GreenLetter>
            </Line>
            <Line>
                Letters that are correct but in the wrong slot are <YellowLetter>YELLOW.</YellowLetter>
            </Line>
            <Line>
                Letters that are not in the puzzle are <BlackLetter>BLACK.</BlackLetter>
            </Line>
            <StartTitle>
                Click or Tap to start !
            </StartTitle>
      </Container>
  );
}

export default Instructions;
