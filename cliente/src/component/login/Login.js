import React , { useState, useContext } from 'react';
import { Container, Row, Buttons, Button, Title } from './StyleLogin';
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";

export const Login = (props) => {

  const history = useHistory();

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");


  const routeChange = () => {
    let path = '/MiBanco/register';
    history.push(path);
  }


  const postLogin = async () => {

    let userRol = '';
    let path = '';
    AuthService.login(username, password)
    .then((userRol) => {

      let path = '';

      if(userRol === 'admin' || userRol === 'auditor') {
        path = userRol;
      }
      else if(userRol === 'cliente'){
        path = 'user';
      }
      console.log(JSON.stringify(path))
      history.push('/MiBanco/'+path);
    });
  }

  return (
    <Container>
      <Title>
        <h1>Login</h1>
      </Title>
      <Row>
        <label><b>Usuario </b></label>
        <br /><br />
        <input type="text" name="username" onChange={event => setUsername(event.target.value)}  style={{ width:"100%" }}/>
      </Row>
      <Row>
        <label><b>Contraseña </b></label>
        <br /><br />
        <input type="password" name="pasword" onChange={event => setPassword(event.target.value)}  style={{ width:"100%" }}/>
      </Row>
      <Buttons>
        <Button onClick={postLogin}>Login</Button>
        <Button onClick={routeChange}>Register</Button>
      </Buttons>
    </Container>
  );
}

export default Login;
