---
title: Prolong request lock | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-request-lock-put
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-request-lock-put#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#prolongRequestLock) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#prolong_request_lock)

# Prolong request lock

Copy for LLM

```
PUT https://api.apify.com/v2/request-queues/:queueId/requests/:requestId/lock
```

Prolongs request lock. The request lock can be prolonged only by the client
that has locked it using [Get and lock head\\
operation](https://docs.apify.com/api/v2/request-queue-request-lock-put#/reference/request-queues/queue-head-with-locks).

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-request-lock-put\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**requestId** stringrequired

Request ID.

**Example:** `xpsmkDlspokDSmklS`

### Query Parameters

**lockSecs** doublerequired

For how long second request will be locked.

**Example:** `60`

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long. This identifier is used to for locking
and unlocking requests. You can delete or prolong lock only for requests that were locked by by same
client key or from the same Actor run.

**Example:** `client-abc`

**forefront** string

Determines if request should be added to the head of the queue or to the
end after lock expires.

**Example:** `false`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-request-lock-put\#responses)

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
    "lockExpiresAt": "2022-01-01T00:00:00.000Z"
  }
}
```

**Schema**

**data** objectrequired

Information about a request lock.

- **lockExpiresAt** string<date-time>required
The timestamp when the lock expires.


**Example:** `2022-01-01T00:00:00.000Z`

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
curl -L -X PUT 'https://api.apify.com/v2/request-queues/:queueId/requests/:requestId/lock' \
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

lockSecs — queryrequired

Show optional parameters

clientKey — query

forefront — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)