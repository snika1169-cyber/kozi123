import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
i// Remove or update lines like this:
import shirtImg from '../assets/Shoe_photo/.png';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/kozi123/'
})
