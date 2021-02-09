import React from 'react';
import { Container, Row, Button } from './StyleRegister';

const Register = props => {
    return (
        <Container>
            <Row>
                <label>Document: </label>
                <input type="text" name="document" />
            </Row>
            <Button>Register</Button>
        </Container>
    );
}

export default Register;