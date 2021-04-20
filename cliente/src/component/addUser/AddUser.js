import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleAddUser';
import RequestService from './../../services/RequestService';
import { tiposUsuario } from './../listas/TablesInfo';
import DropDownInput from './../listas/DropDownInput';

const AddUser = (props) => {
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("null");
  const [tipo, setTipo] = useState("cliente");

  const postAddUser = props => {

    if(password.length < 8){
      alert('La contraseña debe tener una longitud mayor/igual a 8');
      return;
    }

    let reqBody = `documento=${document}&nombre=${nombre}&usuario=${usuario}&passwd=${password}&tipo=${tipo}`

    RequestService.post("/users/add", reqBody)
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
        <h1>Add New User</h1>
      </Title>
      <Row>
        <label><b>Documento </b></label>
        <br /><br />
        <input type="text" maxLength="10" id="documento"  onChange={event => setDocument(event.target.value)} style={{ width: "100%" }} />
      </Row>

      <div>
        <Row>
          <label><b>Tipo </b></label>
          <br /><br />
          <DropDownInput values={tiposUsuario} name="usuariosTipo" currentValue={tipo} setChange={setTipo} divStyle={{ width: '100%' }} />
        </Row>
        <Row>
          <label><b>Nombre </b></label>
          <input type="text" maxLength="50" id="nombre"  onChange={event => setNombre(event.target.value)} style={{ width: "100%" }} />
        </Row>
      </div>

      <div />

      <Row>
        <label><b>Usuario </b></label>
        <br /><br />
        <input type="text" maxLength="50"  id="usuario" onChange={event => setUsuario(event.target.value)} style={{ width: "100%" }} />
      </Row>
      <Row>
        <label><b>Contraseña </b></label>
        <br /><br />
        <input type="password" id="contraseña" onChange={event => setPassword(event.target.value)} style={{ width: "100%" }} />
      </Row>
      <Button type="submit" onClick={postAddUser}>Create</Button>

    </Container>

  );
}

export default AddUser;
