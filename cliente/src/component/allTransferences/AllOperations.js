import React, { useState, useEffect } from 'react'
import { OpersContainer, Title } from './StyleAllTransferences';
import Typography from '@material-ui/core/Typography';
import RequestService from './../../services/RequestService';
import { transCols }  from './../listas/TablesInfo';
import TableGrid  from './../listas/TableGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .trans-app-theme--header': {
      backgroundColor: '#BFFFBE',
      fontSize: 16,
      color: 'black'
    },
    '& .trans-app-theme--header2': {
      backgroundColor: '#B5E7B5',
      fontSize: 16,
      color: 'white'
    },
  },
});

const AllOperations = () => {

  const[cuenta, setCuenta] = useState("");
  const[lista, setLista] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {

      await RequestService.post("/clients/user/operations", null)
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
          Historial de transacciones
        </Title>
        <br /><br />

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
              <TableGrid columns={transCols} rows={lista} pageSize={10} divStyle={{ height: 650, width: '100%', textAlign: "center"}} className={classes.root} />
            </div>
          )
        }

      </OpersContainer>
    </div>

  );
}

export default AllOperations;
