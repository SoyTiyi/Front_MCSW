import React from 'react';
import { Button, Container, Row, Title } from '../login/StyleLogin';

const CrearSobregiro = () => {
    return(
        <Container>
            <form action="http://localhost:8000/sobregiro.php/clients/add" method="post">
                <Title>
                    <h1>Crear Sobregiro</h1>
                </Title>
                <Row>
                    <label>Numero de cuenta: </label>
                    <input type="text" name="num_cuenta"/>
                </Row>
                <Row>
                    <label>Saldo: </label>
                    <input type="text" name="saldo"/>
                </Row>
                <Button type="submit">Crear</Button>
            </form>
        </Container>
    );
}

export default CrearSobregiro;