// vendors
import aws from 'aws-sdk';

// config
import config from '../config.js';

// constants
import { NO_MSG_SENT } from '../controllers/constants/errorMessages.js';

const awsConfig = {
  endpoint: new aws.Endpoint(config.AWS_ENDPOINT),
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
  region: config.REGION,
};

const incompleteParams = {
  DelaySeconds: 10,
  QueueUrl: config.QUEUE_URL,
};

const sqs = new aws.SQS(awsConfig);

/**
 * Delivers a message to the queue. A message can include only XML, JSON,
 * and unformatted text.
 * @param {XmlString | string} message to be sent
 */
export default function sendMessage(message) {
  sqs.sendMessage(
    { ...incompleteParams, MessageBody: message },
    (error) => {
      // eslint-disable-next-line no-console
      if (error) console.log(NO_MSG_SENT, error);
    },
  );
}
