import { useState, useEffect, useContext } from 'react';
import { Container, KeyboardRow } from './styles'
import SingleKey from '../singlekey';
const KeyboardRows1 = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
];
const KeyboardRows2 = [
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
];
const KeyboardRows3 = [
    'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<=',
];
function Keyboard({handleKeyPress}) {
    return (
        <Container>
            <KeyboardRow>
                {KeyboardRows1.map((keyValue, i) =>
                    <SingleKey keyString={keyValue} key={i} handleKeyPress={handleKeyPress} />
                )}
            </KeyboardRow>
            <KeyboardRow>
                {KeyboardRows2.map((keyValue, i) =>
                    <SingleKey keyString={keyValue} key={i} handleKeyPress={handleKeyPress} />
                )}
            </KeyboardRow>
            <KeyboardRow>
                {KeyboardRows3.map((keyValue, i) =>
                    <SingleKey keyString={keyValue} key={i} handleKeyPress={handleKeyPress} />
                )}
            </KeyboardRow>
        </Container>
  );
}

export default Keyboard;
