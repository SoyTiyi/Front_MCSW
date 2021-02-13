import React, { useState } from 'react';
import axios from 'axios'
import { Container, Row, Button, Title } from './StyleAddUser';


const AddUser = () => {
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");


    const postAddUser = props => {
        axios.post('http://localhost:8000/user.php/clients/add', {
            documento: document,
            nombre: nombre,
            usuario: usuario,
            passwd: password,
            tipo: tipo
        })
            .then(response => {
                console.log(response);
                console.log('datos', document, password, usuario, nombre, tipo);
            }).catch(error => console.log(`Error: ${error}`));
    }

    return (
        <Container>
            <form action="http://localhost:8000/user.php/clients/add" method="post">
                <Title>
                    <h1>Add New User</h1>
                </Title>
                <Row>
                    <label>Nombre: </label>
                    <input type="text" name="nombre"/>
                </Row>
                <Row>
                    <label>Usuario: </label>
                    <input type="text" name="usuario"/>
                </Row>
                <Row>
                    <label>Documento: </label>
                    <input type="text" name="documento"/>
                </Row>
                <Row>
                    <label>Tipo: </label>
                    <input type="text" name="tipo"/>
                </Row>
                <Row>
                    <label>Contraseña: </label>
                    <input type="password" name="passwd"/>
                </Row>
                <Button type="submit">Create</Button>
            </form>
        </Container>
    );
}

export default AddUser;