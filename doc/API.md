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
The `result` object depends on the specific endpoint that is answering the request (see [Endpoints](#endpoints).

The response's `Status Code` indicates if it was successful or not:
 - `200`: it was successful and there will be a `result` object.
 - `400`: bad request. The error string will depend on the actual failure.
 - `403` - `404`: there was an access control error or the resource didn't exist. See [Access Control](#access-control).
 - `500`: internal server error.

## Access control

## Endpoints
