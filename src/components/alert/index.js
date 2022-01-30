import { Container, Title, Line } from './styles'

function Alert({onClick, text}) {
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

export default Alert;
