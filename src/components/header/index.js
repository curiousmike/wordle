import { Container, ReplayContainer, LeftContainer, Title, Subtitle, HintContainer, HintButton, OptionsContainer } from './styles'
import gear_icon from '../../images/gear.svg';

function Header({level, animate, handleHint, isHintAvailable, replayIndex, handleOptions, clearReplay, prevReplay, nextReplay}) {

    const isFirstReplayIndex = replayIndex === 0;
    return (
        <Container>
            <LeftContainer>
                <HintContainer>
                    <HintButton disabled={!isHintAvailable || replayIndex !== null} onClick={() => handleHint()}>Hint</HintButton>
                </HintContainer>
                {replayIndex === null && <OptionsContainer><img alt="Options" src={gear_icon} onClick={() => handleOptions()} /></OptionsContainer>}
                {replayIndex !== null &&
                    <ReplayContainer>
                        <HintButton disabled={isFirstReplayIndex} onClick={() => prevReplay()}>{isFirstReplayIndex ? 'done' : `Previous`}</HintButton>
                        <HintButton onClick={() => clearReplay()}>Stop</HintButton>
                        <HintButton onClick={() => nextReplay()}>Next</HintButton>
                    </ReplayContainer>}
            </LeftContainer>
            <Title animate={animate}>
                Wordle Practice
            </Title>
            <Subtitle>
                Level {replayIndex === null ? level + 1 : replayIndex + 1}
            </Subtitle>
      </Container>
  );
}

export default Header;
