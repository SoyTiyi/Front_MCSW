import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleTransference';
const Transference = () => {
    return (
        <Container>
            <form action="http://localhost:8000/trans.php/transaction/new" method="post">
                <Title>
                    <h1>Transference</h1>
                </Title>
                <Row>
                    <label>Destino:  </label>
                    <input type="text" name="destino"/>
                </Row>
                <Row>
                    <label>Origen:  </label>
                    <input type="text" name="origen"/>
                </Row>
                <Row>
                    <label>Monto:  </label>
                    <input type="text" name="saldo"/>
                </Row>
                <Row>
                    <label>Banco Destino:  </label>
                    <input type="text" name="banco_destino"/>
                </Row>
                <Button type="submit" >Enviar</Button>
            </form>
        </Container>

    );
}

export default Transference;