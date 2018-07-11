const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`Process ${ ctx.request.method } ${ ctx.request.url }...`);
  await next();
});

router.get('/hello/:name', async (ctx, next) => {
  const name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${ name }!</h1>`;
});

router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
  <form action='/signin' method='post'>
    <p>Name: <input name='name' type='text'></p>
    <p>Password:<input name='password' type='password'></p>
    <p><input type='submit' value='submit'></p>
  </form>`;
});

router.post('/signin', async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const password = ctx.request.body.password || '';
  console.log(`signin with name: ${ name }, password: ${ password }`);

  if(name === 'charles' && password === '123') {
    ctx.response.body = `<h1>Welcome, ${ name }</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a herf='/'>Try again</a></p>`;
    
  }
})

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
  console.log(`app is running on http://127.0.0.1:3000`);
})