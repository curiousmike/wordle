import { Container, Title } from './styles'

function NotWord({onClick, word}) {

    return (
        <Container onClick={()=>onClick()}>
            <Title>
                Not a word - {word}
            </Title>
      </Container>
  );
}

export default NotWord;
