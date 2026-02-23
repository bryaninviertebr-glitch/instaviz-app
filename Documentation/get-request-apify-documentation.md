---
title: Get request | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-request-get
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-request-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#get) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#get)

# Get request

Copy for LLM

```
GET https://api.apify.com/v2/request-queues/:queueId/requests/:requestId
```

Returns request from queue.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-request-get\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**requestId** stringrequired

Request ID.

**Example:** `xpsmkDlspokDSmklS`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-request-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "data": {
    "id": "dnjkDMKLmdlkmlkmld",
    "retryCount": 0,
    "uniqueKey": "http://example.com",
    "url": "http://example.com",
    "method": "GET",
    "loadedUrl": "http://example.com/example-1",
    "payload": null,
    "noRetry": false,
    "errorMessages": null,
    "headers": null,
    "userData": {
      "label": "DETAIL",
      "image": "https://picserver1.eu"
    },
    "handledAt": "2019-06-16T10:23:31.607Z"
  }
}
```

**Schema**

**data** objectrequired

A request stored in the request queue, including its metadata and processing state.

- **id** stringrequired
A unique identifier assigned to the request.


**Example:** `dnjkDMKLmdlkmlkmld`
- **uniqueKey** stringrequired
A unique key used for request de-duplication. Requests with the same unique key are considered identical.


**Example:** `GET|60d83e70|e3b0c442|https://apify.com/career`
- **url** string<uri>required
The URL of the request.


**Example:** `https://apify.com/career`
- **method** string
The HTTP method of the request.


**Example:** `GET`
- **retryCount** integer
The number of times this request has been retried.


**Example:** `0`
- **loadedUrl** string,null<uri>nullable
The final URL that was loaded, after redirects (if any).


**Example:** `https://apify.com/jobs`
- **payload** object \| nullnullable
The request payload, typically used with POST or PUT requests.

- **headers** object \| nullnullable
HTTP headers sent with the request.

- **userData** object







Custom user data attached to the request. Can contain arbitrary fields.





  - **label** string \| nullnullable
    Optional label for categorizing the request.


    **Example:** `DETAIL`
  - **image** string,null<uri>nullable
    Optional image URL associated with the request.


    **Example:** `https://picserver1.eu`
  - **property name\*** any
    Custom user data attached to the request. Can contain arbitrary fields.


- **noRetry** boolean \| nullnullable
Indicates whether the request should not be retried if processing fails.


**Example:** `false`
- **errorMessages** string\[\]nullable
Error messages recorded from failed processing attempts.

- **handledAt** string,null<date-time>nullable
The timestamp when the request was marked as handled, if applicable.


**Example:** `2019-06-16T10:23:31.607Z`

### Status 400

Bad request - invalid input parameters or request body.

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "invalid-input",
    "message": "Invalid input: The request body contains invalid data."
  }
}
```

**Schema**

- **error** objectrequired





  - **type** stringrequired

    **Example:** `run-failed`
  - **message** stringrequired

    **Example:** `Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)`

#### Authorization: http

```
name: httpBearertype: httpscheme: bearerdescription: Bearer token provided in the `Authorization` header (e.g., `Authorization: Bearer your_token`—recommended). [More info](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization).

Use your API token to authenticate requests. You can find it on the [Integrations page](https://console.apify.com/account#/integrations) in Apify Console. This method is more secure than query parameters, as headers are not logged in browser history or server logs.

:::danger Security

Do not share your API token (or account password) with untrusted parties.

:::

_When is authentication required?_
- _Required_ for private Actors, tasks, or resources (e.g., builds of private Actors).
- _Required_ when using named formats for IDs (e.g., `username~store-name` for stores or `username~queue-name` for queues).
- _Optional_ for public Actors or resources (e.g., builds of public Actors can be queried without a token).

For more information, see our [integrations documentation](https://docs.apify.com/platform/integrations).
```

- CLI
- JavaScript
- Python
- PHP
- Java
- C
- C#
- Go
- Rust
- Node.js
- Ruby
- PowerShell
- Dart
- Objective-C
- OCaml
- R
- Swift
- Kotlin

- CURL

```bash
curl -L 'https://api.apify.com/v2/request-queues/:queueId/requests/:requestId' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

queueId — pathrequired

requestId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)