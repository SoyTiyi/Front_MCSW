import React from 'react';
import { Container, Row , Buttons , Button} from './StyleLogin';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const history = useHistory();

    const routeChange = () => {
        let path = '/register';
        history.push(path);
    }

    return (
        <Container>
            <Row>
                <label>Username: </label>
                <input type="text" name="username" />
            </Row>
            <Row>
                <label>Password: </label>
                <input type="password" name="pasword" />
            </Row>
            <Buttons>
                <Button>Login</Button>
                <Button onClick={routeChange}>Register</Button>
            </Buttons>
        </Container>
    );
}

export default Login;