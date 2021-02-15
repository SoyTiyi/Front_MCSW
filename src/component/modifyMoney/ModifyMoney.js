import React, { useState } from 'react';
import { Button, Row } from '../allTransferences/StyleAllTransferences';
import axios from 'axios';
import { Container, Title } from './StyleModifyMoney';

const ModifyMoney = () => {

  const [cuenta, setCuenta] = useState("");
  const [newValor, setNewValor] = useState("");

  const changeAmount = () => {

      var data = new FormData();
      data.append('num_cuenta', cuenta);
      data.append('saldo', newValor);

      axios.post("http://localhost:8000/user.php/clients/modifyBal", data)
          .then(response => {
              console.log(response);
              alert("Ok");
              window.location.reload(false);

          })
          .catch(error => {
            console.log(`Error: ${error}`)
            alert("Error")
            window.location.reload(false);

          });
  }

  return (
      <Container>
          <Title>
              <h1>Modificar saldo</h1>
          </Title>
          <Row>
              <label><b>Cuenta </b></label>
              <br /><br />
              <input type="text" onChange={event => setCuenta(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Row>
              <label><b>Nuevo saldo </b></label>
              <br /><br />
              <input type="text" onChange={event => setNewValor(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Button onClick={changeAmount}>Change</Button>
      </Container>
  );
}

export default ModifyMoney;
