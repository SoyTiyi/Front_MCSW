import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container } from '../login/StyleLogin';
import {ListButtons, Button} from './styleUser';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import RequestService from './../../services/RequestService';

const UserView = () => {

	const[cuenta, setCuenta] = useState("");

	useEffect(() => {
		const componentDidMount = async () => {

			await RequestService.post("/clients/user/getAccount", null)
			.then(response => {
				if (!response.ok) {
					return
				}
				return response
			})
			.then(response => response.json())
			.then(data => {
				setCuenta(data.success)
			})

		};
		componentDidMount();
	}, []);


	const history = useHistory();


	const redirigir = cases => {
		let path = "/MiBanco/";

		if (cases === 'movimientos') {
			path += 'client/operations/transactions';
		}
		else if (cases === 'operaciones') {
			path += 'client/operations';
		}
		else if (cases === 'saldo') {
			path += 'client/summary/balance';
		}
		else if (cases === 'overdraft') {
			path += 'client/overdrafts';
		}
		else if (cases === 'transferencia'){
			path += 'client/transference/new';
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
					<Button onClick={() => redirigir('operaciones')}>Historial de transacciones</Button>
					<Button onClick={() => redirigir('saldo')}>Mi saldo total</Button>
					<Button onClick={() => redirigir('overdraft')}>Sobregiros</Button>
					<Button onClick={() => redirigir('transferencia')}>Realizar transferencia</Button>
				</ListButtons>
			</Container>
		</div>

	);
}

export default UserView;
