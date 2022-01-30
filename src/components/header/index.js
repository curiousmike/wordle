import { Container, Title, Subtitle, HintContainer, HintButton } from './styles'

function Header({level, animate, handleHint, isHintAvailable}) {

    return (
        <Container>
            <HintContainer>
                <HintButton disabled={!isHintAvailable} onClick={() => handleHint()}>Hint</HintButton>
            </HintContainer>
            <Title animate={animate}>
                Wordle Clone
            </Title>
            <Subtitle>
                Level {level + 1}
            </Subtitle>
      </Container>
  );
}

export default Header;
