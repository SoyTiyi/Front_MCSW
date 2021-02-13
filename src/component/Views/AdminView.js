import React from 'react';
import { useHistory } from "react-router-dom";
import { Container } from '../login/StyleLogin';
import {ListButtons,Button} from './styleAdmin';

const AdminView = () => {

	const history = useHistory();

	const redirigir = cases => {
		let path = "";
		if (cases === 'crearUsuario') {
			path = '/addUser';
		}
		else if (cases === 'modDinero') {
			path = '/changeAmount';
		}
		else if (cases === 'autorizarSobre') {
			path = '/updateOverdraft';
		}
		else if (cases === 'listarSobregiros') {
			path = '/consultOverdraft';
		}
		else {
			path = '/createOverdraft';
		}
		history.push(path);
	}

	return (
		<Container>
			<ListButtons>
				<Button onClick={() => redirigir('crearUsuario')}>Crear un Usuario</Button>
				<Button onClick={() => redirigir('modDinero')}>Modificar dinero de un usuario</Button>
				<Button onClick={() => redirigir('autorizarSobre')}>Autorizar Sobregiro</Button>
				<Button onClick={() => redirigir('listarSobregiros')}>Listar Sobregiros</Button>
				<Button onClick={() => redirigir('crearSobregiro')}>Crear Sobregiro</Button>
			</ListButtons>
		</Container>
	);
}

export default AdminView;
