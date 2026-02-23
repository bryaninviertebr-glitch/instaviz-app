---
title: Unlock requests | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-requests-unlock-post
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-requests-unlock-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#unlockRequests) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#unlock_requests)

# Unlock requests

Copy for LLM

```
POST https://api.apify.com/v2/request-queues/:queueId/requests/unlock
```

Unlocks requests in the queue that are currently locked by the client.

- If the client is within an Actor run, it unlocks all requests locked by that specific run plus all requests locked by the same clientKey.
- If the client is outside of an Actor run, it unlocks all requests locked using the same clientKey.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-requests-unlock-post\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long

**Example:** `client-abc`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-requests-unlock-post\#responses)

- 200
- 400

### Status 200

Number of requests that were unlocked

- application/json

- Example
- Schema

```json
{
  "data": {
    "unlockedCount": 10
  }
}
```

**Schema**

- **data** objectrequired







Result of unlocking requests in the request queue.





  - **unlockedCount** integerrequired
    Number of requests that were successfully unlocked.


    **Example:** `10`

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
curl -L -X POST 'https://api.apify.com/v2/request-queues/:queueId/requests/unlock' \
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