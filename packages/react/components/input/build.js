import run from "@ahhachul/esbuild-config";
import pkg from "./package.json" assert { type: "json" };
import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

const processCSS = async (css) => {
  const style = await postcss([autoprefixer]).process(
    css,
    { from: undefined }, // suppress sourcemap warning
  );

  return style.css;
};

const config = {
  plugins: [
    vanillaExtractPlugin({
      processCSS,
    }),
  ],
};

run({ pkg, config });
