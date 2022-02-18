import { Container, LetterRow, LetterContainer } from './styles'

function GameMap({show, data, column, row, isWrongGuess}) {
    const wordLength = 5;
    const totalTries = 6;
    let rowOfLetters = [];
    const theRows = [];
    for (let j = 0; j < totalTries; j++) {
        for (let i = 0; i < wordLength; i++) {
            const isRevealing = data[j][i].winnerReveal || data[j][i].reveal;
            const isCurrentNode = (i === column && j === row) && !isRevealing;
            rowOfLetters.push(<LetterContainer 
                                    reveal={data[j][i].reveal === 1} 
                                    winnerReveal={data[j][i].winnerReveal === 1} 
                                    key={i} 
                                    isCurrent={isCurrentNode} 
                                    highlightResult={data[j][i].result}>
                                        {data[j][i].value}
                                </LetterContainer>);
        }
        theRows.push(<LetterRow key={j} isWrongGuess={isWrongGuess && j === row}>{rowOfLetters}</LetterRow>);
        rowOfLetters = [];
    }
    return (
        <Container>
            {show && theRows}
      </Container>
  );
}

export default GameMap;
