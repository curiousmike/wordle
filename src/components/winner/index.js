import { Container, Title } from './styles'

function Winner({onClick}) {

    return (
        <Container onClick={()=>onClick()}>
            <Title>
                Winner
            </Title>
      </Container>
  );
}

export default Winner;
