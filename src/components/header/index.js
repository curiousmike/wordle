import { Container, Title, Subtitle } from './styles'

function Header({level, handleClick, animate}) {

    return (
        <Container onClick={handleClick}>
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
