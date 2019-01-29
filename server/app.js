const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');

module.exports = async function () {
  const port = await require('get-port')({ port: 3001 });
  const app = new Koa();
  app.use(koaStatic(
    path.join( __dirname, './front')
  ));
  return new Promise(resolve => {
    app.listen(port, () => {
      const home = `http://127.0.0.1:${port}`;
      resolve({
        port,
        home,
      })
    });
  });
};
