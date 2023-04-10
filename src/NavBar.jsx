import { AppBar, Button, Grid, Link, Toolbar, Typography} from "@mui/material"
import React from "react"

import "./style.css"


function NavBar(){
    const buttonWidth = 150
    const buttonBackColor ='#DCDCDC'
    const textButtonColor = '#F8F8FF'

    return(

        <Grid container style={{backgroundColor:'#1976d2', paddingLeft:50}} flexDirection='row'>
           
               
           <Grid item container  alignItems={"center"} sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}> 
                <Link href="/Droid-Web/" style={{width:buttonWidth, justifyContent:'center', height:'3.5vw', display:'flex',alignItems:'center'}}>
                    <Typography color={textButtonColor}> DroidWeb</Typography>
                </Link> 
            </Grid>

           <Grid item container alignItems={"center"} sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}> 
                <Link href="/Droid-Web/gravar" style={{width:buttonWidth, justifyContent:'center', height:'3.5vw', display:'flex',alignItems:'center'}} >
                    <Typography color={textButtonColor}> Gravar</Typography>
                </Link>
            </Grid>

           <Grid item container alignItems={"center"}sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}> 
                <Link href="/Droid-Web/medicoes" style={{width:buttonWidth, justifyContent:'center', height:'3.5vw', display:'flex',alignItems:'center'}}>
                    <Typography color={textButtonColor} > Medições</Typography>
                </Link> 
            </Grid>
                    
           
        </Grid>
            
        
    )
}
export default NavBar