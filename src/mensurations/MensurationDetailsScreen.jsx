import api from "../api/api"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Stack } from "@mui/material";
import { CartesianGrid, Line, LineChart, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function timeConverter(time){
  const minutes = Number(time.slice(0,2))*60
  const seconds = Number(time.slice(3,5))
  const miliseconds = Number(time.slice(6,9))/1000
  return minutes+seconds+miliseconds
}

const initialState = {
  data: [],
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top:null,
  bottom:null,
  animation: true,
};


function MensurationDetailsScreen(){

const [mensuration,setMensuration] = useState({
"_id": null,
"name": null,
"date": null,
"data": [
    {
        "accelX":null,
        "accelY": null,
        "accelZ": null,
        "time": null,
        "_id": null
    }]})
    

const [chartState,setChartState] = useState(initialState)




const {id} = useParams()

const getAxisYDomain = (from, to, initialArray) => {
  
  const refData = initialArray.slice(initialArray.findIndex((frame)=>timeConverter(frame.time)==from) - 1, initialArray.findIndex((frame)=>timeConverter(frame.time)==to));
  
  
  const allValues=[]
  refData.forEach(frame => {
    allValues.push(frame.accelX,frame.accelY,frame.accelZ)

  });

  let min = Math.min(...allValues)
  let max = Math.max(...allValues)

  if(min===0)min=-5
  if(max===0)max=5
  if(min<0)min=min*1.3
  if(max<0)max=max*0.7 
  if(min>0)min=min*0.7
  if(max>0)max=max*1.3 
  return  [min.toFixed(4),max.toFixed(4)]

};

function zoom() {
  let { refAreaLeft, refAreaRight } = chartState;
  const  data  = chartState.data || [];

  if (refAreaLeft === refAreaRight || refAreaRight === '') {
    setChartState( {
      ...chartState,
      refAreaLeft: '',
      refAreaRight: '',
    });
    return;
  }

  // xAxis domain
  if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

  // yAxis domain
  const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, mensuration.data);
  

  setChartState({
    ...chartState,
    refAreaLeft: '',
    refAreaRight: '',
    
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
    refAreaLeft: '',
    refAreaRight: '',
    left: 'dataMin',
    right: 'dataMax',
    top: null,
    bottom: null,
    
  });
}

async function getMensuration(){

  try {
    const response =await api.get('/mensuration/'+id)
    setMensuration(response.data)
    setChartState({...chartState,data:response.data.data.map((frame)=>{
      const totalTime = timeConverter(frame.time)
      return {tempo:totalTime, 'Aceleração em X':frame.accelX, 'Aceleração em Y':frame.accelY, 'Aceleração em Z':frame.accelZ}
    })})       
  }catch(error){
    const message = error.response.data.error
    alert(error.response.status === 404?message : 'falha ao encontrar a medição' )
  }
}

useEffect(()=>{

    getMensuration()

},[])

return(

  <Stack justifyContent={'center'} alignItems={'center'} style={{backgroundColor:'white',height:'100vh', userSelect: 'none'}}>
    <button type="button" className="btn update" onClick={zoomOut}>
          Zoom Out
        </button>

        <ResponsiveContainer width="80%" height={400}>
          <LineChart
            width={900}
            height={400}
            data={chartState.data}
            onMouseDown={(e) => setChartState({ ...chartState,refAreaLeft: e.activeLabel })}
            onMouseMove={(e) => chartState.refAreaLeft && setChartState({ ...chartState,refAreaRight: e.activeLabel })}
           
            onMouseUp={zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey="tempo" domain={[chartState.left, chartState.right]} type="number" />
            <YAxis allowDataOverflow domain={([dataMin,dataMax])=>{
              
              return[chartState.bottom||(dataMin-5),chartState.top||(dataMax+5)]}

            } type="number" yAxisId="1" />
              
            
            <Tooltip />
           
            <Line yAxisId="1" type="natural" dataKey="Aceleração em X" stroke="#82ca9d" animationDuration={300} />
            <Line yAxisId="1" type="natural" dataKey="Aceleração em Y" stroke="#8884d8" animationDuration={300} />
            <Line yAxisId="1" type="natural" dataKey="Aceleração em Z" stroke="#FF0000" animationDuration={300} />

            {chartState.refAreaLeft && chartState.refAreaRight ? (
              <ReferenceArea yAxisId="1" x1={chartState.refAreaLeft} x2={chartState.refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
  </Stack>
)
}
export default MensurationDetailsScreen