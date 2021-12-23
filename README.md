# ponce-challenge
RESTful API that would allow an application to create shipping orders for products from the Warehouse to a Shop. [Read the complete challenge](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Challenge.pdf).

## Tech stack
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
```
DB_URL = your-postgres-db-url
MOCKED_JWT_TOKEN = your-jwt-token-with-role # see API doc
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

## Documentation
In the `/doc` directory are available:
 - [The complete challenge](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Challenge.pdf)
 - [The ER Model](https://github.com/porziopablo/ponce-challenge/blob/main/doc/ER%20Model.pdf)
 - [The Relational Model and Normalization Process](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Relational%20Model.pdf)
 - [The Tables' Description](https://github.com/porziopablo/ponce-challenge/blob/main/doc/Tables.pdf)
 
 And: [**The API documentation**](https://github.com/porziopablo/ponce-challenge/blob/main/doc/API.md)

