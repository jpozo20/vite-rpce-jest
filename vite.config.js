import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

import manifest from "./public/manifest.json"
import { crx } from "rollup-plugin-chrome-extension"

export default defineConfig((configEnv) => {
   const isDevelopment = configEnv.mode === "development"
   const jsxRuntime = isDevelopment ? "classic" : "automatic"

   return {
      plugins: [
         tsconfigPaths(),
         react({
            jsxRuntime: jsxRuntime,
         }),
         crx({
            manifest,
         }),
      ],
      resolve: {
         alias: {
            src: resolve(__dirname, "src"),
            app: resolve(__dirname, "src", "app"),
            assets: resolve(__dirname, "src", "assets"),
            components: resolve(__dirname, "src", "components"),
            hooks: resolve(__dirname, "src", "hooks"),
         },
      },
      css: {
         modules: {
            generateScopedName: isDevelopment
               ? "[name]__[local]__[hash:base64:5]"
               : "[hash:base64:5]",
         },
      },
   }
})
