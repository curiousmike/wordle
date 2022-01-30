import styled, {keyframes} from 'styled-components'
import { bounce } from 'react-animations';
const bounceAnimation = keyframes`${bounce}`;

export const Container = styled.div`
  height: 7%;
  width: 100%;
  background-color: gray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;;
`;

export const Title = styled.div`
align-self: center;
font-size: 18px;
font-weight: 800;
margin-top: 2px;
animation: 1s ${props => props.animate ? bounceAnimation : '' };
`;

export const Subtitle = styled.div`
align-self: center;
font-size: 12px;
font-weight: 400;
color: lightgray;
margin: 0px 8px 8px 0px;
`;

export const HintContainer = styled.div`
  align-self: center;
  margin: 8px 8px 8px 8px;
`;

export const HintButton = styled.button`
  display:inline-block;
  padding:0.3em 1.2em;
  margin:0 0.3em 0.3em 0;
  border-radius:2em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  background-color:#4eb5f1;
  text-align:center;
  transition: all 0.2s;
  &:disabled {
    color: darkgray;
    background-color: black;
  }
`;