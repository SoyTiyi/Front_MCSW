import React from 'react';
import { useHistory } from "react-router-dom";
import { Container } from '../login/StyleLogin';
import {ListButtons,Button} from './styleAuditor';

const AuditorView = () => {

	const history = useHistory();

	const redirigir = cases => {
		let path = "";
		if (cases === 'crearUsuario') {
			path = '/addUser/admin';
		}
		else if (cases === 'modDinero') {
			path = '/changeAmount';
		}
		else if (cases === 'autorizarSobre') {
			path = '/updateOverdraft';
		}
		else if (cases === 'listarMovs') {
			path = '/usersOpers';
		}
		else if (cases === 'crearSobregiro') {
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
				<Button onClick={() => redirigir('listarMovs')}>Listar Movimientos</Button>
				<Button onClick={() => redirigir('crearSobregiro')}>Crear Sobregiro</Button>
			</ListButtons>
		</Container>
	);
}

export default AuditorView;
