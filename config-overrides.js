const { DefinePlugin } = require("webpack");

const { readdirSync, readFileSync } = require("fs");
const { join: joinPath } = require("path");

// get data from package.json
const packageJson = require("./package.json");

// get file names for naviance data
const navianceDataFileNames = readdirSync(joinPath(__dirname, "./data"));

// put naviance data in array
let navianceData = [];
for (const file of navianceDataFileNames) {
  navianceData.push(
    // parse json
    JSON.parse(readFileSync(joinPath(__dirname, "./data/" + file)).toString())
  );
}

module.exports = function override(config) {
  // add my extras
  if (!config.plugins) config.plugins = [];
  config.plugins.push(
    new DefinePlugin({
      __NAVIANCE_DATA__: JSON.stringify(navianceData),
      __APP_VERSION__: JSON.stringify(packageJson.version),
    })
  );

  return config;
};
