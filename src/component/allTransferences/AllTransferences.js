import React, { useState, useEffect } from 'react'
import { Container, Table, Header, Cell, Button, Row } from './StyleAllTransferences';
import axios from 'axios';
const AllTransferences = () => {

    const [data, setData] = useState("");
    const [document, setDocument] = useState("");
    const url = "http://localhost:8000/trans.php/specific";

    const getTransaccionByDocument = () => {
        fetch(url, {
            method: "post",
            body: {cuenta: document}
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(`Error: ${error}`)
            })
    }

    const clickButton = () => {
        getTransaccionByDocument();
    }

    let showData = <p>Loading....</p>;

    if (data.length > 0) {
        showData = (
            data.map((transaction, index) => {
                return (
                    <tr key={index}>
                        <Cell>{transaction.origen}</Cell>
                        <Cell>{transaction.destino}</Cell>
                        <Cell>{transaction.bancoOrigen}</Cell>
                        <Cell>{transaction.bancoDestino}</Cell>
                        <Cell>{transaction.monto}</Cell>
                    </tr>
                );
            })
        );
    }

    return (
        <Container>
            <label>Cuenta</label>
            <input type="text" id="documento" placeholder="1234567" onChange={event => setDocument(event.target.value)} />
            <Button onClick={clickButton}>Show</Button>
            <Table>
                <tr>
                    <Header>Origen</Header>
                    <Header>Destino</Header>
                    <Header>Banco Origen</Header>
                    <Header>Banco Destino</Header>
                    <Header>Monto</Header>
                </tr>
                {showData}
            </Table>
        </Container>

    );
}

export default AllTransferences;