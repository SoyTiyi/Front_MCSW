import React from 'react';
import { Container, Table, Header, Cell, Button, Row } from '../allTransferences/StyleAllTransferences';
import { Title } from '../login/StyleLogin';

const OficalAllTransference = () => {
    return (
        <Container>
            <form action="http://localhost:8000/trans.php/transaction/actions" method="post">
                <Title>
                    All transferences
                </Title>
                <Row>
                    <label>Cuenta</label>
                    <input type="text" name="cuenta" placeholder="1234567" />
                </Row>
                <Button type="submit">Show</Button>
            </form>
        </Container>
    );
}

export default OficalAllTransference;