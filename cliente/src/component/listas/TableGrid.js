import React from 'react';
import { DataGrid } from '@material-ui/data-grid';


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
  },
});


const TableGrid = (props) => {

  const classes = useStyles();

  return (
    <div>
    {
      props.rows.length > 0 &&

      <div style={{ height: 400, width: '100%', textAlign: "center"}}>
      <DataGrid rows={props.rows} columns={props.columns} pageSize={5} className={classes.root} />
      </div>
    }
    </div>
  );

}
export default TableGrid;
