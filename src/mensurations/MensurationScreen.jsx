


import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {field: 'age',headerName: 'Age',width: 110, },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 12 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 2 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Rodrygo', firstName: 'Harvey', age: 65 },
  
];

export default function MensurationScreen() {
    const [deleteMany,setdeleteMany] = useState(true)
    const [paginationModel,setpaginationModel] = useState({pageSize: 5, page:0})
  return (
    
    

    <Grid style={{ height:'40vw'}}>
        
      <DataGrid
        rows={rows}
        columns={columns}
        
        pageSizeOptions={[5,10,20]}
        checkboxSelection = {deleteMany}
        paginationMode={'client'}
        paginationModel={paginationModel}
        onPaginationModelChange={(model,details)=>{
          setpaginationModel(model)
        }}
      />
    </Grid>
  );
}