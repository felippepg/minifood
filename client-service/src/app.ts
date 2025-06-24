import fastify from 'fastify';
import { defineRoutes } from './routes';

const app = fastify({
  logger: true,
});

export const start = async () => {
  try {
    defineRoutes(app);
    await app.listen({ port: 5867});
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }

};

