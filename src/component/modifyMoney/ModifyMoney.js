import React, { useState } from 'react';
import { Button, Row } from '../allTransferences/StyleAllTransferences';
import axios from 'axios';
import { Container, Title } from './StyleModifyMoney';

const ModifyMoney = () => {

    const [cuenta, setCuenta] = useState("");
    const [newValor, setNewValor] = useState("");

    const url = "";
    const changeAmount = () => {
        axios.post(url, {
            cuenta: cuenta,
            valor: newValor
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    return (
        <Container>
            <Title>
                <h1>Change Money</h1>
            </Title>
            <Row>
                <label>Account Number: </label>
                <input type="text" onChange={event => setCuenta(event.target.value)} />
            </Row>
            <Row>
                <label>New Amount: </label>
                <input type="text" onChange={event => setNewValor(event.target.value)} />
            </Row>
            <Button onClick={changeAmount}>Change</Button>
        </Container>
    );
}

export default ModifyMoney;