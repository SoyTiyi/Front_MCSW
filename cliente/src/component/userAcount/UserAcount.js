import React, { useState, useEffect } from 'react';
import { Title } from './StyleUserAcount';
import { Container, Button, Row } from '../login/StyleLogin';
import axios from 'axios';

const UserAcount = props => {

    const [saldo, setSaldo] = useState("");
    const api = axios.create({baseURL: 'http://localhost:8000'})
    let balance = <p>Loading.....</p>;

      const componentDidMountSaldo = async (cuenta) => {

        console.log(window.localStorage.getItem("username"));

        var data = new FormData();
        data.append('num_cuenta', cuenta);


        const res = await axios.post('http://localhost:8000/user.php/clients/getBalance', data);
        setSaldo(res.data);
      };

    useEffect(() => {
      const componentDidMount = async () => {

        var data = new FormData();
        data.append('usuario', window.localStorage.getItem("username"));

        const res = await axios.post('http://localhost:8000/user.php/clients/getAccount', data);
        componentDidMountSaldo(res.data);
      };
      componentDidMount();
    }, []);


    console.log("entre");
    return (
        <Container>
            <form action="http://localhost:8000/user.php/clients/getBalance" method="post">
                <Title>
                    <h1>Saldo total</h1>
                </Title>
                <Row>
                    <label><b>Cantidad: </b></label> {saldo}

                </Row>

            </form>
        </Container>
    );
}

export default UserAcount;
