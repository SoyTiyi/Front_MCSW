import React from 'react';
import AuxiliarComponent from '../../../hoc/AuxiliarComponent';
import { CartDetails, RowData , P } from '../StyleUserAcount';

const InfoUser = props => {
    return (
        <AuxiliarComponent>
            <CartDetails>
                <RowData>
                    <label>Name: </label>
                    <P>null</P>
                </RowData>
                <RowData>
                    <label>Number Account: </label>
                    <P>null</P>
                </RowData>
                <RowData>
                    <label>Total Money: </label>
                    <P>null</P>
                </RowData>
            </CartDetails>
            <CartDetails>
                <RowData>
                    <label>Number Transferences: </label>
                    <P>null</P>
                </RowData>
                <RowData>
                    <label>Total Transference: </label>
                    <P>null</P>
                </RowData>
                <RowData>
                    <label>Document Number: </label>
                    <P>null</P>
                </RowData>
            </CartDetails>
        </AuxiliarComponent>

    );
}

export default InfoUser;