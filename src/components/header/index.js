import { Container, LeftContainer, Title, Subtitle, HintContainer, HintButton, OptionsContainer } from './styles'
import gear_icon from '../../images/gear.svg';

function Header({level, animate, handleHint, isHintAvailable, handleOptions}) {

    return (
        <Container>
            <LeftContainer>
                <HintContainer>
                    <HintButton disabled={!isHintAvailable} onClick={() => handleHint()}>Hint</HintButton>
                </HintContainer>
                <OptionsContainer><img alt="Options" src={gear_icon} onClick={() => handleOptions()}/></OptionsContainer>
            </LeftContainer>
            <Title animate={animate}>
                Wordle Practice
            </Title>
            <Subtitle>
                Level {level + 1}
            </Subtitle>
      </Container>
  );
}

export default Header;
