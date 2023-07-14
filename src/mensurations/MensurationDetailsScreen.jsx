import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";
import AccelChart from "../assets/components/AccelChart";

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
            "Aceleração em X": Number(frame.accelX.toFixed(5)),
            "Aceleração em Y": Number(frame.accelY.toFixed(5)),
            "Aceleração em Z": Number(frame.accelZ.toFixed(5)),
          };
        })
      );
      setVelocityChartData(
        response.data.data.map((frame, idx, arr) => {
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
              tempo: Number(tempoAtual.toFixed(5)),
              "Aceleração em X": Number(xConverted.toFixed(5)),
              "Aceleração em Y": Number(yConverted.toFixed(5)),
              "Aceleração em Z": Number(zConverted.toFixed(5)),
            };
          }
        })
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

  return (
    <>
      <AccelChart chartData={decomposedChartData} />
      <AccelChart chartData={velocityChartData} />
    </>
  );
}
export default MensurationDetailsScreen;
