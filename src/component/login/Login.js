import React , {useState} from 'react';
import axios from 'axios';
import { Container, Row, Buttons, Button, Title } from './StyleLogin';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const history = useHistory();

    const routeChange = () => {
        let path = '/register';
        history.push(path);
    }
    return (
        <Container>
            <form action="http://localhost:8000/login.php" method="post">
                <Title>
                    <h1>Login</h1>
                </Title>
                <Row>
                    <label>Username: </label>
                    <input type="text" name="usuario"/>
                </Row>
                <Row>
                    <label>password: </label>
                    <input type="text" name="passwd"/>
                </Row>
                <Button type="submit">Login</Button>
                <Button onClick={routeChange}>Register</Button>
            </form>
        </Container>
    );
}

export default Login;