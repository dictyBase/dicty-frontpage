const path = require("path")

module.exports = {
  styleguideDir: "styleguide",
  pagePerSection: true,
  title: "dictyBase Frontpage",
  webpackConfig: require("react-scripts/config/webpack.config")("development"),
  propsParser: (filePath, source, resolver, handlers) => {
    const { ext } = path.parse(filePath)
    return ext === ".tsx"
      ? require("react-docgen-typescript")
          .withCustomConfig(`${process.cwd()}/tsconfig.json`)
          .parse(filePath, source, resolver, handlers)
      : require("react-docgen").parse(source, resolver, handlers)
  },
  ignore: [
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*Styles.{js,jsx,ts,tsx}",
    "**/mock*.{js,jsx,ts,tsx}",
    "**/types.{js,jsx,ts,tsx}",
    "src/**/styles/*.{js,jsx,ts,tsx}",
    "src/**/types/*.{js,jsx,ts,tsx}",
    "src/**/utils/*.{js,jsx,ts,tsx}",
    "src/**/hooks/*.{js,jsx,ts,tsx}",
    "src/**/*Context.{js,jsx,ts,tsx}",
    "src/**/*Store.{js,jsx,ts,tsx}",
  ],
  sections: [
    {
      name: "Introduction",
      content: "src/README.md",
    },
    {
      name: "Common Components",
      components: "src/common/components/**/*.tsx",
      description:
        "This contains a list of components commonly used throughout the entire web application.",
    },
    {
      name: "About Page",
      components: "src/features/About/**/*.tsx",
      description: "All components used for the About page.",
    },
    {
      name: "Downloads Page",
      components: "src/features/Downloads/**/*.tsx",
      description: "All components used for the Downloads page.",
    },
    {
      name: "Editable Pages",
      components: "src/features/EditablePages/**/*.tsx",
      description: "All components used for editing and creating pages.",
    },
    {
      name: "Frontpage",
      components: "src/features/Frontpage/**/*.tsx",
      description: "All components used for the homepage display.",
    },
    // {
    //   name: "Error Displays",
    //   components: "src/components/errors/*.tsx",
    //   description: "All components designed for handling errors."
    // },
  ],
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/app/styleguide/Wrapper"),
  },
  template: {
    favicon: "./public/favicon.ico",
    head: {
      links: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto",
        },
      ],
    },
  },
  theme: {
    maxWidth: "100%",
    color: {
      codeBackground: "#F5F5F5;",
      ribbonBackground: "#004080",
    },
    fontFamily: {
      base: "Roboto, sans-serif",
    },
    fontSize: {
      base: 14,
      text: 16,
      small: 13,
      h1: 40,
      h2: 24,
      h3: 18,
      h4: 18,
      h5: 16,
      h6: 16,
    },
  },
  ribbon: {
    url: "http://www.github.com/dictyBase/dicty-frontpage",
    text: "View on GitHub",
  },
}
