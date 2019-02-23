const Koa = require('koa');
const route = require('koa-route');
const api = require('./api.js');

const app = new Koa();
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8000

app.use(route.get('/api/*', api));
app.listen(port, host);
console.log('success');

