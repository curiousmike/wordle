import { Container, LetterRow, LetterContainer } from './styles'

function GameMap({data, column, row, isWrongGuess}) {
    const wordLength = 5;
    const totalTries = 6;
    let rowOfLetters = [];
    const theRows = [];
    for (let j = 0; j < totalTries; j++) {
        for (let i = 0; i < wordLength; i++) {
            rowOfLetters.push(<LetterContainer reveal={data[j][i].reveal === 1} key={i} isCurrent={i === column && j === row} highlightResult={data[j][i].result}>{data[j][i].value}</LetterContainer>);
        }
        theRows.push(<LetterRow key={j} isWrongGuess={isWrongGuess && j === row}>{rowOfLetters}</LetterRow>);
        rowOfLetters = [];
    }
    return (
        <Container>
            {theRows}
      </Container>
  );
}

export default GameMap;
