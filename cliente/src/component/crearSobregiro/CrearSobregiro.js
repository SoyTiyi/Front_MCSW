import React, { useState } from 'react'
import { Button, Buttons, Container, Row, Title } from '../login/StyleLogin';
import axios from 'axios';

const CrearSobregiro = () => {

  const[saldo, setSaldo] = useState("");

  const[cuenta, setCuenta] = useState("");

  const post = () => {
    console.log(cuenta,saldo);

    var data = new FormData();
    data.append('num_cuenta', cuenta);
    data.append('saldo', saldo);

    const res = axios.post('http://localhost:8000/sobregiro.php/clients/add', data)
    .then(response => {
      alert("Ok");
      window.location.reload(false);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
      alert("Error");
    })

  }

  return(
    <Container>

      <Title>
        <h1>Crear Sobregiro</h1>
      </Title>
      <Row>
        <label><b>Numero de cuenta </b></label>
        <br /><br />
        <input type="text" name="num_cuenta" maxLength="15" onChange={event => setCuenta(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Row>
        <label><b>Saldo </b></label>
        <br /><br />
        <input type="text" name="saldo" maxLength="10" onChange={event => setSaldo(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Buttons>
        <Button type="submit" onClick={post}>Crear</Button>
      </Buttons>

    </Container>
  );
}

export default CrearSobregiro;
