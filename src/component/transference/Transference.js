import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleTransference';
import axios from 'axios'
const Transference = () => {

    const [destino, setDestino] = useState("");
    const [origen, setOrigen] = useState("");
    const [monto, setMonto] = useState("");
    const [banco, setBanco] = useState("");

    const postTransaction = () => {
        axios.post('http://localhost:8000/trans.php/transaction/new', {
            destino: destino,
            origen: origen,
            saldo: monto,
            banco_destino: banco
        })
            .then(response => {
                console.log(response)
                /* Falta implementar que pasa despues */
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            })
    }

    return (
        <Container>
            <Title>
                <h1>Transference</h1>
            </Title>
            <Row>
                <label>Destino:  </label>
                <input type="text" id="destino" onChange={event => setDestino(event.target.value)} />
            </Row>
            <Row>
                <label>Origen:  </label>
                <input type="text" id="origen" onChange={event => setOrigen(event.target.value)} />
            </Row>
            <Row>
                <label>Monto:  </label>
                <input type="text" id="monto" onChange={event => setMonto(event.target.value)} />
            </Row>
            <Row>
                <label>Origen:  </label>
                <input type="text" id="origen" onChange={event => setBanco(event.target.value)} />
            </Row>
            <Button>Enviar</Button>
        </Container>

    );
}

export default Transference;