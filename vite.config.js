import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
    // historyApiFallback: true,
    // proxy: {
    //   '/api' : {
    //     target: 'http://localhost:8080/api/v1',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/,''),
    //   }
    // }
  },
})
