import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from '../login/StyleLogin';
import {ListButtons, Button} from './styleUser';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const UserView = () => {

	const[cuenta, setCuenta] = useState("");

	useEffect(() => {
		const componentDidMount = async () => {

			console.log(window.localStorage.getItem("username"));

			var data = new FormData();
			data.append('usuario', window.localStorage.getItem("username"));

			const res = await axios.post('http://localhost:8000/user.php/clients/getAccount', data);
			setCuenta(res.data);
		};
		componentDidMount();
	}, []);


	const history = useHistory();


	const redirigir = cases => {
		let path = "";
		if (cases === 'movimientos') {
			path = '/allTransference';
		}
		else if (cases === 'saldo') {
			path = '/summary';
		}
		else if (cases === 'misTrans') {
			path = '/allSuccesfulTransference';
		}
		else if (cases === 'overdraft') {
			path = '/overdraft';
		}
		else {
			path = '/allTransference';
		}

		history.push(path);
	}


	return (
	<div>
		<React.Fragment>
			<Typography
				component="span"
				variant="body2"
				color="textPrimary"
				>
					Número de cuenta:
					{" "+cuenta}
				</Typography>

			</React.Fragment>

			<Container>

				<ListButtons>
					<Button onClick={() => redirigir('movimientos')}>Mis movimientos</Button>
				<Button onClick={() => redirigir('misTrans')}>Historial de tranferencias</Button>
					<Button onClick={() => redirigir('saldo')}>Mi saldo total</Button>
					<Button onClick={() => redirigir('overdraft')}>Solicitar Sobregiro</Button>
					<Button onClick={() => redirigir('transferencia')}>Realizar transferencia</Button>
				</ListButtons>
			</Container>
		</div>

	);
}

export default UserView;
