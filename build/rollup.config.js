// rollup.config.js
import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";
import scss from "rollup-plugin-scss";
import svg from "rollup-plugin-vue-inline-svg";

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: "src/DateTimePicker/index.js",
  plugins: [
    scss(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    commonjs(),
    svg(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble({ objectAssign: "Object.assign" })
  ]
};

// UMD/IIFE shared settings: externals and output.globals
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
};

// Customize configs for individual targets
const buildFormats = [];

if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    output: {
      file: "dist/simple-vue2-datetimepicker.esm.js",
      format: "esm",
      exports: "named"
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "umd") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/simple-vue2-datetimepicker.umd.js",
      format: "umd",
      name: "DateTimePicker",
      exports: "named",
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/simple-vue2-datetimepicker.min.js",
      format: "iife",
      name: "DateTimePicker",
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
