import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  height: 100%;
  min-width: 720px;
  color: lightgray;
  background-color: rgba(64, 64, 64, 1);
  overflow: hidden;
  text-shadow: 1px 1px #444444;
  `;

export const Title = styled.div`
align-self: center;
font-size: 24px;
font-weight: 800;
height: 10%;
`;

export const Body = styled.div`
align-self: center;
font-size: 24px;
font-weight: 800;
height: 80%;
`;

export const Footer = styled.div`
align-self: center;
font-size: 24px;
font-weight: 800;
height: 10%;
`;

export const Email = styled.a`
  color: white;
  font-size: 18px;
  font-weight: 600;
  &:link {
    color: white;
    text-decoration: none;
  }
`