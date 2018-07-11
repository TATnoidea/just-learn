const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
  <form action='/signin' method='post'>
    <p>Name: <input name='name' type='text'></p>
    <p>Password: <input name='password' type='password'></p>
    <p><input type='submit' value='submit'></p>
  </form>`;
};

const fn_signin = async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const password = ctx.request.body.password || '';

  if(name === 'charles' && password === '123') {
    ctx.response.body = `<h1>Hello, ${ name }</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
    <p><a href='/'>Try again</a></p>`;
  }
};

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
};