import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["ec2-51-21-195-127.eu-north-1.compute.amazonaws.com"]
  }
})
