import React, { useState, useEffect } from 'react'
import { Container, Table, Header, Cell, Button, Row } from './StyleAllTransferences';
import axios from 'axios';
const AllTransferences = () => {
    return (
        <Container>
            <form action="http://localhost:8000/trans.php/transaction/specific" method="post">
                <Title>
                    All Succesfull Transferences
                </Title>
                <Row>
                    <label>Cuenta</label>
                    <input type="text" name="cuenta" placeholder="1234567" />
                </Row>
                <Button type="submit">Show</Button>
            </form>
        </Container>

    );
}

export default AllTransferences;