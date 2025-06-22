import { FastifyInstance, FastifyRequest } from 'fastify';
import { IClient } from 'src/interfaces/client';
import * as clientsController from '../controllers/clients.controller';


export const defineRoutes = (server: FastifyInstance): void => {
  server.get('/api/v1/clients', async(request, reply) => {
    const result = await clientsController.getClients();

    if (result.statusCode === 204) {
      return reply.code(204).send();
    }

    return reply.code(result.statusCode).send(result);
  });

  server.get('/api/v1/client/:id', async(request: FastifyRequest<{ Params: { id: number } }>, reply) => {
    const { id } = request.params;
    const result = await clientsController.getClientById(id);

    if (result.statusCode === 204) {
      return reply.code(204).send();
    }

    return reply.code(result.statusCode).send(result);
  });

  server.get('/api/v1/client/document/:cpf', async(request: FastifyRequest<{ Params: { cpf: string } }>, reply) => {
    const { cpf } = request.params;
    const result = await clientsController.getClientByCpf(cpf);

    if (result.statusCode === 204) {
      return reply.code(204).send();
    }

    return reply.code(result.statusCode).send(result);
  });

  server.post('/api/v1/client/create', async(request: FastifyRequest<{ Body:IClient }>, reply) => {
    const data = request.body;
    const result = await clientsController.saveClient(data);

    return reply.code(result.statusCode).send(result);
  });

  server.put('/api/v1/client/update', async(request: FastifyRequest<{ Body:IClient }>, reply) => {
    const data = request.body;
    const result = await clientsController.updateClient(data);

    return reply.code(result.statusCode).send(result);
  });

  server.delete('/api/v1/client/delete/:id', async(request: FastifyRequest<{ Params: { id: number } }>, reply) => {
    const { id } = request.params;
    const result = await clientsController.deleteClient(id);

    return reply.code(result.statusCode).send();
  })
  ;};
