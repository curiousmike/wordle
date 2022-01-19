import { Container, LetterRow, LetterContainer } from './styles'

function GameMap({data}) {
    const wordLength = 5;
    const totalTries = 6;

    let rowOfLetters = [];
    const theRows = [];
    for (let j = 0; j < totalTries; j++) {
        for (let i = 0; i < wordLength; i++) {
            rowOfLetters.push(<LetterContainer key={i}>{data[j][i].value}</LetterContainer>);
        }
        theRows.push(<LetterRow key={j}>{rowOfLetters}</LetterRow>);
        rowOfLetters = [];
    }
    return (
        <Container>
            {theRows}
      </Container>
  );
}

export default GameMap;
