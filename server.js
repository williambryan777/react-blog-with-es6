var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var  REMOTE_URL = 'http://www.followme.com/';
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  colors: true,
  inline: true,
  progress: true,
  proxy: {
      '/Social': {
          target: REMOTE_URL,
          secure: false
      },
      '/social': {
          target: REMOTE_URL,
          secure: false
      },
      '/Avata': {
          target: REMOTE_URL,
          secure: false
      },
      '/file': {
          target: REMOTE_URL,
          secure: false
      },
      '/UserPage': {
          target: REMOTE_URL,
          secure: false
      },
      '/person': {
          target: REMOTE_URL,
          secure: false
      },
      '/Account': {
          target: REMOTE_URL,
          secure: false
      }

  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3001/');
});
