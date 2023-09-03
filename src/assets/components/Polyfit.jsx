import { TextFields } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function Polyfit(props) {
  const [polyfit, setPolyfit] = useState(null);
  return (
    <Grid container>
      <Grid item>Insira o grau do polinômio desejado:</Grid>
      <Grid item container flexDirection={"column"}>
        <Grid item>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Grid>
        <Grid item>Insira o grau do polinômio desejado:</Grid>
        <Grid item>Insira o grau do polinômio desejado:</Grid>
      </Grid>
    </Grid>
  );
}
export default Polyfit;
