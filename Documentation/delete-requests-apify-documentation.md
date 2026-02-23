---
title: Delete requests | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-requests-batch-delete
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-requests-batch-delete#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#batchDeleteRequests) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#batch_delete_requests)

# Delete requests

Copy for LLM

```
DELETE https://api.apify.com/v2/request-queues/:queueId/requests/batch
```

Batch-deletes given requests from the queue. The number of requests in a
batch is limited to 25. The response contains an array of unprocessed and
processed requests.
If any delete operation fails because the request queue rate limit is
exceeded or an internal failure occurs,
the failed request is returned in the `unprocessedRequests` response
parameter.
You can re-send these delete requests. It is recommended to use an
exponential backoff algorithm for these retries.
Each request is identified by its ID or uniqueKey parameter. You can use
either of them to identify the request.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-requests-batch-delete\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long

**Example:** `client-abc`

### Header Parameters

**Content-Type** stringrequired

**Possible values:** \[`application/json`\]

**Example:** `application/json`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-requests-batch-delete\#responses)

- 204
- 400

### Status 204

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "data": {
    "processedRequests": [\
      {\
        "uniqueKey": "http://example.com"\
      }\
    ],
    "unprocessedRequests": [\
      {\
        "uniqueKey": "http://example.com/2",\
        "id": "sbJ7klsdf7ujN9l",\
        "url": "http://example.com/2",\
        "method": "GET"\
      }\
    ]
  }
}
```

**Schema**

**data** objectrequired

Result of a batch delete operation containing successfully deleted and failed requests.

- **processedRequests** object\[\]required







Requests that were successfully deleted from the request queue.









  - **uniqueKey** stringrequired
    A unique key used for request de-duplication. Requests with the same unique key are considered identical.


    **Example:** `GET|60d83e70|e3b0c442|https://apify.com`
  - **id** string
    A unique identifier assigned to the request.


    **Example:** `sbJ7klsdf7ujN9l`

- **unprocessedRequests** object\[\]required







Requests that failed to be deleted and can be retried.









  - **id** string
    A unique identifier assigned to the request.


    **Example:** `sbJ7klsdf7ujN9l`
  - **uniqueKey** stringrequired
    A unique key used for request de-duplication. Requests with the same unique key are considered identical.


    **Example:** `GET|60d83e70|e3b0c442|https://apify.com`
  - **url** string<uri>required
    The URL of the request.


    **Example:** `https://apify.com`
  - **method** stringrequired
    The HTTP method of the request.


    **Example:** `GET`

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
curl -L -X DELETE 'https://api.apify.com/v2/request-queues/:queueId/requests/batch' \
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

Content-Type — headerrequired

\-\-\-application/json

Show optional parameters

clientKey — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)