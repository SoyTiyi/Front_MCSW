import React, { useState } from 'react';
import { Button, Row } from '../allTransferences/StyleAllTransferences';
import { Container, Title } from './StyleModifyMoney';
import RequestService from './../../services/RequestService';

const ModifyMoney = () => {

  const [cuenta, setCuenta] = useState("");
  const [newValor, setNewValor] = useState("");

  const changeAmount = () => {

    let reqBody = `num_cuenta=${cuenta}&saldo=${newValor}`

    RequestService.post("/clients/modifyBalance", reqBody)
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
      alert(JSON.stringify(data.success))
      window.location.reload(false);
    })
  }

  return (
    <Container>
      <Title>
        <h1>Modificar saldo</h1>
      </Title>
      <Row>
        <label><b>Cuenta </b></label>
        <br /><br />
        <input type="text" maxLength="15" onChange={event => setCuenta(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Row>
        <label><b>Nuevo saldo </b></label>
        <br /><br />
        <input type="text" maxLength="10" onChange={event => setNewValor(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Button onClick={changeAmount}>Change</Button>
    </Container>
  );
}

export default ModifyMoney;
