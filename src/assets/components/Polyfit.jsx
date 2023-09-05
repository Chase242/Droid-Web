import { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createModel } from "polynomial-regression";

function handleOnClick(data, axleName, degree) {
  if (degree) {
    const orderedPairs = data.map((frame) => [frame.tempo, frame[axleName]]);
    return doPolynomialRegression(orderedPairs, degree);
  }
}

function handleOnChange(inputValue, setDegree) {
  const regex = /^\d+$/;

  if (regex.test(inputValue)) {
    setDegree(parseInt(inputValue));
  }
}

function doPolynomialRegression(data, degree) {
  const model = createModel();

  model.fit(data, [degree]);

  model.estimate(degree);

  const expressionObj = model.expressions();
  return expressionObj[degree];
}

const Polyfit = (props) => {
  const [degreeX, setDegreeX] = useState(null);
  const [degreeY, setDegreeY] = useState(null);
  const [degreeZ, setDegreeZ] = useState(null);
  const [resultX, setResultX] = useState(null);
  const [resultY, setResultY] = useState(null);
  const [resultZ, setResultZ] = useState(null);

  return (
    <Grid container>
      <Grid item marginBottom={2}>
        Insira o grau do polinômio desejado:
      </Grid>

      <Grid item container flexDirection={"column"}>
        <Grid item container alignItems={"center"} spacing={2} marginBottom={2}>
          <Grid item width={100}>
            <TextField
              id="outlined-basic"
              label="Eixo X"
              variant="outlined"
              onChange={(event) =>
                handleOnChange(event.target.value, setDegreeX)
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                const resultX = handleOnClick(
                  props.data,
                  props.quantityName + " em X",
                  degreeX
                );
                setResultX(resultX);
              }}
            >
              Calcular
            </Button>
          </Grid>

          <Grid item>
            <Typography>{resultX}</Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems={"center"} spacing={2} marginBottom={2}>
          <Grid item width={100}>
            <TextField
              id="outlined-basic"
              label="Eixo Y"
              variant="outlined"
              onChange={(event) =>
                handleOnChange(event.target.value, setDegreeY)
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                const resultY = handleOnClick(
                  props.data,
                  props.quantityName + " em Y",
                  degreeY
                );
                setResultY(resultY);
              }}
            >
              Calcular
            </Button>
          </Grid>
          <Grid item>
            <Typography>{resultY}</Typography>
          </Grid>
        </Grid>

        <Grid item container alignItems={"center"} spacing={2} marginBottom={2}>
          <Grid item width={100}>
            <TextField
              id="outlined-basic"
              label="Eixo Z"
              variant="outlined"
              onChange={(event) =>
                handleOnChange(event.target.value, setDegreeZ)
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => {
                const resultZ = handleOnClick(
                  props.data,
                  props.quantityName + " em Z",
                  degreeZ
                );
                setResultZ(resultZ);
              }}
            >
              Calcular
            </Button>
          </Grid>
          <Grid item>
            <Typography>{resultZ}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Polyfit;
