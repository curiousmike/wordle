import styled, {keyframes} from 'styled-components'
import { bounce } from 'react-animations';
const bounceAnimation = keyframes`${bounce}`;

export const Container = styled.div`
  height: 7%;
  width: 100%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
align-self: center;
font-size: 18px;
font-weight: 800;
margin-top: 2px;
animation: 1s ${bounceAnimation};
`;

export const Subtitle = styled.div`
align-self: center;
font-size: 12px;
font-weight: 400;
color: lightgray;
margin-bottom: 8px;
`;
