import { useState, useEffect, useContext } from 'react';
import { Container, KeyboardRow } from './styles'
import SingleKey from '../singlekey';
const KeyboardRows = [
    [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    ],
    [
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    ],
    [
        'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<=',
    ],
];

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
            {KeyboardRows.map((row, k) => 
                <KeyboardRow key ={k}>
                    {row.map((keyValue, i) =>
                        <SingleKey keyString={keyValue} key={i} handleKeyPress={handleKeyPress} key={i} />
                    )}
                </KeyboardRow>
            )}
        </Container>
  );
}

export default Keyboard;
