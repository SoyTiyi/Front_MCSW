import React, { useState, useEffect } from 'react'
import { Container, Title } from './StyleAllTransferences';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const ListAllUserMoves = () => {

  const[listaTrans, setListaTrans] = useState([]);
  const[listaSg, setListaSg] = useState([]);


  useEffect(() => {
    const componentDidMount = async () => {

      console.log(window.localStorage.getItem("username"));

      var data = new FormData();
      data.append('usuario', window.localStorage.getItem("username"));

      const res = await axios.post('http://localhost:8000/trans.php/transaction/getAll', data);
      setListaTrans(res.data);
    };

    const componentDidMountSg = async () => {

      console.log(window.localStorage.getItem("username"));

      var data = new FormData();
      data.append('usuario', window.localStorage.getItem("username"));

      const res = await axios.post('http://localhost:8000/sobregiro.php/overdraft/getAll', data);
      setListaSg(res.data);
    };

    componentDidMount();
    componentDidMountSg();
  }, []);

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: "100%", height: "100%", flexDirection: "column"}}>
      <br /> <br />

      <div style={{maxHeight:"40vh", overflow: "scroll", width: "80vw"}}>

        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
          Transacciones
          </ListSubheader>
        }
        >
        {listaTrans.map(user => (
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
            Origen -
            </Typography>
            {" "+user.origen}
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
            {" "+user.destino}
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
            {" "+user.banco_destino}
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
            {" "+user.saldo}
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
            {" "+user.estado}
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
            Fecha -
            </Typography>
            {" "+user.fecha}
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

      <br /> <br /> <br />

      <div style={{maxHeight:"40vh", overflow: "scroll", width: "80vw"}}>
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
          Sobregiros
          </ListSubheader>
        }
        >
        {listaSg.map(user => (
          <div key={user.id} >
          <div>
          <ListItem alignItems="center">

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
            {" "+user.saldo}
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
            {" "+user.estado}
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
            Fecha -
            </Typography>
            {" "+user.fecha}
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

    </div>

  );
}

export default ListAllUserMoves;
