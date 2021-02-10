import React, { useState } from 'react';
import { Container, Row, Button } from './StyleRegister';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [documento, setDocument] = useState("");
    const history = useHistory();
    const post = () => {
        console.log("Click",documento);
        axios.post('http://localhost:8000/user.php/clients/valid',documento)
            .then(response => {
                console.log(response);
                if (response.data !== false) {
                    console.log(response, "Entre");
                    let path = '/summary'
                    history.push(path);
                }
            }).catch(error => {
                console.log(`Error: ${error}`)
            });
    }

    return (
        <Container>
            <Row>
                <label>Document: </label>
                <input type="integer" name="document" onChange={event => setDocument(event.target.value)} />
            </Row>
            <Button type="submit" onClick={post}>Register</Button>
        </Container>
    );
}

export default Register;