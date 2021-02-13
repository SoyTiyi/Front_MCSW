import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Buttons, Container, Title, Row} from '../login/StyleLogin'
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';


const UpdateSobregiro = () => {


  const[idSobregiro, setIdSobregiro] = useState("");
  const[estado, setEstado] = useState("");
  const[lista, setLista] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const componentDidMount = async () => {
        setLoading(true);
        var data = new FormData();
        data.append('state', 'en proceso');

        const res = await axios.post('http://localhost:8000/sobregiro.php/overdraft/consult', data);
        setLista(res.data);
        setLoading(false);
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
        <div >

          <div>
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

                    </ListItem>
                  </div>
                  <Divider />

                </div>
              ))}
            </List>

          </div>
        </div>
        <Container>

            <Row>
                <label>Id Sobregiro: </label>
                <input type="text" name="id" onChange={event => setIdSobregiro(event.target.value)}/>
            </Row>
            <Row>
                <label>Nuevo estado Sobregiro: </label>
                <input type="text" name="estado" onChange={event => setEstado(event.target.value)}/>
            </Row>
            <Buttons>
                <Button type="submit" onClick={postUpdate}>Cambiar</Button>
            </Buttons>

        </Container>
      </div>
    );
}


export default UpdateSobregiro;
