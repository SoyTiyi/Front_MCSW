import React, { useState } from 'react'
import { Container, Title, Row, Button } from './StyleSobregiro';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Sobregiro = () => {

  const history = useHistory();

  const[cuenta, setCuenta] = useState("");
  const[saldo, setSaldo] = useState("");

  const routeChange = () => {
      let path = '/register';
      history.push(path);
  }

  const postLogin = () => {
      console.log(cuenta,saldo);

      var data = new FormData();
      data.append('num_cuenta', cuenta);
      data.append('saldo', saldo);

      const res = axios.post('http://localhost:8000/sobregiro.php/clients/add', data)

  }


    return (
        <Container>
          <Title>
              <h1>Sobregiro</h1>
          </Title>
          <Row>
              <label>Cuenta: </label>
            <input type="text" name="cuenta" onChange={event => setCuenta(event.target.value)}/>
          </Row>
          <Row>
              <label>Saldo: </label>
            <input type="text" name="saldo" onChange={event => setSaldo(event.target.value)}/>
          </Row>

          <Button onClick={postLogin}>Enviar</Button>

        </Container>
    );
}

export default Sobregiro;
