import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Title } from './StyleTransference';
import axios from 'axios';
import DropDownInput  from './../listas/DropDownInput';
import { bancosValidos }  from './../listas/TablesInfo';
import RequestService from './../../services/RequestService';

const Transference = () => {

  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [banco, setBanco] = useState("");

  const[cuenta, setCuenta] = useState("");


  const postTransaction = () => {

    let reqBody = `cuenta_destino=${destino}&banco_destino=${banco}&saldo=${monto}`

    RequestService.post("/clients/transactions/new", reqBody)
    .then(response => {
      if (!response.ok) {
        alert("Datos inválidos")
        window.location.reload(false);
        return
      }
      return response
    })
    .then(response => response.json())
    .then(data => {
      alert("Transacción creada con éxito")
      window.location.reload(false);
    })
  }

  return (
    <Container>
      <Title>
        <h1>Transferencia</h1>
      </Title>
      <br /><br />
      <Row>
        <label><b>Cuenta destino  </b></label>
        <br /><br />
        <input type="text" id="destino" onChange={event => setDestino(event.target.value)} style={{ width:"98%" }}/>
      </Row>
      <Row>
        <label><b>Banco </b></label>
          <br /><br />
          <DropDownInput values={bancosValidos} name="bancosValidos" currentValue={banco} setChange={setBanco} divStyle={{width: '100%'}} />
      </Row>
      <Row>
        <label><b>Monto </b></label>
          <br /><br />
        <input type="text" id="monto" onChange={event => setMonto(event.target.value)} style={{ width:"98%" }}/>
      </Row>
      <Button type="button" onClick={postTransaction} >Enviar</Button>
    </Container>

  );
}

export default Transference;
