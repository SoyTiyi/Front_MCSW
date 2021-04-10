import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const TableGrid = (props) => {

  return (
    <div>
    {
      props.rows.length > 0 &&
      <div style={props.divStyle}>
        <DataGrid rows={props.rows} columns={props.columns} pageSize={props.pageSize} className={props.className} />
      </div>
    }
    </div>
  );

}
export default TableGrid;
