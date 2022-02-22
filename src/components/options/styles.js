import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 5%;
  min-height: 75%;
  width: 50%;
  color: lightgray;
  background-color: rgba(128, 128, 128, 0.98);
  padding: 8px;
  outline: 3px solid #007AFF;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-shadow: 1px 1px #444444;
  `;

export const Title = styled.div`
align-self: center;
font-size: 24px;
font-weight: 800;
`;

export const Line = styled.div`
  text-align: center;
`