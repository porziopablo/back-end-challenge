# API Documentation

## Sections
 - [Authentication](#authentication)
 - [Requests](#requests)
 - [Responses](#responses)
 - [Access Control](#access-control)
 - [Endpoints](#endpoints) 

## Authentication

Every `HTTP` request must include the `Authorization` header, with the following format:
```http
Authorization: Bearer <jwt-token>
```
Since the challenge doesn't require the back-end to manage users in a realistic way, the `JWT` token must be created using the following format and placed in the `.env` file so the server can compare it with one sent in the request and allow/disallow access:

**Header**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
**Payload**
```json
{
  "role": 
}
```
It can be generated using this [template](https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxfQ.ISYwgEAiGvrAIqX-f3wqIvhcsQAtyAD27b__t3keoms).

The role can be any of these:
| Type | Role |
| - | - |
| SHOP_OWNER  | 1  |
| WAREHOUSE_MANAGER  | 2  |

Some endpoints can only be accessed by certain roles, so the token will be processed accordingly. See [Access Control](#access-control).

## Requests

When using `POST`, the requests' bodies will be in `JSON` format. The ones that use `GET` or `PUT` don't need to include anything in their bodies, because the data is sent through the query string. If the client is sending a `JSON` message in the request's body, it should set its `Content-Type` header accordingly:
```http
Content-Type: application/json
```
## Responses

All responses from the server will be sent in `JSON` format, with the following structure:
```json
{ 
  "result": "JSON object",
  "error": "string", 
}
```
The `Content-Type` header will be set to: 
```http
Content-Type: application/json
```
The `result` object depends on the specific endpoint that is answering the request. See [Endpoints](#endpoints).

The response's `Status Code` indicates if it was successful or not:
 - `200`: it was successful and there will be a `result` object.
 - `400`: bad request. The error string will depend on the actual failure.
 - `403` - `404`: there was an access control error or the resource didn't exist. See [Access Control](#access-control).
 - `500`: internal server error.

In all error cases, there will be no `result` object.

## Access control

If the user is not authenticated or the requested resource wasn't found, the `status code` will be set to `404`, with the following response body:
```json
{
  "error": "resource or action not found, or user not authenticated"
}
```
If the user is authenticated but doesn't have the necessary permissions, the status code will be set to `403`, with the following response body: 
```json
{
  "error": "role <user-role> not allowed to access resource or action"
}
```
Some actions/resources are only accessible by certain roles:
 - Create a new order: `SHOP_MANAGER`.
 - Update order status to `IN_PROGRESS`: `WAREHOUSE_OFFICER`.
 - Update order status to `DELIVERED`: `SHOP_MANAGER`.

The rest of endpoints can be accessed by any user that is authenticated.

## Endpoints

**Note**: The URLs use `4000` as the port on which the server is listening, but that can be changed in its `.env` file.

### Return all the products 
 - Request URL: http://localhost:4000/products
 - Request method: `GET`
 - Successful response body: 
```json
{
  "result": [
      {
        "product_id": "integer",
        "name": "string",
        "brand": "string",
        "description": "string",
        "stock": "integer"
      },
      "...",
  ]
}
```
If there are no products, it will return an empty array.

### Return all the products filtered by brand

Same as above, but the request URL is: http://localhost:4000/products?brand=some-brand

### Create an order
 - Request URL: http://localhost:4000/orders/new
 - Request method: `POST`
 - Request body: 
```json
{
  "locationId": "integer",
  "products": [
    { "productId": "integer", "quantity": "integer" },
    "..."
  ]
}
```
**Note**: If an invalid `productId` is sent, that product won't be taken into account but the transaction will continue with the remaining valid items. The same will happen if a negative or equal to zero `quantity` is sent. To know which products were added, check the `products` array in the response, that contains each successfully added `productId`.

 - Successful response body: 
```json
{
  "result": {
    "orderId": "integer",
    "status": "PENDING", // always
    "products": [ "integer", "…" ]
   }
}
```
 - Unsuccessful response body: 
   - If the `locationId` doesn't exist or doesn't belong to an actual Shop (not Warehouse), the `Status Code` will be set to `400` and the body will be:
```json
{
  "error": "locationId <provided locationId> does not exist or belong to a shop"
}
```
  - If all the products requested had invalid `productId` and/or not positive `quantity` the order won't be created. The `Status Code` will be set to `400` and the body will be:
```json
{
  "error": "All products requested had invalid productIds or not positive quantities. Order not created"
}
```

