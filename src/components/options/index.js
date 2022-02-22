import { Container, Title, Line } from './styles'

function Options({onClick, text}) {
    return (
        <Container onClick={()=>onClick()}>
            <Title>
                {text.map((line, index) => ( 
                    <Line key={index}>
                        {line}
                    </Line>
                ))}
            </Title>
      </Container>
  );
}

export default Options;
