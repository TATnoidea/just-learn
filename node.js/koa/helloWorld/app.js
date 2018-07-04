const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
})

app.listen(3000, () => {
  console.log('Your server is running on: http://127.0.0.1:3000')
});