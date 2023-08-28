import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";
import AccelChart from "../assets/components/AccelChart";
import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";
import IconButton from "@mui/material/IconButton/IconButton";

function timeConverter(time) {
  const minutes = Number(time.slice(0, 2)) * 60;
  const seconds = Number(time.slice(3, 5));
  const miliseconds = Number(time.slice(6, 9)) / 1000;
  return minutes + seconds + miliseconds;
}

const realizarIntegral = (tempoA, tempoB, valorA, valorB) => {
  return ((tempoB - tempoA) * (valorB + valorA)) / 2;
};

function MensurationDetailsScreen() {
  const [mensuration, setMensuration] = useState({
    _id: null,
    name: null,
    date: null,
    data: [
      {
        accelX: null,
        accelY: null,
        accelZ: null,
        time: null,
        _id: null,
      },
    ],
  });
  const [decomposedChartData, setDecomposedChartData] = useState([]);
  const [velocityChartData, setVelocityChartData] = useState([]);
  const [distanceChartData, setDistanceChartData] = useState([]);

  const { id } = useParams();

  async function getMensuration() {
    try {
      const response = await api.get("/mensuration/" + id);
      setMensuration(response.data);
      setDecomposedChartData(
        response.data.data.map((frame) => {
          const totalTime = timeConverter(frame.time);
          return {
            tempo: Number(totalTime.toFixed(4)),
            "Aceleração em X": Number(frame.accelX.toFixed(4)),
            "Aceleração em Y": Number(frame.accelY.toFixed(4)),
            "Aceleração em Z": Number(frame.accelZ.toFixed(4)),
          };
        })
      );
      let newVelocityChartData = response.data.data
        .map((frame, idx, arr) => {
          if (idx !== 0) {
            const tempoAnterior = timeConverter(arr[idx - 1].time);
            const xAnterior = arr[idx - 1].accelX;
            const yAnterior = arr[idx - 1].accelY;
            const zAnterior = arr[idx - 1].accelZ;
            const tempoAtual = timeConverter(frame.time);

            const xConverted = realizarIntegral(
              tempoAnterior,
              tempoAtual,
              xAnterior,
              frame.accelX
            );
            const yConverted = realizarIntegral(
              tempoAnterior,
              tempoAtual,
              yAnterior,
              frame.accelY
            );
            const zConverted = realizarIntegral(
              tempoAnterior,
              tempoAtual,
              zAnterior,
              frame.accelZ
            );

            return {
              tempo: Number(tempoAtual.toFixed(4)),
              "Velocidade em X": Number(xConverted.toFixed(4)),
              "Velocidade em Y": Number(yConverted.toFixed(4)),
              "Velocidade em Z": Number(zConverted.toFixed(4)),
            };
          }
        })
        .filter((frame, index) => index !== 0);
      newVelocityChartData = newVelocityChartData.reduce(
        (total, frame, index) => {
          const newArray = [...total];
          if (index === 0) {
            return [
              {
                tempo: frame.tempo,
                "Velocidade em X": frame["Velocidade em X"],
                "Velocidade em Y": frame["Velocidade em Y"],
                "Velocidade em Z": frame["Velocidade em Z"],
              },
            ];
          }
          newArray.push({
            tempo: frame.tempo,
            "Velocidade em X":
              frame["Velocidade em X"] + newArray[index - 1]["Velocidade em X"],
            "Velocidade em Y":
              frame["Velocidade em Y"] + newArray[index - 1]["Velocidade em Y"],
            "Velocidade em Z":
              frame["Velocidade em Z"] + newArray[index - 1]["Velocidade em Z"],
          });
          return newArray;
        },
        []
      );
      setVelocityChartData(newVelocityChartData);
      setDistanceChartData(
        newVelocityChartData
          .map((frame, idx, arr) => {
            if (idx !== 0) {
              const tempoAnterior = arr[idx - 1].tempo;
              const xAnterior = arr[idx - 1]["Velocidade em X"];
              const yAnterior = arr[idx - 1]["Velocidade em Y"];
              const zAnterior = arr[idx - 1]["Velocidade em Z"];
              const tempoAtual = frame.tempo;

              const xConverted = realizarIntegral(
                tempoAnterior,
                tempoAtual,
                xAnterior,
                frame["Velocidade em X"]
              );
              const yConverted = realizarIntegral(
                tempoAnterior,
                tempoAtual,
                yAnterior,
                frame["Velocidade em Y"]
              );
              const zConverted = realizarIntegral(
                tempoAnterior,
                tempoAtual,
                zAnterior,
                frame["Velocidade em Z"]
              );

              return {
                tempo: Number(tempoAtual.toFixed(4)),
                "Posição em X": Number(xConverted.toFixed(4)),
                "Posição em Y": Number(yConverted.toFixed(4)),
                "Posição em Z": Number(zConverted.toFixed(4)),
              };
            }
          })
          .filter((frame, index) => index !== 0)
          .reduce((total, frame, index) => {
            const newArray = [...total];
            if (index === 0) {
              return [
                {
                  tempo: frame.tempo,
                  "Posição em X": frame["Posição em X"],
                  "Posição em Y": frame["Posição em Y"],
                  "Posição em Z": frame["Posição em Z"],
                },
              ];
            }
            newArray.push({
              tempo: frame.tempo,
              "Posição em X":
                frame["Posição em X"] + newArray[index - 1]["Posição em X"],
              "Posição em Y":
                frame["Posição em Y"] + newArray[index - 1]["Posição em Y"],
              "Posição em Z":
                frame["Posição em Z"] + newArray[index - 1]["Posição em Z"],
            });
            return newArray;
          }, [])
      );
    } catch (error) {
      const message = error.response.data.error;
      alert(
        error.response.status === 404 ? message : "falha ao encontrar a medição"
      );
    }
  }

  useEffect(() => {
    getMensuration();
  }, []);

  const csvSettingsAccel = {
    filename: "medicao_Aceleracao.csv",
    headers: [
      { label: "Tempo", key: "tempo" },
      { label: "AceleracaoX", key: "Aceleração em X" },
      { label: "AceleracaoY", key: "Aceleração em Y" },
      { label: "AceleracaoZ", key: "Aceleração em Z" },
    ],
    data: decomposedChartData,
  };

  const csvSettingsVelocity = {
    filename: "medicao_Velocidade.csv",
    headers: [
      { label: "Tempo", key: "tempo" },
      { label: "VelocidadeX", key: "Velocidade em X" },
      { label: "VelocidadeY", key: "Velocidade em Y" },
      { label: "VelocidadeZ", key: "Velocidade em Z" },
    ],
    data: velocityChartData,
  };

  const csvSettingsPosition = {
    filename: "medicao_Posicao.csv",
    headers: [
      { label: "Tempo", key: "tempo" },
      { label: "PosiçãoX", key: "Posição em X" },
      { label: "PosiçãoY", key: "Posição em Y" },
      { label: "PosiçãoZ", key: "Posição em Z" },
    ],
    data: distanceChartData,
  };

  return (
    <>
      <CSVLink {...csvSettingsAccel}>
        <IconButton>
          <GetAppIcon />
        </IconButton>
      </CSVLink>

      <AccelChart
        chartData={decomposedChartData}
        quantityName={"Aceleração"}
        measureUnit={"m/s²"}
      />

      <CSVLink {...csvSettingsVelocity}>
        <IconButton>
          <GetAppIcon />
        </IconButton>
      </CSVLink>

      <AccelChart
        chartData={velocityChartData}
        quantityName={"Velocidade"}
        measureUnit={"m/s"}
      />

      <CSVLink {...csvSettingsPosition}>
        <IconButton>
          <GetAppIcon />
        </IconButton>
      </CSVLink>

      <AccelChart
        chartData={distanceChartData}
        quantityName={"Posição"}
        measureUnit={"m"}
      />
    </>
  );
}
export default MensurationDetailsScreen;
