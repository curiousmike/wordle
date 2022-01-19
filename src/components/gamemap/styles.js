import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  height: 75vh;
  width: 100%;
  background-color: black;
  color: white;
`;

export const LetterRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
export const LetterContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
outline-style: solid;
outline-color: dimgrey;
outline-width: 2px;
min-width: 10%;
height: 5vh;
margin: 8px;
font-size: 18px;
font-weight: 800;
`
