import React from 'react';
import {Button, Container, Title, Row} from '../login/StyleLogin'
const UpdateSobregiro = () => {
    return(
        <Container>
            <form action="http://localhost:8000/sobregiro.php/overdraft/update" method="post">
                <Title>
                    <h1>Actualizar estado sobregiro</h1>
                </Title>
                <Row>
                    <label>Id Sobregiro: </label>
                    <input type="text" name="id"/>
                </Row>
                <Row>
                    <label>Nuevo Estado Sobregiro: </label>
                    <input type="text" name="estado"/>
                </Row>
                <Button type="submit">Change State</Button>
            </form>
        </Container>
    );
}


export default UpdateSobregiro;