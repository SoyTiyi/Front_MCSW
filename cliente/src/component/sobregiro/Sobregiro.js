import React, { useState, useEffect } from 'react'
import { Container, Title, Row, Button, Buttons } from './StyleSobregiro';
import RequestService from './../../services/RequestService';
import TableGrid  from './../listas/TableGrid';
import { sobregirosCols }  from './../listas/TablesInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: '#C7ACDD',
      fontSize: 16,
      color: 'white'
    },
    '& .super-app-theme--header2': {
      backgroundColor: '#F0ECFF',
      fontSize: 16,
      color: 'black'
    },
  },
});

const Sobregiro = () => {

  const[saldo, setSaldo] = useState("");

  const[cuenta, setCuenta] = useState("");
  const[lista, setLista] = useState([]);

  useEffect(() => {

    const componentDidMount = async () => {

      await RequestService.post("/clients/overdraft/getAll", null)
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


  const post = () => {

    let reqBody = `saldo=${saldo}`

    RequestService.post("/clients/overdraft/new", reqBody)
    .then(response => {
      if (!response.ok) {
        alert("Datos inválidos")
        window.location.reload(false);
        return
      }
      return response
    })
    .then(response => response.json())
    .then(data => {
      alert("Sobregiro solicitado con éxito")
      window.location.reload(false);
    })

  }

  const classes = useStyles();

  return (

    <div>
      <div style={{width:"90%", maxHeight:"37vh", overflow: "scroll", display: "block", justifyContent: "center", marginRight: "auto", marginLeft: "auto"}}>
        <TableGrid columns={sobregirosCols} rows={lista} pageSize={5} divStyle={{ height: 400, width: '100%', textAlign: "center"}} className={classes.root} />
      </div>
      <div>
        <Container>
          <Title>
            <h1>Solicitar sobregiro</h1>
          </Title>
          <Row>
            <label><b>Saldo </b></label>
            <br /><br />
            <input type="text" maxLength="10" name="saldo" onChange={event => setSaldo(event.target.value)} style={{ width:"100%" }}/>
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
