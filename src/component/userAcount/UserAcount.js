import React from 'react';
import { Container, Title, RowPage, CartDetails, RowData, P } from './StyleUserAcount';
import InfoUser from './infoUser/InfoUser';
import MyTransferences from './miTransferences/MyTransferences';

const UserAcount = props => {
    return (
        <Container>
            <Title>
                <h1>Summary</h1>
            </Title>
            <RowPage>
                <InfoUser />
            </RowPage>
            <MyTransferences />
        </Container>
    );
}

export default UserAcount;
