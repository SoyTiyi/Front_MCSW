import React , {useState, useEffect} from 'react';
import {Button, Buttons, Container, Title, Row} from '../login/StyleLogin'
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


const UpdateSobregiro = () => {


  const[idSobregiro, setIdSobregiro] = useState("");
  const[estado, setEstado] = useState("");
  const[lista, setLista] = useState([]);

  useEffect(() => {
      const componentDidMount = async () => {
        var data = new FormData();
        data.append('state', 'en proceso');

        const res = await axios.post('http://localhost:8000/sobregiro.php/overdraft/consult', data);
        setLista(res.data);
      };
      componentDidMount();
    }, []);

  const postUpdate = () => {

      var data = new FormData();
      data.append('id', idSobregiro);
      data.append('estado', estado);
      window.location.reload(false);

      axios.post('http://localhost:8000/sobregiro.php/overdraft/update', data)
      .then(response => {
          console.log(response)
      })
      .catch(error => `Error: ${error}`);
  }


    return(
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
        <Container>

          <Row>
            <label><b>Id Sobregiro </b></label>
            <br /><br />
            <input type="text" name="id" onChange={event => setIdSobregiro(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Row>
            <label><b>Nuevo estado Sobregiro </b></label>
            <br /><br />
            <input type="text" name="estado" onChange={event => setEstado(event.target.value)} style={{ width:"100%" }}/>
          </Row>
          <Buttons>
            <Button type="submit" onClick={postUpdate}>Cambiar</Button>
          </Buttons>

        </Container>
      </div>
    );
}


export default UpdateSobregiro;
