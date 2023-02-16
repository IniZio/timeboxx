import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import unocss from 'unocss/vite'
import unocssPresetUno from '@unocss/preset-uno'
import unocssAttributify from '@unocss/preset-attributify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss({
      presets: [
        unocssPresetUno(),
        unocssAttributify(),
      ]
    }),
  ],
})
