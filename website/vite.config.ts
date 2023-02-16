import unocssAttributify from "@unocss/preset-attributify";
import unocssPresetUno from "@unocss/preset-uno";
import react from "@vitejs/plugin-react-swc";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss({
      presets: [unocssPresetUno(), unocssAttributify()],
    }),
    eslint({
      cache: true,
    }),
  ],
});
