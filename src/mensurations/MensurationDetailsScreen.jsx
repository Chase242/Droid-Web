import api from "../api/api"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Chart } from "react-google-charts";
import { Stack } from "@mui/material";




const options = {
  chartArea: { height: "80%", width: "90%" },
  hAxis: { slantedText: false },

  legend: { position: "none" },
  series: {
    0: { curveType: "function" },
    1: { curveType: "function" },
    2: { curveType: "function" },
  },
};

function MensurationDetailsScreen(){

const [mensuration,setMensuration] = useState({})
const[chartData,setChartData] = useState([
  ['Tempo','Aceleração em X', 'Aceleração em Y', 'Aceleração em Z']
])

const {id} = useParams()


async function getMensuration(){

    try {
        const response =await api.get('/mensuration/'+id)
        setMensuration(response.data)

        const newchartData = [...chartData] 
        response.data.data.forEach(frame => {
          const minutes = Number(frame.time.slice(0,2))*60
          const seconds = Number(frame.time.slice(3,5))
          const miliseconds = Number(frame.time.slice(6,9))/1000
          const totalTime = minutes+seconds+miliseconds

          newchartData.push([totalTime, frame.accelX, frame.accelY, frame.accelZ])
        });
        console.log(newchartData)
        setChartData(newchartData)
    }catch(error){
        const message = error.response.data.error
        alert(error.response.status === 404?message : 'falha ao encontrar a medição' )
    }
}

useEffect(()=>{

    getMensuration()

},[])

return(

  <Stack justifyContent={'center'} alignItems={'center'} style={{backgroundColor:'white',height:'100vh'}}>
  <Chart
    chartType="LineChart"
    width="80%"
    height="400px"
    data={chartData}
    options={options}
    chartPackages={["controls"]}
    controls={[
      {
        controlType: "ChartRangeFilter",
        options: {
          filterColumnLabel: 'Tempo',
          ui: {
            chartType: "LineChart",
            chartOptions: {
              chartArea: { width: "90%", height: "50%" },
              hAxis: { baselineColor: "none" },
            },
          },
        },
        controlPosition: "bottom",
      
      },
    ]}
    />
    </Stack>
)
}
export default MensurationDetailsScreen