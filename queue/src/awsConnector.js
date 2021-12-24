/* eslint-disable no-console */
// vendors
import aws from 'aws-sdk';

// config
import config from './config.js';

const awsConfig = {
  endpoint: new aws.Endpoint(config.AWS_ENDPOINT),
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
  region: config.REGION,
};

const incompleteReceiveParams = {
  AttributeNames: ['All'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  VisibilityTimeout: 20,
  WaitTimeSeconds: 20, // enables long-polling
};

const sqs = new aws.SQS(awsConfig);

/**
 * Gets the first queue URL
 * @returns {string} the first queue URL or an empyt string if failed.
 */
async function getQueueUrl() {
  const { QueueUrls } = await sqs.listQueues().promise();
  return QueueUrls[0] || '';
}

/**
 * Retrieves all the messages from the first queue.
 * @param {function} onReceive callback to be executed once the messages are retrieved.
 */
export default async function retrieveMessages(onReceive) {
  console.log('Loading messages...');
  try {
    const QueueUrl = await getQueueUrl();

    sqs.receiveMessage({ ...incompleteReceiveParams, QueueUrl }, onReceive);
  } catch (error) {
    console.log('Error while retrieving messages, try again.');
  }
}
