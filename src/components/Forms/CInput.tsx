import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
  sx?: SxProps;
};

const CInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth = true,
  required,
  sx,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          required={required}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          error={!!error?.message}
          helperText={error?.message}
          sx={{ ...sx }}
        />
      )}
    />
  );
};

export default CInput;
