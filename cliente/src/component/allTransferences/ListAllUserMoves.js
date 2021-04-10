import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import RequestService from './../../services/RequestService';
import { sobregirosCols, transCols }  from './../listas/TablesInfo';
import TableGrid  from './../listas/TableGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: '#77ADDD',
      fontSize: 16,
      color: 'white'
    },
    '& .super-app-theme--header2': {
      backgroundColor: '#CFE7FE',
      fontSize: 16,
      color: 'black'
    },
    '& .trans-app-theme--header': {
      backgroundColor: '#F7F3E3',
      fontSize: 16,
      color: 'black'
    },
    '& .trans-app-theme--header2': {
      backgroundColor: '#ECC9A4',
      fontSize: 16,
      color: 'white'
    },
  },
});

const ListAllUserMoves = () => {

  const[listaTrans, setListaTrans] = useState([]);
  const[listaSg, setListaSg] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {

      await RequestService.post("/clients/transactiones/getAll", null)
      .then(response => {
        if (!response.ok) {
          return
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        setListaTrans(data.success)
      })

    };

    const componentDidMountSg = async () => {

      await RequestService.post("/overdraft/getAll", null)
      .then(response => {
        if (!response.ok) {
          return
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        setListaSg(data.success)
      })
    };

    componentDidMount();
    componentDidMountSg();
  }, []);

  const classes = useStyles();

  return (
    <div>
      <br />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: "100%", height: "100%", flexDirection: "column"}}>

        <Typography variant="h4" gutterBottom style={{ fontWeight: 600 }}>
          Transacciones
        </Typography>
        <div style={{maxHeight:"40vh", overflow: "scroll", width: "80vw"}}>
          <TableGrid columns={transCols} rows={listaTrans} pageSize={10} divStyle={{ height: 400, width: '100%', textAlign: "center"}} className={classes.root} />
        </div>
      </div>

      <br /> <br />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', width: "100%", height: "100%", flexDirection: "column"}}>
        <Typography variant="h4" gutterBottom style={{ fontWeight: 600 }}>
          Sobregiros
        </Typography>
        <div style={{maxHeight:"40vh", overflow: "scroll", width: "80vw"}}>
          <TableGrid columns={sobregirosCols} rows={listaSg} pageSize={10} divStyle={{ height: 400, width: '100%', textAlign: "center"}} className={classes.root} />
        </div>
      </div>

    </div>

  );
}

export default ListAllUserMoves;
