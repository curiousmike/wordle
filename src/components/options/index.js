import { Container, Title, Body, Footer,Email } from './styles'

function Options({onClick, handleReplay}) {
    return (
        <Container onClick={()=>onClick()}>
            <Title>
                Settings
            </Title>
            <Body onClick={()=>handleReplay()}>
                Review past games
            </Body>
            <Footer>
                Questions or comments ->
                <Email href="mailto:curiousmike@gmail.com"> curiousmike@gmail.com</Email>
            </Footer>
      </Container>
  );
}

export default Options;
