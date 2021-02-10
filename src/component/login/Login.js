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

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const postLogin = () => {
        axios.post('http://localhost:8000/login.php', {
            usuario: username,
            passwd: password
        })
        .then(response => {
            console.log(response)
            if(response.data !== false){
                let path = '/summary';
                history.push(path);
            }
        })
        .catch(error => `Error: ${error}`);
    }

    return (
        <Container>
            <Title>
                <h1>Login</h1>
            </Title>
            <Row>
                <label>Username: </label>
                <input type="text" name="username" onChange={event => setUsername(event.target.value)}/>
            </Row>
            <Row>
                <label>Password: </label>
                <input type="password" name="pasword" onChange={event => setPassword(event.target.value)}/>
            </Row>
            <Buttons>
                <Button>Login</Button>
                <Button onClick={routeChange}>Register</Button>
            </Buttons>
        </Container>
    );
}

export default Login;