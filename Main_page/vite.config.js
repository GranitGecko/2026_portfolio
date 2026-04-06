import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname),  //Main_page
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, 'dist'), //Main_page/dist
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})