// @ts-check

import ts from "@wessberg/rollup-plugin-ts"
import micromatch from "micromatch"
import path from "path"

/** @type {typeof String.raw} */
const r = (...args) => path.resolve(__dirname, String.raw(...args))

const isDemoMatch = micromatch.matcher(r`./src/demo/**/*`)
/** @type {import("rollup").GetManualChunk} */
const manualChunks = (id) => (isDemoMatch(id) ? "demo" : "index")

export default /** @type {import("rollup").RollupOptions} */ ({
  input: { index: r`src/index.ts`, demo: r`src/demo/index.ts` },
  output: [
    { dir: "dist", format: "esm", entryFileNames: "[name].mjs", manualChunks },
    { dir: "dist", format: "cjs", entryFileNames: "[name].js", manualChunks },
  ],
  plugins: [
    ts({
      typescript: require("typescript"),
    }),
  ],
})
