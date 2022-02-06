import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 20%;
  min-height: 30%;
  min-width: 30%;
  color: lightgray;
  background-color: rgba(128, 128, 128, 0.95);
  padding: 8px;
  // outline: 2px solid red;
  outline: 3px solid #007AFF;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;`;

export const Title = styled.div`
align-self: center;
font-size: 24px;
font-weight: 800;
`;

export const Line = styled.div`
  text-align: center;
`