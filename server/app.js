const Koa = require('koa');
const ipFilter = require('koa-ip');
const koaStatic = require('koa-static');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const uuid = require('uuid');
const path = require('path');
const router = require('./router');

module.exports = async function server(preferPort = 80) {
  const seed = uuid.v1();
  const port = await require('get-port')({ port: preferPort });
  const app = new Koa();

  // By default, only intranet users access is allowed
  app.use(ipFilter({
    whitelist: ['192.168.*.*', '127.0.0.1', '::1'],
    blacklist: [],
  }));

  // Enable cors with default options
  app.use(cors());

  // Assets
  app.use(koaStatic(
    path.join( __dirname, './front')
  ));

  // Parse body
  app.use(koaBody());

  // koa-router
  router(app);

  return new Promise((resolve) => {
    app.listen(port, () => {
      const home = `http://127.0.0.1:${port}`;
      const blank = `${home}/blank`;
      resolve({
        port,
        home,
        blank,
        seed,
      });
    });
  });
};
