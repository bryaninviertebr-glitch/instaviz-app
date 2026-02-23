---
title: List requests | Apify Documentation
source: https://docs.apify.com/api/v2/request-queue-requests-get
---

[Skip to main content](https://docs.apify.com/api/v2/request-queue-requests-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueClient#paginateRequests) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueClientAsync#list_requests)

# List requests

Copy for LLM

```
GET https://api.apify.com/v2/request-queues/:queueId/requests
```

Returns a list of requests. This endpoint is paginated using
exclusiveStartId and limit parameters.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queue-requests-get\#request)

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
head](https://docs.apify.com/api/v2/request-queue-requests-get#/reference/request-queues/queue-head) operation.

**Example:** `client-abc`

**exclusiveStartId** string

All requests up to this one (including) are skipped from the result.

**Example:** `Ihnsp8YrvJ8102Kj`

**limit** double

Number of keys to be returned. Maximum value is `10000`.

**Example:** `100`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queue-requests-get\#responses)

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
    "items": [\
      {\
        "id": "dnjkDMKLmdlkmlkmld",\
        "retryCount": 0,\
        "uniqueKey": "http://example.com",\
        "url": "http://example.com",\
        "method": "GET",\
        "loadedUrl": "http://example.com/example-1",\
        "payload": null,\
        "noRetry": false,\
        "errorMessages": null,\
        "headers": null,\
        "userData": {\
          "label": "DETAIL",\
          "image": "https://picserver1.eu"\
        },\
        "handledAt": "2019-06-16T10:23:31.607Z"\
      },\
      {\
        "id": "dnjkDMKLmdlkmlkmld",\
        "retryCount": 0,\
        "uniqueKey": "http://example.com",\
        "url": "http://example.com",\
        "method": "GET",\
        "loadedUrl": "http://example.com/example-1",\
        "payload": null,\
        "noRetry": false,\
        "errorMessages": null,\
        "headers": null,\
        "userData": {\
          "label": "DETAIL",\
          "image": "https://picserver1.eu"\
        },\
        "handledAt": "2019-06-16T10:23:31.607Z"\
      }\
    ],
    "count": 2,
    "limit": 2,
    "exclusiveStartId": "Ihnsp8YrvJ8102Kj"
  }
}
```

**Schema**

**data** objectrequired

A paginated list of requests from the request queue.

- **items** object\[\]required







The array of requests.









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

- **count** integer
The total number of requests matching the query.


**Example:** `2`
- **limit** integerrequired
The maximum number of requests returned in this response.


**Example:** `2`
- **exclusiveStartId** string
The ID of the last request from the previous page, used for pagination.


**Example:** `Ihnsp8YrvJ8102Kj`

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
curl -L 'https://api.apify.com/v2/request-queues/:queueId/requests' \
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

exclusiveStartId — query

limit — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)