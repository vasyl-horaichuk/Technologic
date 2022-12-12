import webpack from "webpack";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const config = {
    entry: {
        main: "./src/js/index.js",
    },

    output: {
        filename: "index.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: ['@babel/plugin-transform-runtime']
                        },
                    },
                ],
            },
        ],
    },

    plugins: [ 
        new webpack.ProvidePlugin({ 
            "jQuery": "jquery", 
            "window.jQuery": "jquery", 
            "jquery": "jquery", 
            "window.jquery": "jquery", 
            "$": "jquery", 
            "window.$": "jquery" 
        }),

        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'dist/js-report.html',
            openAnalyzer: false
        })
    ],
};

export default config;