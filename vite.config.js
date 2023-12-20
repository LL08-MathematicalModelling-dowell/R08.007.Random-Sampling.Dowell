import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/R08.007.Random-Sampling.Dowell",
  plugins: [react()],
})
