import styled from 'styled-components'

export const Container = styled.div`
    color: white;
    background-color: ${props => props.keyColor > 0 ? 'rgb(83, 141, 78)' : props.keyColor === 0 ? 'rgb(58, 58, 60)' : 'gray'};
    background-color: ${props => props.goKey ? '#007AFF' : ''};
    min-width: 8%;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 4px;
`;

export const LetterContainer = styled.div`
    align-self: center;
    margin: 4px;
`;