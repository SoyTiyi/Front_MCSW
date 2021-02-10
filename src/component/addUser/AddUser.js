import React, { useState } from 'react';
import axios from 'axios'
import { Container, Row, Button , Title} from './StyleAddUser';


const AddUser = () => {
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");


    const postAddUser = props => {
        axios.post('http://localhost:8000/user.php/clients/add',{
            documento: document,
            nombre: nombre,
            usuario: usuario,
            passwd: password,
            tipp: tipo
        })
        .then(response => {
            console.log(response);
            console.log('datos',document,password,usuario,nombre,tipo);
        }).catch(error => console.log(`Error: ${error}`));
    }

    return (
        <Container>
            <Title>
                <h1>Add New User</h1>
            </Title>
            <Row>
                <label>Nombre: </label>
                <input type="text" id="nombre" onChange={event => setNombre(event.target.value)}/>
            </Row>
            <Row>
                <label>Usuario: </label>
                <input type="text" id="usuario" onChange={event => setUsuario(event.target.value)}/>
            </Row>
            <Row>
                <label>Documento: </label>
                <input type="text" id="documento" onChange={event => setDocument(event.target.value)}/>
            </Row>
            <Row>
                <label>Tipo: </label>
                <input type="text" id="tipo" onChange={event => setTipo(event.target.value)}/>
            </Row>
            <Row>
                <label>Contraseña: </label>
                <input type="password" id="contraseña" onChange={event => setPassword(event.target.value)}/>
            </Row>
            <Button onClick={postAddUser}>Create</Button>
        </Container>
    );
}

export default AddUser;