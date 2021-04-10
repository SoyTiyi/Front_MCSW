import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid #6b705c;
  border-radius: 10px;
  margin-top: 10%;
  width: 20%;

`;

export const Row = styled.div`
    display: block;
    margin: 10px 15px;
    padding: 15px 15px;
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    background-color: #0096c7;
    color: white;
    padding: 10px 15px;
    border: 1px solid #0096c7;
    margin: 10px 15px;
    border-radius: 10px;
`;

export const Title = styled.div`
    text-align: center;
    margin-top: 5vh;
`;
