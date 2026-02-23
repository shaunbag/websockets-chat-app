import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
	allowedHosts: ["ec2-13-49-243-148.eu-north-1.compute.amazonaws.com", "chattymcchatface.co.uk"]
  }
})
