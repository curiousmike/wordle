import { useState, useEffect, useContext } from 'react';
import { Container, LetterContainer } from './styles'

function SingleKey({ keyString, handleKeyPress, data }) {
    console.log('keyString, data = ', keyString, data);
    return (
        <Container onClick={()=>handleKeyPress(keyString)}>
            <LetterContainer>
                {keyString}
            </LetterContainer>
      </Container>
  );
}

export default SingleKey;
