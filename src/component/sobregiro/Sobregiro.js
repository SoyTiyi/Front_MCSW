import React, { useState } from 'react'
import { Container, Title, Row, Button } from './StyleSobregiro';

const Sobregiro = () => {
    return (
        <Container>
            <form action="http://localhost:8000/sobregiro.php/overdraft/request" method="post">
                <Title>
                    <h1>Sobregiro</h1>
                </Title>
                <Row>
                    <label>Cuenta:</label>
                    <input type="text" name="account"/>
                </Row>
                <Button type="submit">Send</Button>
            </form>
        </Container>
    );
}

export default Sobregiro;