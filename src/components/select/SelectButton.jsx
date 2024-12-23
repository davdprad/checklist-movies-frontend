import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectOptions = ({ options, control, name }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="movie-mode-label">Modo de Assistir</InputLabel>
      <Controller
        name={name} // O nome do campo a ser registrado no React Hook Form
        control={control} // Passando o controle do React Hook Form
        render={({ field }) => (
          <Select
            labelId="movie-mode-label"
            value={field.value || ""}
            label="Modo de Assistir"
            {...field}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectOptions;
