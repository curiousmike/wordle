import { Container, LeftContainer, Title, Subtitle, HintContainer, HintButton, OptionsContainer } from './styles'
import gear_icon from '../../images/gear.svg';

function Header({level, animate, handleHint, isHintAvailable, replayIndex, handleOptions, clearReplay}) {

    return (
        <Container>
            <LeftContainer>
                <HintContainer>
                    <HintButton disabled={!isHintAvailable || replayIndex !== null} onClick={() => handleHint()}>Hint</HintButton>
                </HintContainer>
                {replayIndex === null && <OptionsContainer><img alt="Options" src={gear_icon} onClick={() => handleOptions()} /></OptionsContainer>}
                {replayIndex !== null && <HintButton onClick={() => clearReplay(false)}>Stop Replay {replayIndex + 1}</HintButton>}
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
