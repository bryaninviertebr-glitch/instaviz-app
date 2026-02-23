---
title: Add requests | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-requests-batch-post
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-requests-batch-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#batchAddRequests) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#batch_add_requests)

# Add requests

Copy for LLM

```
POST https://api.apify.com/v2/request-queues/:queueId/requests/batch
```

Adds requests to the queue in batch. The maximum requests in batch is limit
to 25. The response contains an array of unprocessed and processed requests.
If any add operation fails because the request queue rate limit is exceeded
or an internal failure occurs,
the failed request is returned in the unprocessedRequests response
parameter.
You can resend these requests to add. It is recommended to use exponential
backoff algorithm for these retries.
If a request with the same `uniqueKey` was already present in the queue,
then it returns an ID of the existing request.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-requests-batch-post\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long

**Example:** `client-abc`

**forefront** string

Determines if request should be added to the head of the queue or to the
end. Default value is `false` (end of queue).

**Example:** `false`

- application/json

### Body array **required**

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

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-requests-batch-post\#responses)

- 201
- 400

### Status 201

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "data": {
    "processedRequests": [\
      {\
        "requestId": "YiKoxjkaS9gjGTqhF",\
        "uniqueKey": "http://example.com",\
        "wasAlreadyPresent": true,\
        "wasAlreadyHandled": false\
      }\
    ],
    "unprocessedRequests": [\
      {\
        "uniqueKey": "http://example.com/2",\
        "url": "http://example.com/2",\
        "method": "GET"\
      }\
    ]
  }
}
```

**Schema**

**data** objectrequired

Result of a batch add operation containing successfully processed and failed requests.

- **processedRequests** object\[\]required







Requests that were successfully added to the request queue.









  - **requestId** stringrequired
    A unique identifier assigned to the request.


    **Example:** `sbJ7klsdf7ujN9l`
  - **uniqueKey** stringrequired
    A unique key used for request de-duplication. Requests with the same unique key are considered identical.


    **Example:** `GET|60d83e70|e3b0c442|https://apify.com`
  - **wasAlreadyPresent** booleanrequired
    Indicates whether a request with the same unique key already existed in the request queue. If true, no new request was created.


    **Example:** `false`
  - **wasAlreadyHandled** booleanrequired
    Indicates whether a request with the same unique key has already been processed by the request queue.


    **Example:** `false`

- **unprocessedRequests** object\[\]required







Requests that failed to be added and can be retried.









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
curl -L 'https://api.apify.com/v2/request-queues/:queueId/requests/batch' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '[\
  {\
    "uniqueKey": "http://example.com",\
    "url": "http://example.com",\
    "method": "GET"\
  },\
  {\
    "uniqueKey": "http://example.com/2",\
    "url": "http://example.com/2",\
    "method": "GET"\
  }\
]'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

queueId — pathrequired

Show optional parameters

clientKey — query

forefront — query

Body required

- Example (from schema)
- Example

```json
[\
  {\
    "uniqueKey": "http://example.com",\
    "url": "http://example.com",\
    "method": "GET"\
  },\
  {\
    "uniqueKey": "http://example.com/2",\
    "url": "http://example.com/2",\
    "method": "GET"\
  }\
]
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)