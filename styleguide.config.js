const path = require("path")
module.exports = {
  styleguideDir: "docs",
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "src/styles/*.js",
    "src/components/authentication/Authorization.js",
    "src/components/common/*.js",
    "src/components/editor/README.md",
    "src/components/editor/schema/*.js",
    "src/components/editor/flow/types.js",
    "src/components/editor/toolbar/toolbarStyles.js",
    "src/components/editor/utils/*.js",
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguide/Wrapper"),
  },
}
