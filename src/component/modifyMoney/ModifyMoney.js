import React, { useState } from 'react';
import { Button, Row } from '../allTransferences/StyleAllTransferences';
import axios from 'axios';
import { Container, Title } from './StyleModifyMoney';

const ModifyMoney = () => {
    return (
        <Container>
            <form action="http://localhost:8000/user.php/clients/modifyBal" method="post">
                <Title>
                    <h1>Change Money</h1>
                </Title>
                <Row>
                    <label>Account Number: </label>
                    <input type="text" name="num_cuenta"/>
                </Row>
                <Row>
                    <label>New Amount: </label>
                    <input type="text" name="saldo"/>
                </Row>
                <Button type="submit">Change</Button>
            </form>
        </Container>
    );
}

export default ModifyMoney;