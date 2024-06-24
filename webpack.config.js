const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");
const dotenvWebpack = require("dotenv-webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
// const copyPlugin = require("copy-webpack-plugin");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = {
    mode: "development",
    entry: {
        app: "./src/js/app.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        assetModuleFilename: "images/[name][ext]",
        clean: true,
    },
    target: "web",
    devServer: {
        static: "./src"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new dotenvWebpack({
            path: "./.env.local"
        }),
        new webpack.DefinePlugin(envKeys),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            chunks: ["app"],
            inject: "body",
            filename: "index.html",
        }),
        /* new copyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src/images"),
              to: path.resolve(__dirname, "dist/images"),
            },
          ],
        }),
        */
    ],
}
