import React from 'react';
import AuxiliarComponent from '../../../hoc/AuxiliarComponent';
import { Container, Table } from './StyleMyTransferences';
const MyTransferences = props => {
    return (
        <Container>
            <h2>My Transferences</h2>
            <Table>
                <tr>
                    <th>For</th>
                    <th>Amount</th>
                </tr>
                <tr>
                    <th>null</th>
                    <th>null</th>
                </tr>
            </Table>
        </Container>
    );
}

export default MyTransferences;