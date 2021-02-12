import React, { useState } from 'react'
import { Container, Title, Row, Button } from './StyleSobregiro';
import axios from 'axios';

const Sobregiro = () => {
    const [account, setAccount] = useState("");
    const url = "http://localhost:8000/user.php/overdraft/request";

    const solicitarSobregiro = () => {
        fetch(url, {
            method: "post",
            account: account
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            })
    }
    return (
        <Container>
            <Title>
                <h1>Sobregiro</h1>
            </Title>
            <Row>
                <label>Cuenta:</label>
                <input type="text" onChange={event => setAccount(event.target.value)}/>
            </Row>
            <Button onClick={solicitarSobregiro}>Send</Button>
        </Container>
    );
}

export default Sobregiro;