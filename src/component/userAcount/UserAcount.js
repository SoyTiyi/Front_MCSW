import React, { useState } from 'react';
import { Title, RowPage } from './StyleUserAcount';
import InfoUser from './infoUser/InfoUser';
import MyTransferences from './miTransferences/MyTransferences';
import { Container, Button, Row } from '../login/StyleLogin';
import axios from 'axios';

const UserAcount = props => {

    const [cuenta, setCuenta] = useState("");
    const api = axios.create({baseURL: 'http://localhost:8000'})
    let balance = <p>Loading.....</p>;

    const getBalance = () => {
        api.post('/user.php/clients/getBalance', cuenta)
            .then(response => {
                console.log(response);
                if (response.data !== false && response.data !== "") {
                    balance = <p>{response.data}</p>;
                }
            })
            .catch(error => {
                console.log(`Error: ${error}`);
            })
    }


    console.log("entre");
    return (
        <Container>
            <form action="http://localhost:8000/user.php/clients/getBalance" method="post">
                <Title>
                    <h1>Get Balance</h1>
                </Title>
                <Row>
                    <label>Cuenta: </label>
                    <input type="text" name="num_cuenta"/>
                </Row>
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
}

export default UserAcount;
