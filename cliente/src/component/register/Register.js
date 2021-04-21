import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleRegister';
import { useHistory } from 'react-router-dom';
import RequestService from './../../services/RequestService';

const Register = () => {

  const [document, setDocument] = useState("");
  const [user, setUser] = useState("");
  const [passwd, setPasswd] = useState("");
  const history = useHistory();


  const postRegUser = props => {
    alert(document)

    let reqBody = `documento=${document}&usuario=${user}&passwd=${passwd}`

    RequestService.post("/signup", reqBody)
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
      if(data.success) {
          alert("Usuario creado con éxito")
          history.push('/')
      }
      else {
        alert("Datos inválidos")
      }
      window.location.reload(false);
    })
  }

  return (
    <Container>
      <Title>
        <h1>Register</h1>
      </Title>
      <Row>
        <label><b>Documento </b></label>
        <br /><br />
        <input type="text" maxLength="10" name="documento" onChange={event => setDocument(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Row>
        <label><b>Usuario </b></label>
        <br /><br />
        <input type="text" maxLength="15" name="usuario" onChange={event => setUser(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Row>
        <label><b>Contraseña </b></label>
        <br /><br />
        <input type="password" maxLength="64" name="passwd" onChange={event => setPasswd(event.target.value)} style={{ width:"100%" }}/>
      </Row>
      <Button type="submit" onClick={postRegUser}>Enter</Button>
    </Container>
  );
}

export default Register;
