import fastify from 'fastify';

const app = fastify({
  logger: true,
});

export const start = async () => {
  try {
    app.log.info('server is running');
    await app.listen({ port: 5867});
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }

};

