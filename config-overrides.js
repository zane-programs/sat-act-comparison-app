const { execSync } = require("child_process");
const { DefinePlugin } = require("webpack");

// get data from package.json
const packageJson = require("./package.json");

// get commit hash from git
const commitHash = execSync("git rev-parse HEAD").toString().trim();

module.exports = function override(config, webpackEnv) {
  // add optimization and plugins if not already there
  if (!config.optimization) config.optimization = {};
  if (!config.plugins) config.plugins = [];

  // in dev, don't split into chunks. in prod, do!
  // thanks to (not yet merged) pr:
  // https://github.com/facebook/create-react-app/pull/12213
  config.optimization.splitChunks =
    webpackEnv === "development"
      ? undefined
      : {
          chunks: "all",
        };

  // inject data into bundle (currently just
  // app version and commit hash)
  config.plugins.push(
    new DefinePlugin({
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __COMMIT_HASH__: JSON.stringify(commitHash),
    })
  );

  return config;
};
