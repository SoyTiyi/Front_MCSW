import React, { useState } from 'react';
import axios from 'axios'
import { Container, Row, Button, Title } from './StyleAddUser';


const AddUser = (props) => {
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombre, setNombre] = useState("null");
    const [tipo, setTipo] = useState("cliente");

    const pathList = props.location.pathname.split('/');

    const postAddUser = props => {

      var data = new FormData();
      data.append('documento', document);
      data.append('nombre', nombre);
      data.append('usuario', usuario);
      data.append('passwd', password);
      data.append('tipo', tipo);

      axios.post('http://localhost:8000/user.php/clients/add', data)
      .then(response => {
        alert(`Ok`)
        window.location.reload(false);

      }).catch(error => {
        alert(`Error`)
        window.location.reload(false);
      });

    }

    return (
      <Container>
          <Title>
            <h1>Add New User</h1>
          </Title>
          <Row>
              <label><b>Documento </b></label>
              <br /><br />
              <input type="text" id="documento" onChange={event => setDocument(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          {pathList[pathList.length - 1] === "admin" ? (
            <div>
            <Row>
                <label><b>Tipo </b></label>
                <br /><br />
                <input type="text" id="tipo" onChange={event => setTipo(event.target.value)} style={{ width:"100%" }}/>
            </Row>
            <Row>
                <label><b>Nombre </b></label>
                <input type="text" id="nombre" onChange={event => setNombre(event.target.value)} style={{ width:"100%" }}/>
            </Row>
            </div>
          ) : (
            <div/>
          )}
          <Row>
              <label><b>Usuario </b></label>
              <br /><br />
              <input type="text" id="usuario" onChange={event => setUsuario(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Row>
              <label><b>Contraseña </b></label>
              <br /><br />
              <input type="password" id="contraseña" onChange={event => setPassword(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Button type="submit" onClick={postAddUser}>Create</Button>

      </Container>

    );
}

export default AddUser;
