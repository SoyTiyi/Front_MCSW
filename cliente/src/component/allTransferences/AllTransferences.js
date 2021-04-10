import React, { useState, useEffect } from 'react'
import { OpersContainer, Title } from './StyleAllTransferences';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import RequestService from './../../services/RequestService';
import { transCols }  from './../listas/TablesInfo';
import TableGrid  from './../listas/TableGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .trans-app-theme--header': {
      backgroundColor: '#FFCCB7',
      fontSize: 16,
      color: 'black'
    },
    '& .trans-app-theme--header2': {
      backgroundColor: '#F1AB88',
      fontSize: 16,
      color: 'white'
    },
  },
});

const AllTransferences = () => {

  const[lista, setLista] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {

      await RequestService.post("/clients/user/operations/transactions", null)
      .then(response => {
        if (!response.ok) {
          return
        }
        return response
      })
      .then(response => response.json())
      .then(data => {
        setLista(data.success)
      })
    };
    componentDidMount();
  }, []);

  const classes = useStyles();

  return (
    <div>

      <OpersContainer>
        <Title>
          Mis movimientos
        </Title>
        <br /><br />

        {  lista.length === 0 ? (

          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              >
                No hay movimientos
              </Typography>

            </React.Fragment>

          ) : (
            <div>
                <TableGrid columns={transCols} rows={lista} pageSize={10} divStyle={{ height: 650, width: '100%', textAlign: "center"}} className={classes.root} />
            </div>
          )
        }

      </OpersContainer>
    </div>

  );
}

export default AllTransferences;
