import client from 'amqplib';

const rabbitMQUrl = process.env.RABBITMQ_URL ?? '';
const exchangeName = process.env.EXCHANGE_NAME ?? '';
const exchangeType = process.env.EXCHANGE_TYPE ?? '';
const orderQueue = process.env.ORDER_QUEUE ?? '';
const orderRoutingKey = process.env.ORDER_ROUTING_KEY ?? '';


export const connectRabbitMQ = async (): Promise<{
    connection: client.ChannelModel;
    channel: client.Channel;
}> => {
  const connection =  await client.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, exchangeType, {
    durable: true,
  });

  await channel.assertQueue(orderQueue, { durable: true});
  await channel.bindQueue(orderQueue, exchangeName, orderRoutingKey);

  return { connection, channel};
};

export { exchangeName, orderRoutingKey };
