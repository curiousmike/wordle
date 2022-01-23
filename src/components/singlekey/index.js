import { Container, LetterContainer } from './styles'

function SingleKey({ keyString, handleKeyPress, data }) {
    const keyColor = data['key-' + keyString];
    return (
        <Container keyColor={keyColor} onClick={()=>handleKeyPress(keyString)}>
            <LetterContainer >
                {keyString}
            </LetterContainer>
      </Container>
  );
}

export default SingleKey;
