import React, { useState, useEffect } from 'react'
import { Container, Title, Row, Button, Buttons } from './StyleSobregiro';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const Sobregiro = () => {

  const history = useHistory();

  const[saldo, setSaldo] = useState("");

  const[cuenta, setCuenta] = useState("");
  const[lista, setLista] = useState([]);

  const componentDidMountList = async (cuenta) => {
    var data = new FormData();
    data.append('num_cuenta', cuenta);

    const res = await axios.post('http://localhost:8000/sobregiro.php/clients/consult', data)
    .then(response => {
      console.log(response)
      setLista(response.data);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
      alert("Error");
    })

  };
	useEffect(() => {

		const componentDidMount = async () => {

			console.log(window.localStorage.getItem("username"));

			var data = new FormData();
			data.append('usuario', window.localStorage.getItem("username"));

			const res = await axios.post('http://localhost:8000/user.php/clients/getAccount', data)
      .then(res => {
        console.log(res)
        setCuenta(res.data);
        componentDidMountList(res.data);

      })
      .catch(error => {
        console.log(`Error: ${error}`);
        alert("Error");
      });
		};



    componentDidMount();
	}, []);


  const post = () => {
      console.log(cuenta,saldo);

      var data = new FormData();
      data.append('num_cuenta', cuenta);
      data.append('saldo', saldo);

      const res = axios.post('http://localhost:8000/sobregiro.php/clients/add', data)
      .then(response => {
        alert("Ok");
        window.location.reload(false);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        alert("Error");
      })

  }


  return (

    <div>
      <div style={{maxHeight:"30vh", overflow: "scroll", display: "block"}}>
        <List>
          {lista.map(user => (
            <div key={user.id} >
              <div>
                <ListItem alignItems="flex-start">

                  <ListItemText
                    primary={

                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          >
                          Id -
                        </Typography>
                        {" "+user.id}
                      </React.Fragment>
                    }
                    />

                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          >
                          Cuenta -
                        </Typography>
                        {" "+user.cuenta_id}
                      </React.Fragment>
                    }
                    />

                  <ListItemText
                    primary={

                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          >
                          Saldo -
                        </Typography>
                        {" "+user.saldo}
                      </React.Fragment>
                    }
                    />

                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          >
                          Estado -
                        </Typography>
                        {" "+user.estado}
                      </React.Fragment>
                    }
                    />

                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                          >
                          Fecha -
                        </Typography>
                        {" "+user.fecha}
                      </React.Fragment>
                    }
                    />

                </ListItem>
              </div>
              <Divider />

            </div>
          ))}
        </List>

      </div>
      <div>
        <Container>
          {console.log(cuenta)}

          {console.log(lista)}

          <Title>
            <h1>Sobregiro</h1>
          </Title>
          <Row>
            <label><b>Saldo </b></label>
            <br /><br />
            <input type="text" name="saldo" onChange={event => setSaldo(event.target.value)}/>
          </Row>
          <Buttons>
            <Button onClick={post}>Enviar</Button>
          </Buttons>
        </Container>
      </div>
    </div>
  );
}

export default Sobregiro;
