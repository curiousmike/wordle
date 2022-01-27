import { Container, LetterContainer } from './styles'

function SingleKey({ keyString, handleKeyPress, data }) {
    const keyColor = data['key-' + keyString.toLowerCase()];
    return (
        <Container goKey={keyString === 'GO'} keyColor={keyColor} onClick={()=>handleKeyPress(keyString)}>
            <LetterContainer >
                {keyString}
            </LetterContainer>
      </Container>
  );
}

export default SingleKey;
