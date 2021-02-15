import React , {useState} from 'react';
import axios from 'axios';
import { Container, Row, Buttons, Button, Title } from './StyleLogin';
import { useHistory } from "react-router-dom";

const Login = (props) => {

    const history = useHistory();

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const routeChange = () => {
        let path = '/register';
        history.push(path);
    }

    const postLogin = () => {

      var data = new FormData();
      data.append('usuario', username);
      data.append('passwd', password);

      axios.post('http://localhost:8000/login.php', data)
      .then(response => {
        console.log(response)

        if(response.data !== null){

          let rol = response.data.trim();

          if(rol === 'admin' || rol === 'auditor') {
            let path = '/admin';
            localStorage.setItem("username", username);
            history.push(path);
          }

          else if (rol === 'cliente'){
            let path = '/user';
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("tipo", rol);
            history.push(path);
          }

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
              <Button onClick={postLogin}>Login</Button>
              <Button onClick={routeChange}>Register</Button>
          </Buttons>
        </Container>
    );
}

export default Login;
