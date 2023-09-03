import {useState} from "react";
import {Grid} from "@mui/material";
import React from "react";
import {TextField} from "@mui/material";

const Polyfit = () => {
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