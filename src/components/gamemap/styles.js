import styled, {keyframes} from 'styled-components'
import { zoomIn, headShake } from 'react-animations';
const zoomInAnimation = keyframes`${zoomIn}`;
const headShakeAnimation = keyframes`${headShake}`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 75%;
  width: 100%;
  background-color: black;
  color: white;
`;

export const LetterRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 7%;
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
animation: 0.05s ${props => props.isCurrent ? zoomInAnimation : '' };
outline-width: 2px;
background-color: ${props => props.highlightResult === 2 ? 'rgb(83, 141, 78)' : props.highlightResult === 1 ? 'rgb(181, 159, 59)' : props.highlightResult === 0 ? 'rgb(58, 58, 60)' : 'black'};
min-width: 10%;
height: 100%;
margin: 8px;
font-size: 18px;
font-weight: 800;
`
