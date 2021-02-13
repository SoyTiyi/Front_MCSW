import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../login/StyleLogin';
import {ListButtons, Button} from './styleUser';

const UserView = () => {
	const history = useHistory();


	const redirigir = cases => {
		let path = "";
		if (cases == 'movimientos') {
			path = '/allTransference';
		}
		else if (cases === 'saldo') {
			path = '/summary';
		}
		else {
			path = '/allTransference';
		}

		history.push(path);
	}


	return (
		<Container>
			<ListButtons>
				<Button onClick={() => redirigir('movimientos')}>Mis movimientos</Button>
				<Button onClick={() => redirigir('saldo')}>Mi saldo total</Button>
				<Button onClick={() => redirigir('hola')}>Solicitar Sobregiro</Button>
				<Button onClick={() => redirigir('transferencia')}>Realizar transferencia</Button>
			</ListButtons>
		</Container>

	);
}

export default UserView;
