import logger from 'src/infra/logger';
import { connectRabbitMQ, exchangeName, orderRoutingKey } from 'src/infra/rabbit-mq';
import { Order } from 'src/interfaces/order';

export const sendOrder = async (order: Order | undefined) => {
  if(!order) {
    logger.error('order is undefined');
    return;
  }
  try {
    logger.info('connect to rabbitMQ');
    const { channel, connection } = await connectRabbitMQ();

    logger.info('Buffering order');
    const message = Buffer.from(JSON.stringify(order));

    channel.publish(exchangeName, orderRoutingKey, message);

    logger.info('order sended to queue order_queue');

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    logger.error('Erro ao enviar pedido para fila RabbitMQ', error);
  }
  
};