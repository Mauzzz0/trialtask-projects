import { INestApplication } from '@nestjs/common';

export const ShowRoutesAtStart = (app: INestApplication) => {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined)
    .map((item) =>
      console.log(
        `[${item.route.method.toUpperCase()}]` +
          ' '.repeat(5 - item.route.method.toUpperCase().length) +
          `${item.route.path}`,
      ),
    );
};
