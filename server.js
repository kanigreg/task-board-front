const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static('./dist/task-board-front'));

app.all('/api/*', createProxyMiddleware({
  target: process.env.API_URL,
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
}))

app.get('/*', (_, res) => {
  res.sendFile('index.html', {root: 'dist/task-board-front'});
});

app.listen(process.env.PORT || 4200, () => { 
  console.log(`Express server is listed on port ${process.env.PORT || 4200}`)
});
