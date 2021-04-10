import React from 'react';
import { useHistory } from "react-router-dom";
import { Container } from '../login/StyleLogin';
import {ListButtons,Button} from './styleAuditor';

const AuditorView = () => {

	const history = useHistory();

	const redirigir = cases => {
		let path = "/MiBanco/";

		if (cases === 'listarMovs') {
			path += 'clients/operations';
		}

		history.push(path);
	}

	return (
		<Container>
			<ListButtons>
				<Button onClick={() => redirigir('listarMovs')}>Listar Movimientos</Button>
			</ListButtons>
		</Container>
	);
}

export default AuditorView;
