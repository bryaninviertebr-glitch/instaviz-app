---
title: Get head and lock | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-head-lock-post
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-head-lock-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#listAndLockHead) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#list_and_lock_head)

# Get head and lock

Copy for LLM

```
POST https://api.apify.com/v2/request-queues/:queueId/head/lock
```

Returns the given number of first requests from the queue and locks them for
the given time.

If this endpoint locks the request, no other client or run will be able to get and
lock these requests.

The response contains the `hadMultipleClients` boolean field which indicates
that the queue was accessed by more than one client (with unique or empty
`clientKey`).

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-head-lock-post\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**lockSecs** doublerequired

How long the requests will be locked for (in seconds).

**Example:** `60`

**limit** double

**Possible values:**`<= 25`

How many items from the queue should be returned.

**Example:** `25`

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long.

**Example:** `client-abc`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-head-lock-post\#responses)

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
    "limit": 3,
    "queueModifiedAt": "2018-03-14T23:00:00.000Z",
    "hadMultipleClients": true,
    "lockSecs": 60,
    "items": [\
      {\
        "id": "8OamqXBCpPHxyj9",\
        "retryCount": 0,\
        "uniqueKey": "http://example.com",\
        "url": "http://example.com",\
        "method": "GET",\
        "lockExpiresAt": "2022-06-14T23:00:00.000Z"\
      },\
      {\
        "id": "8OamqXBCpPHxyx9",\
        "retryCount": 0,\
        "uniqueKey": "http://example.com/a",\
        "url": "http://example.com/a",\
        "method": "GET",\
        "lockExpiresAt": "2022-06-14T23:00:00.000Z"\
      },\
      {\
        "id": "8OamqXBCpPHxy08",\
        "retryCount": 0,\
        "uniqueKey": "http://example.com/a/b",\
        "url": "http://example.com/a/b",\
        "method": "GET",\
        "lockExpiresAt": "2022-06-14T23:00:00.000Z"\
      }\
    ]
  }
}
```

**Schema**

**data** objectrequired

A batch of locked requests from the request queue head.

- **limit** integerrequired
The maximum number of requests returned.


**Example:** `1000`
- **queueModifiedAt** string<date-time>required
The timestamp when the request queue was last modified. Modifications include adding, updating, or removing requests, as well as locking or unlocking requests.


**Example:** `2018-03-14T23:00:00.000Z`
- **queueHasLockedRequests** boolean
Whether the request queue contains requests locked by any client (either the one calling the endpoint or a different one).


**Example:** `true`
- **clientKey** string
The client key used for locking the requests.


**Example:** `client-one`
- **hadMultipleClients** booleanrequired
Whether the request queue has been accessed by multiple different clients.


**Example:** `true`
- **lockSecs** integerrequired
The number of seconds the locks will be held.


**Example:** `60`
- **items** object\[\]required







The array of locked requests from the request queue head.









  - **id** stringrequired
    A unique identifier assigned to the request.


    **Example:** `8OamqXBCpPHxyH9`
  - **uniqueKey** stringrequired
    A unique key used for request de-duplication. Requests with the same unique key are considered identical.


    **Example:** `GET|60d83e70|e3b0c442|https://apify.com`
  - **url** string<uri>required
    The URL of the request.


    **Example:** `https://apify.com`
  - **method** string
    The HTTP method of the request.


    **Example:** `GET`
  - **retryCount** integer
    The number of times this request has been retried.


    **Example:** `0`
  - **lockExpiresAt** string<date-time>required
    The timestamp when the lock on this request expires.


    **Example:** `2022-06-14T23:00:00.000Z`

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
curl -L -X POST 'https://api.apify.com/v2/request-queues/:queueId/head/lock' \
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

lockSecs — queryrequired

Show optional parameters

limit — query

clientKey — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)