const controller = require('./controller');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(controller());

app.listen(3000, () => {
  console.log(`app is running on http://127.0.0.1:3000`);
})