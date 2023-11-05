const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  return {
    entry: "./src/index.jsx",
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx"],
    },
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.[fullhash].js",
    },
    devServer: {
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve("./public/index.html"),
        filename: "./index.html",
      }),
      new ESLintPlugin({
        extensions: [`js`, `jsx`],
        exclude: [`/node_modules/`],
      }),
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
  };
};
