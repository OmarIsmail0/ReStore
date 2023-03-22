import { TextField } from "@mui/material";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  variant: any;
}

export const AppTextInput = (props: Props) => {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: "",
  });
  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant={props.variant}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};
