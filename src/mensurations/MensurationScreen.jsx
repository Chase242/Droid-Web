


import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import ListIcon from '@mui/icons-material/List';
import { Alert, Button, Grid, IconButton, Snackbar } from '@mui/material';
import api from '../api/api.js';

import { gridTranslation } from './datagridTranslation.js';
import makeStyles from '@material-ui/styles/makeStyles';
import DeleteLabel from './DeleteLabel.jsx';



const useStyles = makeStyles({
    root: {
        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
            outline: 'none',
        },
    }
});

export default function MensurationScreen() {

    const [deleteMany,setDeleteMany] = useState(false)
    const [paginationModel,setpaginationModel] = useState({pageSize: 20, page:0})
    const [list,setList] = useState([])
    const[load,setLoad] = useState(false)
    const[selectedRows,setSelectedRows] = useState([])
    const[openAlert, setOpenAlert] = useState(false)
    const[alertMessage, setAlertMessage] = useState('')
    const[alertSeverity, setAlertSeverity] = useState('warning')

    const columns = [

      { 
       field: 'counter',
       headerName: 'N°', 
       width: 90,
       hideable: false,
       valueFormatter:(params)=>params.value+'°' 
     }, 
     { 
       
       field: 'id', 
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
           <IconButton 
             
             
             color='primary'
             onClick={(event)=>{
              event.stopPropagation()
              window.open('/Droid-Web/medicoes/' + cellValues.id, '_blank',)
             }}
           >
              <ListIcon/>
           </IconButton>
         )
       }
     },
     {
       field:'delete',
       
       filterable: false,
       hideable: false,
       sortable: false,
       editable:false,
       aggregable: false,
       groupable: false,
       disableColumnMenu: true,
       width:500,
   
       renderHeader:()=>{
         return(

           <DeleteLabel deleteMany={deleteMany} setDeleteMany={setDeleteMany} selectedRows={selectedRows} setSelectedRows={setSelectedRows} getlist={getlist} openAlert={openAlert} setOpenAlert={setOpenAlert} alertMessage={alertMessage} setAlertMessage={setAlertMessage} alertSeverity={alertSeverity} setAlertSeverity={setAlertSeverity}/>
             
         )
       }
       
     },
   ];

    async function getlist(){
      setLoad(true) 
     const response = await api.get('/mensuration/list')
     const newList = response.data.map((mensuration, index)=>{
     const fullDate = new Date(mensuration.date) 

      return {
        counter:index+1,
        id: mensuration._id,
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
    
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

  return (
    <Grid style={{ height:'50vw'}}>
        
      <DataGrid
        className={classes.root}
        rows = {list}
        columns = {columns}
        loading = {load} 
        pageSizeOptions={[5,10,20,50,100,300,500]}
        checkboxSelection = {deleteMany}
        disableRowSelectionOnClick = {!deleteMany}
        paginationMode={'client'}
        paginationModel={paginationModel}
        onPaginationModelChange={(model,details)=>{
          setpaginationModel(model)
        }}
        localeText = {gridTranslation}
        onRowSelectionModelChange={(newSelected, details)=>setSelectedRows(newSelected)}
        rowSelectionModel={selectedRows}
      />
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity = {`${alertSeverity==='success'?'success':'error'}`} variant ="filled" sx={{ width: '100%',}}>
                    {alertMessage}
                </Alert>
            </Snackbar>
    </Grid>
  );
}
