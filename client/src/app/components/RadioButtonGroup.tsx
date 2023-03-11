import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";

interface Props {
  option: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

const RadioButtonGroup = ({ option, onChange, selectedValue }: Props) => {
  return (
    <div>
      <FormControl>
        <RadioGroup onChange={onChange} value={selectedValue}>
          {option.map(({ value, lable }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={lable}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioButtonGroup;
