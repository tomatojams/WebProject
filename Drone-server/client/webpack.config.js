const path = require('path');

module.exports = {
  // 엔트리 및 아웃풋 설정 등
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 모드 설정
  mode: 'development',

  // Webpack Dev Server 설정
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // 간단한 미들웨어 추가
      devServer.app.use((req, res, next) => {
        if (req.url.startsWith('/api')) {
          console.log(`API 요청: ${req.url}`);
        }
        next();
      });

      // 기존 미들웨어들 반환
      return middlewares;
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 5000,
  },
};
