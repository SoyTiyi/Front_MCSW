import React , {useState, useEffect} from 'react';
import {Button, Buttons, Container, Row} from '../login/StyleLogin';
import RequestService from './../../services/RequestService';
import TableGrid  from './../listas/TableGrid';
import { sobregirosCols, estadoSobregiros }  from './../listas/TablesInfo';
import DropDownInput  from './../listas/DropDownInput';

const UpdateSobregiro = () => {


  const[idSobregiro, setIdSobregiro] = useState("");
  const[estado, setEstado] = useState("");
  const[porcentaje, setPorcentaje] = useState(0);
  const[lista, setLista] = useState([]);

  useEffect(() => {
    const componentDidMount = async () => {
      let reqBody = null;

      RequestService.post("/overdraft/getAll", reqBody)
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

  const postUpdate = () => {
    let reqBody = `id=${idSobregiro}&estado=${estado}&porcentaje=${porcentaje}`

    RequestService.post("/clients/overdraft/update", reqBody)
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
      alert(data.success)
      window.location.reload(false);
    })
  }

  return(
    <div>
      <div style={{width:"90%", maxHeight:"33vh", overflow: "scroll", display: "block", justifyContent: "center", marginRight: "auto", marginLeft: "auto"}}>
        <TableGrid columns={sobregirosCols} rows={lista} />
      </div>
      <Container style={{marginTop: "5vh"}}>
        <Row>
          <label><b>Id Sobregiro </b></label>
          <br /><br />
          <input type="text" name="id" onChange={event => setIdSobregiro(event.target.value)} style={{ width:"100%" }}/>
        </Row>
        <Row>
          <label><b>Nuevo estado de sobregiro </b></label>
          <br /><br />
          <DropDownInput values={estadoSobregiros} name="estados" currentValue={estado} setChange={setEstado}/>
        </Row>
        <Row>
          <label><b>Porcentaje </b></label>
          <br /><br />
          <input type="number" name="porcentaje" onChange={event => setPorcentaje(event.target.value)} style={{ width:"100%" }}/>
        </Row>
        <Buttons>
          <Button type="submit" onClick={postUpdate}>Cambiar</Button>
        </Buttons>

      </Container>
    </div>

  );

}


export default UpdateSobregiro;
