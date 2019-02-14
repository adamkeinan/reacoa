const Router = require('koa-router');

module.exports = (app) => {
  const router = new Router();

  router.get('/blank', (ctx) => {
    ctx.body = '';
  });

  router.post('/test', (ctx) => {
    ctx.body = {
      error: null,
      data: 'server is running.',
    };
  });

  app.use(router.routes()).use(router.allowedMethods());
};

