import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { createTheme, CssBaseline, ScopedCssBaseline, ThemeProvider } from '@mui/material'


const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
         display:"block",
         margin: "0px" ,
         backgroundColor: "#ADD8E6",
         
        }
      }
    }
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <App/>
        
    </ThemeProvider>
    
  </React.StrictMode>,
  
)
