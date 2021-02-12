import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleRegister';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [documento, setDocument] = useState("");
    const history = useHistory();
    const post = () => {
        console.log("Click", documento);
        axios.post('http://localhost:8000/user.php/clients/valid', {'documento': documento})
            .then(response => {
                console.log(response);
                if (response.data !== false) {
                    let path = '/summary'
                    history.push(path);
                }
            }).catch(error => {
                console.log(`Error: ${error}`)
            });
    }

    return (
        <Container>
            <Title>
                <h1>Register</h1>
            </Title>
            <Row>
                <label>Document: </label>
                <input type="integer" name="document" onChange={event => setDocument(event.target.value)} />
            </Row>
            <Button type="submit" onClick={post}>Register</Button>
        </Container>
    );
}

export default Register;