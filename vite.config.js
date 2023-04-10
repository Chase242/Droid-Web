import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/Droid-Web/',
  plugins: [react()],
  server:{
    fs:{
      allow:["..","./node_modules"]
    }
  }

  
})
