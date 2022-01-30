import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 20%;
  min-height: 30%;
  min-width: 30%;
  color: lightgray;
  background-color: gray;
  padding: 8px;
  // outline: 2px solid red;
  outline: 3px solid #007AFF;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

export const Title = styled.div`
align-self: center;
font-size: 18px;
font-weight: 800;
`;

export const Line = styled.div`
  text-align: center;
`