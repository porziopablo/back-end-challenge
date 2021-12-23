# ponce-challenge
RESTful API that would allow an application to create shipping orders for products from the Warehouse to a Shop.

## Tech stack
 - Express
 - Javascript
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
4 - Create the tables and seed them by running:
```
npm run seed
```
5 - Run the project in development environment:
```
npm run dev
```
## Code format
The project includes a `.vscode` directory with a `settings.json` file. It uses `ESLint` both as linter and formatter for JS, and it needs this extension to be installed: [ESLint for VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). The code is automatically checked when the file is saved, and also before committing it. The settings also enforce the newline to be `LF` and the tab's size to be `2`.
