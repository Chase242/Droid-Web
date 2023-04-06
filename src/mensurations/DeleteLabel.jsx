import { Alert, Button, Grid, IconButton, Snackbar } from "@mui/material"
import React, { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton'
import api from "../api/api.js";

function DeleteLabel(props){
    const [loading,setLoading] = useState(false)
   



    return(
        <>
            {props.deleteMany?
                (
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="outlined" color="error"onClick=
                            {
                                ()=>
                                {   

                                    props.setDeleteMany(false)
                                    props.setSelectedRows([])
                                } 

                            }>Cancelar</Button>
                        </Grid>
                        <Grid item>
                            
                            <LoadingButton variant="outlined" color="success" loading = {loading} disabled={props.selectedRows.length===0} onClick=
                            {
                                async ()=>
                                {
                                    setLoading(true)
                                    try {
                                        const response = await api.put('/list/mensuration',props.selectedRows)
                                        props.setAlertSeverity('success')
                                        props.setAlertMessage(response.data.message)
                                    } catch(response){
                                        props.setAlertSeverity('error')
                                        props.setAlertMessage('Alguma coisa deu errado, tente novamente mais tarde!')
                                    }

                                    props.setSelectedRows([])
                                    props.setDeleteMany(false)
                                    props.getlist()
                                    setLoading(false)                                   
                                    props.setOpenAlert(true)
                                }
                            } >Apagar</LoadingButton>
                        </Grid>
                    </Grid>
                ) :
                (
                    <IconButton onClick={()=>props.setDeleteMany(true)}>
                        <DeleteIcon/>
                    </IconButton>
                )
            }
            
        </>
    )
    
}


export default DeleteLabel