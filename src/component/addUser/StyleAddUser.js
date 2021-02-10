import styled from 'styled-components';


export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid #6b705c;
  border-radius: 10px;
`;

export const Row = styled.div`
  diplay: flex;
  justify-content: space-between;
  margin: 10px 15px;
  padding: 10px 15px;
`;

export const Button = styled.button`
  color: #00b4d8;
  border: 1px solid #00b4d8;
  border-radius: 10px;
  padding 10px 15px;
  background-color: #00b4d8;
  color: white;
  float: right;
`;
