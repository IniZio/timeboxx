import eslint from "@nabla/vite-plugin-eslint";
import unocssAttributify from "@unocss/preset-attributify";
import unocssPresetUno from "@unocss/preset-uno";
import unocssTransformerDirectives from "@unocss/transformer-directives";
import react from "@vitejs/plugin-react-swc";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      presets: [
        // @ts-expect-error Preset type incompatitable
        unocssPresetUno(),
        // @ts-expect-error Preset type incompatitable
        unocssAttributify(),
      ],
      transformers: [
        // @ts-expect-error Transformer type incompatitable
        unocssTransformerDirectives(),
      ],
    }),
    react(),
    eslint({
      eslintOptions: {
        cache: true,
      },
    }),
    tsconfigPaths(),
  ],
});
