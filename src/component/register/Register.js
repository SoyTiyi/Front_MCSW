import React, { useState } from 'react';
import { Container, Row, Button, Title } from './StyleRegister';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    return (
        <Container>
            <form action="http://localhost:8000/user.php/clients/valid" method="post">
                <Title>
                    <h1>Register</h1>
                </Title>
                <Row>
                    <label>Documento: </label>
                    <input type="text" name="documento"/>
                </Row>
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
}

export default Register;