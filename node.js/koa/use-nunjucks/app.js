const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  const autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  const noCache = opts.noCache || false;
  const watch = opts.watch || false;
  const throwOnUndefined = opts.throwOnUndefined || false;
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('views', {
      noCache: noCache,
      watch: watch,
    }), {
      autoescape: autoescape,
      throwOnUndefined: throwOnUndefined
    }
  );
  if (opts.filters) {
    for (const f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

const env = createEnv('views', {
  watch: true,
  filters: {
    hex: n => {
      return '0x' + n.toString(16);
    }
  }
});

// const s = env.render('hello.html', { name: '小明' });
// const s = env.render('hello.html', { name: "<script>alert('小明')</script>" });
// console.log(s);

const html = env.render('extend.html', {
  header: 'Hello',
  body: 'World'
});
console.log(html)