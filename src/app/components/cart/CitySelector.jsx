import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

const CitySelector = ({ inputValue, setInputValue, cities, onCitySelect }) => {

  return (
    <Autocomplete
      options={cities}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Выберите ваш город"
          variant="outlined"
        />
      )}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      onChange={(event, newValue) => onCitySelect(newValue)}
      defaultValue={inputValue}
    />
  );
};

export default CitySelector;