import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/100107-DowellEmailExtractor/",
  plugins: [react()],
})
