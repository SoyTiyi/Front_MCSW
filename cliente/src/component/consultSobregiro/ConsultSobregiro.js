import React from 'react';
import { Container, Row, Title } from '../login/StyleLogin';
import styled from 'styled-components'

const Button = styled.button`
    background-color: #0096c7;
    color: white;
    padding: 10px 15px;
    border: 1px solid #0096c7;
    margin: 10px 15px;
    border-radius: 10px;    
`;

const ConsultSobregiro = () => {
    return (
        <Container>
            <form action="http://localhost:8000/sobregiro.php/overdraft/consult" method="post">
                <Title>
                    <h1>Consultar Sobregiros</h1>
                </Title>
                <Row>
                    <label>Estado: </label>
                    <input type="text" name="state"/>
                </Row>
                <Button type="submit">Consult</Button>
            </form>
        </Container>
    );
}

export default ConsultSobregiro;