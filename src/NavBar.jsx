import { AppBar, Button, Grid, Link, Toolbar, Typography} from "@mui/material"
import React from "react"

import "./style.css"


function NavBar(){
    const buttonWidth = 150
    const buttonBackColor ='#DCDCDC'
    const textButtonColor = '#F8F8FF'

    return(

        <Grid container style={{backgroundColor:'#1976d2', paddingLeft:50}} flexDirection='row'>
           
               
            <Grid item container  alignItems={"center"} sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}> <Link href="/" style={{width:buttonWidth, textAlign:'center'}}><Typography color={textButtonColor}> DroidWeb</Typography></Link> </Grid>

           <Grid item container alignItems={"center"} sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}> <Link href="/gravar" style={{width:buttonWidth, textAlign:'center'}} ><Typography color={textButtonColor}> Gravar</Typography></Link> </Grid>

           <Grid item container alignItems={"center"}sx={{"&:hover":{backgroundColor:buttonBackColor}, height:'3.5vw', width:buttonWidth}}>  <Link href="/medicoes" style={{width:buttonWidth, textAlign:'center'}}><Typography color={textButtonColor}> Medições</Typography></Link> </Grid>
                    
           
        </Grid>
            
        
    )
}
export default NavBar