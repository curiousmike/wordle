import { Container, Title } from './styles'

function Loser({onClick}) {

    return (
        <Container onClick={()=>onClick()}>
            <Title>
                Lu-hu-hu-uuuuser
            </Title>
      </Container>
  );
}

export default Loser;
