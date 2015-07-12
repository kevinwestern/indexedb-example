var path = require('path');
module.exports = {
    entry: './es6/app.js',
    output: {
        path: './js/',
        filename: 'app.es5.js'
    },
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};