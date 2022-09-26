const path = require('path');


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            util: require.resolve("util/"),
            assert: require.resolve("assert/"),
            path: require.resolve("path-browserify"),
            url: require.resolve("url/"),
            fs: false
        },
        alias: {
            process: "process/browser"
        }
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png'
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = config;