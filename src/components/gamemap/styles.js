import styled, {keyframes} from 'styled-components'
import { pulse, headShake, flipInY } from 'react-animations';
const pulseAnimation = keyframes`${pulse}`;
const headShakeAnimation = keyframes`${headShake}`;
const flipInYAnimation = keyframes`${flipInY}`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 66%;
  width: 100%;
  background-color: black;
  color: white;
`;

export const LetterRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  @media (max-width: 768px) {
    height: 42px;
  }
  margin-bottom: 8px;
  animation: 0.5s ${props => props.isWrongGuess ? headShakeAnimation : '' };
`

export const LetterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
outline-style: solid;
outline-color: ${props => props.isCurrent ? 'LightBlue' : 'dimgrey'};
animation: ${props => props.reveal ? '1.5s' : props.winnerReveal ? 'infinite 0.5s': ''} ${props => props.reveal ? flipInYAnimation : props.winnerReveal ? pulseAnimation: ''};
outline-width: 2px;
background-color: ${props => props.highlightResult >= 2 ? 'rgb(83, 141, 78)' : props.highlightResult === 1 ? 'rgb(181, 159, 59)' : props.highlightResult === 0 ? 'rgb(58, 58, 60)' : 'black'};
outline-color: ${props => props.highlightResult === 3 ? 'red' : ''};
width: 60px;
@media (max-width: 768px) {
  width: 42px;
}

height: 100%;
margin: 8px;
font-size: 18px;
font-weight: 800;
`

