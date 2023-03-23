


import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';
import api from '../api/api.js';
import axios from 'axios';
import { gridTranslation } from './datagridTranslation.js';
import makeStyles from '@material-ui/styles/makeStyles';

const columns = [
   { 
    field: 'id',
    headerName: 'ID', 
    width: 90,
    hideable: false, 
  }, 
  { 
    
    field: 'uuid', 
    headerName: 'Identificador', 
    width: 220,
    
  },
  
  { 
    field: 'name',
    headerName: 'Nome',
    width: 220,
    
  },
  { 
    field: 'date', 
    headerName: 'Data', 
    width: 130,
    
  },
  {
    field: 'time',
    headerName: 'Hora',
    width: 110,
    
  },
  {
    field: 'duration',
    headerName: 'Duração',
    description: 'Essa coluna mostra o tempo total de cada gravação',
    width: 140,
      
  },
  {
    field: 'details',
    headerName:'Detalhes',
    description:'Acessar detalhes da gravação',
    sortable: false,
    width: 140,
    filterable: false,
    renderCell:(cellValues)=>{
      
      return(
        <Button

          variant='contained'
          color='primary'
          onClick={(event)=>{
           event.stopPropagation()
           console.log(cellValues)
          }}
        >Detalhes
        </Button>
      )
    }
  },
];

const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

export default function MensurationScreen() {

    const [deleteMany,setdeleteMany] = useState(true)
    const [paginationModel,setpaginationModel] = useState({pageSize: 20, page:0})
    const [list,setList] = useState([])
    const[load,setLoad] = useState(false)

    async function getlist(){
      setLoad(true) 
     const response = await api.get('/mensuration/list')
     const newList = response.data.map((mensuration, index)=>{
     const fullDate = new Date(mensuration.date) 

      return {
        id:index+1,
        uuid: mensuration._id,
        name:mensuration.name,
        date:fullDate.toLocaleDateString('pt-BR'),
        time:fullDate.toLocaleTimeString('pt-BR'),
        duration: mensuration.data[mensuration.data.length-1].time
      }
     })
      setList(newList) 
      setLoad(false)
    }
    const classes = useStyles();
    useEffect(()=>{
      getlist()
    },[])

  return (
    <Grid style={{ height:'50vw'}}>
        
      <DataGrid
        className={classes.root}
        rows = {list}
        columns = {columns}
        loading = {load} 
        pageSizeOptions={[5,10,20,50,100,300,500]}
        checkboxSelection = {deleteMany}
        paginationMode={'client'}
        paginationModel={paginationModel}
        onPaginationModelChange={(model,details)=>{
          setpaginationModel(model)
        }}
        localeText = {gridTranslation}
      />
    </Grid>
  );
}
