---
title: Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-requests-post
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-requests-post#__docusaurus_skipToContent_fallback)

# Add request

```
POST /v2/request-queues/:queueId/requests
```

Adds request to the queue. Response contains ID of the request and info if
request was already present in the queue or handled.

If request with same `uniqueKey` was already present in the queue then
returns an ID of existing request.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-requests-post\#request)

### Path Parameters

**queueId** stringrequired

Queue ID or `username~queue-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**clientKey** string

A unique identifier of the client accessing the request queue. It must
be a string between 1 and 32 characters long. This identifier is used to
determine whether the queue was accessed by multiple clients. If
`clientKey` is not provided,
the system considers this API call to come from a new client. For
details, see the `hadMultipleClients` field returned by the [Get\\
head](https://docs.apify.com/api/v2/request-queue-requests-post#/reference/request-queues/queue-head) operation.

**Example:** `client-abc`

**forefront** string

Determines if request should be added to the head of the queue or to the
end. Default value is `false` (end of queue).

**Example:** `false`

### Body **required**

**id** string
A unique identifier assigned to the request.

**Example:** `sbJ7klsdf7ujN9l`
**uniqueKey** stringrequired
A unique key used for request de-duplication. Requests with the same unique key are considered identical.

**Example:** `GET|60d83e70|e3b0c442|https://apify.com`
**url** string<uri>required
The URL of the request.

**Example:** `https://apify.com`
**method** stringrequired
The HTTP method of the request.

**Example:** `GET`

### Status 201

**Response Headers**

```json
{
  "data": {
    "requestId": "YiKoxjkaS9gjGTqhF",
    "wasAlreadyPresent": true,
    "wasAlreadyHandled": false
  }
}
```

**Schema**

**data** objectrequired

Result of registering a request in the request queue, either by adding a new request or updating an existing one.

- **requestId** stringrequired
A unique identifier assigned to the request.


**Example:** `YiKoxjkaS9gjGTqhF`
- **wasAlreadyPresent** booleanrequired
Indicates whether a request with the same unique key already existed in the request queue. If true, no new request was created.


**Example:** `false`
- **wasAlreadyHandled** booleanrequired
Indicates whether a request with the same unique key has already been processed by the request queue.


**Example:** `false`

### Status 400

Bad request - invalid input parameters or request body.

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

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)