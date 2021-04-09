import React from 'react';
import Select from '@material-ui/core/Select';

const DropDownInput = (props) => {

  const listItems = props.values.map((name) =>
    <option key={name} value={name}>{name}</option>
  );

  return (

    <div>
      <Select
        native
        style={{width: '100%'}}
        value={props.currentValue}
        onChange={event => props.setChange(event.target.value)}
        inputProps={{
          name: props.name,
          id: props.name+'-native-simple',
        }}
      >
        {listItems}
      </Select>
    </div>
  );

};

export default DropDownInput;
