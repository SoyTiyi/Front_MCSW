import React, { useState, useEffect } from 'react';
import { Title } from './StyleUserAcount';
import { Container, Button, Row } from '../login/StyleLogin';
import axios from 'axios';
import RequestService from './../../services/RequestService';

const UserAccount = props => {

    const [saldo, setSaldo] = useState("");

    useEffect(() => {
      const componentDidMount = async () => {

        await RequestService.post("/clients/user/balance", null)
        .then(response => {
          if (!response.ok) {
            return
          }
          return response
        })
        .then(response => response.json())
        .then(data => {
          setSaldo(data.success)
        })
      };
      componentDidMount();
    }, []);

    return (
        <Container>
            <form>
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

export default UserAccount;
