import eslint from "@nabla/vite-plugin-eslint";
import unocssAttributify from "@unocss/preset-attributify";
import unocssPresetUno from "@unocss/preset-uno";
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
      // @ts-expect-error Preset type incompatitable
      presets: [unocssPresetUno(), unocssAttributify()],
    }),
    eslint({
      eslintOptions: {
        cache: true,
      },
    }),
    tsconfigPaths(),
  ],
});
