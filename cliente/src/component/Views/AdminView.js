import React from 'react';
import { useHistory } from "react-router-dom";
import { Container } from '../login/StyleLogin';
import {ListButtons,Button} from './styleAdmin';

const AdminView = () => {

	const history = useHistory();

	const redirigir = cases => {
		let path = "/MiBanco/";

		if (cases === 'crearUsuario') {
			path += 'users/new';
		}
		else if (cases === 'modDinero') {
			path += 'clients/modifyBalance';
		}
		else if (cases === 'autorizarSobre') {
			path += 'clients/overdrafts/update/state';
		}
		else if (cases === 'listarMovs') {
			path += 'clients/operations';
		}

		history.push(path);
	}

	return (
		<Container>
			<ListButtons>
				<Button onClick={() => redirigir('crearUsuario')}>Crear un Usuario</Button>
				<Button onClick={() => redirigir('modDinero')}>Modificar dinero de un usuario</Button>
				<Button onClick={() => redirigir('autorizarSobre')}>Autorizar Sobregiro</Button>
				<Button onClick={() => redirigir('listarMovs')}>Listar Movimientos</Button>
			</ListButtons>
		</Container>
	);
}

export default AdminView;
