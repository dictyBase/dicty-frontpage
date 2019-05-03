const path = require("path")
module.exports = {
  styleguideDir: "docs",
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "src/styles/*.js",
    "src/components/editor/README.md",
    "src/components/common/*.js",
    "src/components/editor/utils/*.js"
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/styleguide/Wrapper"),
  },
}
