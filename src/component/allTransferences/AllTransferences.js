import React, { useState, useEffect } from 'react'
import { Container, Table, Header, Cell, Button, Row, Title } from './StyleAllTransferences';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const AllTransferences = () => {

  const[lista, setLista] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {

      console.log(window.localStorage.getItem("username"));

      var data = new FormData();
      data.append('usuario', window.localStorage.getItem("username"));


      const res = await axios.post('http://localhost:8000/trans.php/transaction/specific', data);
      setLista(res.data);
    };
    componentDidMount();
  }, []);

  return (
    <div>
      <Title>
        Historial de transacciones
      </Title>
      <Container>
        {  lista.length === 0 ? (

          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              >
                No hay transacciones
              </Typography>

            </React.Fragment>

          ) : (
            <div>
              <List>
                {lista.map(trans => (
                  <div key={trans.id} >
                    <div>
                      <ListItem >

                        <ListItemText
                          primary={

                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                >
                                  Origen -
                                </Typography>
                                <br />
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                >
                                  {" "+trans.origen}
                                </Typography>

                              </React.Fragment>
                            }
                            style={{width: '10%',  justifyContent:'flex-start'}}
                          />


                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                  >
                                    Banco -
                                  </Typography>
                                  <br />

                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                  >
                                    {" "+trans.banco_destino}
                                  </Typography>
                                  <br />
                              </React.Fragment>
                            }
                            style={{width: '10%',  justifyContent:'flex-start'}}
                          />

                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                  >
                                    Destino -
                                  </Typography>
                                  <br />
                                {" "+trans.destino}
                              </React.Fragment>
                            }
                            style={{width: '10%',  justifyContent:'flex-start'}}
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
                                  <br />
                                {" "+trans.saldo}
                              </React.Fragment>
                            }
                            style={{width: '10%',  justifyContent:'flex-start'}}
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
                                  <br />
                                {" "+trans.estado}
                              </React.Fragment>
                            }
                            style={{width: '10%',  justifyContent:'flex-start'}}
                          />

                        </ListItem>
                      </div>
                      <Divider />

                  </div>
                ))}
              </List>

            </div>
          )
        }

      </Container>
    </div>

  );
}

export default AllTransferences;
