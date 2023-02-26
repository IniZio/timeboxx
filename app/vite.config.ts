import eslint from "@nabla/vite-plugin-eslint";
import unocssAttributify from "@unocss/preset-attributify";
import unocssPresetUno from "@unocss/preset-uno";
import unocssPresetWebFonts from "@unocss/preset-web-fonts";
import react from "@vitejs/plugin-react-swc";
import unocss from "unocss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@iniz/react",
    }),
    unocss({
      presets: [
        // @ts-expect-error Preset type incompatitable
        unocssPresetUno(),
        // @ts-expect-error Preset type incompatitable
        unocssAttributify(),
        unocssPresetWebFonts({
          provider: "bunny",
          fonts: {
            sans: "Inter",
          },
        }),
      ],
    }),
    eslint({
      eslintOptions: {
        cache: true,
      },
    }),
    tsconfigPaths(),
  ],
});
