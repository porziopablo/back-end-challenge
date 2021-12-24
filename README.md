# ponce-challenge
RESTful API that would allow an application to create shipping orders for products from the Warehouse to a Shop. [Read the complete challenge](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Challenge.pdf).

## Tech stack
 - AWS SQS 
 - Express 4.17
 - Javascript ES6+
 - JWT Auth token
 - Node 16
 - PostgreSQL 13.5

## Project setup
1 - Clone repo:

Using HTTPS:
```
git clone https://github.com/porziopablo/ponce-challenge.git
```
Or using SSH:
```
git clone git@github.com:porziopablo/ponce-challenge.git
```
2 - Install dependencies:
```
npm install
```
3 - Create an `.env` file in your project's root directory, based on the `.env.example` provided. There are some default values that you can change if needed, but you must complete these:
```env
# PostgreSQL instance URL
DB_URL =

# port on which the server should be listening to requests
SERVER_PORT = 4000

# JWT auth token, check out API doc and generate one using https://jwt.io/#debugger-io
MOCKED_JWT_TOKEN =

# config for AWS endpoint where the SQS queue is hosted
AWS_ENDPOINT = http://localhost:9324
QUEUE_URL = http://localhost:9324/queue/dispatch-queue
ACCESS_KEY_ID = something             # for ElasticMQ it doesn't matter, but some value has to be present
SECRET_ACCESS_KEY = something         # for ElasticMQ it doesn't matter, but some value has to be present
REGION = something                    # for ElasticMQ it doesn't matter, but some value has to be present
```
4 - Create the tables, stored procedures/functions and seed them by running:
```
npm run seed
```
5 - Run the project in development environment:
```
npm run dev
```
## Code format
The project includes a `.vscode` directory with a `settings.json` file. It uses `ESLint` both as linter and formatter for JS, and it needs this extension to be installed: [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). The code is automatically checked when the file is saved, and also before committing it. The settings also enforce the newline to be `LF` and the tab's size to be `2`.

## Database instance
Any PostgreSQL provider or local instance can be used. I personally used [ElephantSQL's Tiny Turtle plan](https://www.elephantsql.com/plans.html) as it's completely free (no credit card required) and easy to set-up, so it's enough for developing this challenge. However, take into account that the DB will be limited to 20 MB (it was enough for me), and only 5 concurrent connections. 

This could be a bit of a problem when you try to get all the pending or in progress orders. That endpoint is implemented so the all the matching orders are built in parallel using various workers from a pool. If the DB has more than 5 pending or in progress orders, then more than 5 workers will conect to the instance to get the assigned order's items (one worker for each order, not each order item). So, if you use ElephantSQL you should have max 5 pending or in progress orders. Otherwise you will get a `500` error as response from the server.

## AWS SQS Queue
When an order gets updated to `IN_PROGRESS` state, it will be sent to a message queue (read the complete [challenge](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Challenge.pdf)). That queue is implemented with AWS SQS and any AWS instance can be used in the project. You can also use [ElasticMQ](https://github.com/softwaremill/elasticmq), an in-memory message queue with an AWS SQS-compatible interface.

If you use ElasticMQ, you can run it on Docker. There's a `custom.conf` file placed inside the `queue` directory. From there you can launch a terminal and run:
```
docker run -p 9324:9324 -p 9325:9325 -v `pwd`/custom.conf:/opt/elasticmq.conf softwaremill/elasticmq-native
```
It will pull the image if you haven't downloaded it already and lauch it. It will use port `9324` for the queue, having as default queue `dispatch-queue`. You can 
go to http://localhost:9325/ to see the current queue system status.

Developing a client to receive and see the messages wasn't part of the challenge, so how you check out the messages is up to you. However, I included inside `queue/src` an script called `dispatchDisplay.js`. You can run it from the project's root directory:
```
node ./queue/src/dispatchDisplay.js
```
It just connects to the queue, retrieves all the messages, and print them on the console. It uses long-polling, but you could get all the messages on one run, on the next one only some of them, all of them again, and so on. That's due to the queue implementation, not due to the back-end project. You can read more about AWS SQS on its [docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples.html). 

## Documentation
In the `/doc` directory are available:
 - [The complete challenge](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Challenge.pdf)
 - [The ER Model](https://github.com/porziopablo/ponce-challenge/blob/main/doc/ER%20Model.pdf)
 - [The Relational Model and Normalization Process](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Relational%20Model.pdf)
 - [The Tables' Description](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Tables.pdf)
 
 And: [**The API documentation**](https://github.com/porziopablo/ponce-challenge/blob/main/doc/API.md)

