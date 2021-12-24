import retrieveMessages from './awsConnector.js';

function buildOrder(message) {
  const { Body } = message;
  return JSON.parse(Body);
}

function onReceive(error, data) {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error while retrieving data');
  } else {
    const messages = data.Messages || [];
    const orders = messages.map(buildOrder);

    // eslint-disable-next-line no-console
    console.log(orders);
  }
}

retrieveMessages(onReceive);
