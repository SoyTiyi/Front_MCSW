import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid #6b705c;
  border-radius: 10px;
  text-align: center;
`;

export const Row = styled.div`
    display: block;
    margin: 10px 15px;
    padding: 15px 15px;
`;

export const Button = styled.button`
    background-color: #0096c7;
    color: white;
    padding: 10px 15px;
    border: 1px solid #0096c7;
    margin: 10px 15px;
    border-radius: 10px;
    float: right;
`;

export const Title = styled.div`
    text-align: center;
`;