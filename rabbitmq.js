const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

async function connectToQueue() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queueName = 'my_queue';

    await channel.assertQueue(queueName, { durable: false });
    console.log('Conectado à fila RabbitMQ');

    channel.consume(queueName, (message) => {
      console.log('Mensagem recebida:', message.content.toString());
      // Faça o processamento da mensagem aqui

      // Confirmação de conclusão do processamento
      channel.ack(message);
    });
  } catch (error) {
    console.error('Erro ao conectar à fila RabbitMQ:', error);
  }
}

module.exports = { connectToQueue };
