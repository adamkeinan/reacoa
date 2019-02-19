const fs = require('fs');
const Router = require('koa-router');

module.exports = (app) => {
  const router = new Router();
  router.get('/blank', (ctx) => {
    ctx.body = '';
  });

  router.get('*', (ctx) => {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = fs.createReadStream('./front/index.html');
  });

  router.post('/test', (ctx) => {
    ctx.body = {
      error: null,
      data: 'server is running.',
    };
  });

  app.use(router.routes()).use(router.allowedMethods());
};

