const Koa = require('koa');
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
  app.use(cors()); // Enable cors with default options
  app.use(koaBody());
  router(app); // koa-router
  app.use(koaStatic(
    path.join( __dirname, './front')
  ));
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
