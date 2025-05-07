import express from 'express';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import App from '../client/App.vue';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// 处理根路径请求，进行 SSR
app.get('/', async (req, res) => {
  const vueApp = createSSRApp(App);
  const appHtml = await renderToString(vueApp);
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
  const html = indexHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
  res.send(html);
});

// 处理其他路径请求，返回静态 HTML
app.get('*', (req, res) => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
  res.send(indexHtml);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});    