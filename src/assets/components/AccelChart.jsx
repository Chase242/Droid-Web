import { Grid, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ReferenceArea,
} from "recharts";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import Polyfit from "./polyfit";

const initialState = {
  data: [],
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: null,
  bottom: null,
  animation: true,
};

function AccelChart(props) {
  const [chartState, setChartState] = useState(initialState);
  const [showDegreeBox, setShowDegreeBox] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [polyfit, setPolyfit] = useState(null);

  useEffect(() => {
    if (props.chartData.length > 1) {
      setChartState({
        ...chartState,
        data: props.chartData,
      });
    }
  }, [props.chartData]);

  const getAxisYDomain = (from, to, initialArray) => {
    const refData = initialArray.slice(
      initialArray.findIndex((frame) => frame.tempo === from) - 1,
      initialArray.findIndex((frame) => frame.tempo === to)
    );

    const allValues = [];
    refData.forEach((frame) => {
      allValues.push(
        frame[props.quantityName + " em X"],
        frame[props.quantityName + " em Y"],
        frame[props.quantityName + " em Z"]
      );
    });

    let min = Math.min(...allValues);
    let max = Math.max(...allValues);

    if (min === 0) min = -5;
    if (max === 0) max = 5;
    if (min < 0) min = min * 1.3;
    if (max < 0) max = max * 0.7;
    if (min > 0) min = min * 0.7;
    if (max > 0) max = max * 1.3;

    return [Number(min.toFixed(4)), Number(max.toFixed(4))];
  };

  function zoom() {
    let { refAreaLeft, refAreaRight } = chartState;
    const data = chartState.data || [];
    console.log(refAreaLeft);
    console.log(refAreaRight);
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setChartState({
        ...chartState,
        refAreaLeft: "",
        refAreaRight: "",
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      props.chartData
    );

    setChartState({
      ...chartState,
      refAreaLeft: "",
      refAreaRight: "",

      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    });
  }

  function zoomOut() {
    const { data } = chartState;
    setChartState({
      ...chartState,
      data: data.slice(),
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: null,
      bottom: null,
    });
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{ backgroundColor: "white", height: "100vh", userSelect: "none" }}
      direction={"column"}
    >
      <Grid item>
        <Polyfit />
      </Grid>
      <Button color="primary" onClick={zoomOut} endIcon={<ZoomOutMapIcon />}>
        Expandir
      </Button>

      <Grid item container alignItems={"center"}>
        <Typography style={{ transform: "rotate(-90deg)" }}>
          {props.quantityName} ({props.measureUnit})
        </Typography>
        <ResponsiveContainer width="80%" height={400}>
          <LineChart
            width={900}
            height={400}
            data={chartState.data}
            onMouseDown={(e) =>
              setChartState({ ...chartState, refAreaLeft: e.activeLabel })
            }
            onMouseMove={(e) =>
              chartState.refAreaLeft &&
              setChartState({ ...chartState, refAreaRight: e.activeLabel })
            }
            onMouseUp={zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              allowDataOverflow
              name="tempo"
              dataKey="tempo"
              domain={[chartState.left, chartState.right]}
              type="number"
            />
            <YAxis
              allowDataOverflow
              domain={([dataMin, dataMax]) => {
                return [
                  chartState.bottom || Number((dataMin - 5).toFixed(4)),
                  chartState.top || Number((dataMax + 5).toFixed(4)),
                ];
              }}
              type="number"
              yAxisId="1"
            />

            <Tooltip labelFormatter={(label) => "Tempo: " + label} />

            <Line
              yAxisId="1"
              type="natural"
              dataKey={props.quantityName + " em X"}
              stroke="#82ca9d"
              dot={false}
              animationDuration={300}
            />
            <Line
              yAxisId="1"
              type="natural"
              dataKey={props.quantityName + " em Y"}
              stroke="#8884d8"
              dot={false}
              animationDuration={300}
            />
            <Line
              yAxisId="1"
              type="natural"
              dataKey={props.quantityName + " em Z"}
              stroke="#FF0000"
              dot={false}
              animationDuration={300}
            />

            {chartState.refAreaLeft && chartState.refAreaRight ? (
              <ReferenceArea
                yAxisId="1"
                x1={chartState.refAreaLeft}
                x2={chartState.refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </Grid>

      <Typography>Tempo(segundos)</Typography>
    </Grid>
  );
}
export default AccelChart;
