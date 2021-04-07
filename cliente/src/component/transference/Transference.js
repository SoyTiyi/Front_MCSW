import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Title } from './StyleTransference';
import axios from 'axios';

const Transference = () => {

  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [banco, setBanco] = useState("");

  const[cuenta, setCuenta] = useState("");

  useEffect(() => {
    const componentDidMount = async () => {

      console.log(window.localStorage.getItem("username"));

      var data = new FormData();
      data.append('usuario', window.localStorage.getItem("username"));

      const res = await axios.post('http://localhost:8000/user.php/clients/getAccount', data);
      setCuenta(res.data);
    };
    componentDidMount();
  }, []);

  const postTransaction = () => {

    var data = new FormData();
    data.append('origen', cuenta);
    data.append('destino', destino);
    data.append('banco_destino', banco);
    data.append('saldo', monto);

    axios.post('http://localhost:8000/trans.php/transaction/new', data)
    .then(response => {
      alert(response.data.estado);
      /* Falta implementar que pasa despues */
    })
    .catch(error => {
      console.log(`Error: ${error}`);
      alert("Error");
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
        <input type="text" id="banco_destino" onChange={event => setBanco(event.target.value)} style={{ width:"98%" }}/>
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
