module.exports = {
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        compact: false
                    }
                }
            }
        ]
    }
}