import { Container, Title, Subtitle } from './styles'

function Header({level, handleClick}) {

    return (
        <Container onClick={handleClick}>
            <Title>
                Wordle Clone
            </Title>
            <Subtitle>
                Level {level + 1}
            </Subtitle>
      </Container>
  );
}

export default Header;
