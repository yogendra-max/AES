import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import tailwindcss from '@tailwindcss/vite'   // 👈 add this

export default defineConfig({
  plugins: [
    react(),
    //tailwindcss()  // 👈 enable Tailwind for Vite
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
