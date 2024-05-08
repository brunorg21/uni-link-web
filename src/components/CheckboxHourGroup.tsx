import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    firstHour: false,
    secondHour: false,
    thirdHour: false,
    fourthHour: false,
    fifthHour: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { firstHour, secondHour, thirdHour, fourthHour, fifthHour  } = state;

  console.log(state)

  return (
      <FormControl sx={{ marginTop: "3px" }} component="fieldset" variant="standard">
        <FormLabel component="legend">Selecione os horários de sua aula:</FormLabel>
        <FormGroup>
          <div className='flex'>
            <FormControlLabel
                control={
                <Checkbox checked={firstHour} onChange={handleChange} name="firstHour" />
                }
                label="18:45 - 19:35"
            />
            <FormControlLabel
                control={
                <Checkbox checked={secondHour} onChange={handleChange} name="secondHour" />
                }
                label="19:35 - 20:25"
            />
            <FormControlLabel
                control={
                <Checkbox checked={thirdHour} onChange={handleChange} name="thirdHour" />
                }
                label="19:35 - 20:25"
            />
            <FormControlLabel
                control={
                <Checkbox checked={fourthHour} onChange={handleChange} name="fourthHour" />
                }
                label="19:35 - 20:25"
            />
            <FormControlLabel
                control={
                <Checkbox checked={fifthHour} onChange={handleChange} name="fifthHour" />
                }
                label="19:35 - 20:25"
            />
          </div>
        </FormGroup>
      </FormControl>
  );
}
