---
title: Get list of request queues | Apify Documentation
source: https://docs.apify.com/api/v2/request-queues-get
---

[Skip to main content](https://docs.apify.com/api/v2/request-queues-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueCollectionClient#list) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueCollectionClientAsync#list)

# Get list of request queues

Copy for LLM

```
GET https://api.apify.com/v2/request-queues
```

Lists all of a user's request queues. The response is a JSON array of
objects, where each object
contains basic information about one queue.

By default, the objects are sorted by the `createdAt` field in ascending order,
therefore you can use pagination to incrementally fetch all queues while new
ones are still being created. To sort them in descending order, use `desc=1`
parameter. The endpoint supports pagination using `limit` and `offset`
parameters and it will not return more than 1000
array elements.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queues-get\#request)

### Query Parameters

**offset** double

Number of array elements that should be skipped at the start. The
default value is `0`.

**Example:** `10`

**limit** double

Maximum number of array elements to return. The default value as well as
the maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `startedAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

**unnamed** boolean

If `true` or `1` then all the queues are returned. By default only named
queues are returned.

**Example:** `true`

**ownership** StorageOwnership

**Possible values:** \[`ownedByMe`, `sharedWithMe`\]

Filter by ownership. If this parameter is omitted, all accessible request queues are returned.

- `ownedByMe`: Return only request queues owned by the user.
- `sharedWithMe`: Return only request queues shared with the user by other users.

**Example:** `ownedByMe`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queues-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- application/json

- Example (auto)
- Schema

```json
{
  "data": {
    "total": 2,
    "offset": 0,
    "limit": 1000,
    "desc": false,
    "count": 2,
    "items": [\
      {\
        "id": "WkzbQMuFYuamGv3YF",\
        "name": "some-name",\
        "userId": "wRsJZtadYvn4mBZmm",\
        "username": "janedoe",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-13T08:36:13.202Z",\
        "accessedAt": "2019-12-14T08:36:13.202Z",\
        "expireAt": "2019-06-02T17:15:06.751Z",\
        "totalRequestCount": 100,\
        "handledRequestCount": 50,\
        "pendingRequestCount": 50,\
        "actId": "string",\
        "actRunId": "string",\
        "hadMultipleClients": true\
      }\
    ]
  }
}
```

**Schema**

- **data** objectrequired







A paginated list of request queues.





  - **total** integerrequired
    The total number of items available across all pages.

    **Possible values:**`>= 0`


    **Example:** `2`
  - **offset** integerrequired
    The starting position for this page of results.

    **Possible values:**`>= 0`


    **Example:** `0`
  - **limit** integerrequired
    The maximum number of items returned per page.

    **Possible values:**`>= 1`


    **Example:** `1000`
  - **desc** booleanrequired
    Whether the results are sorted in descending order.


    **Example:** `false`
  - **count** integerrequired
    The number of items returned in this response.

    **Possible values:**`>= 0`


    **Example:** `2`
  - **items** object\[\]required







    The array of request queues.









    - **id** stringrequired
      A unique identifier assigned to the request queue.


      **Example:** `WkzbQMuFYuamGv3YF`
    - **name** stringrequired
      The name of the request queue.


      **Example:** `some-name`
    - **userId** stringrequired
      The ID of the user who owns the request queue.


      **Example:** `wRsJZtadYvn4mBZmm`
    - **username** stringrequired
      The username of the user who owns the request queue.


      **Example:** `janedoe`
    - **createdAt** string<date-time>required
      The timestamp when the request queue was created.


      **Example:** `2019-12-12T07:34:14.202Z`
    - **modifiedAt** string<date-time>required
      The timestamp when the request queue was last modified.


      **Example:** `2019-12-13T08:36:13.202Z`
    - **accessedAt** string<date-time>required
      The timestamp when the request queue was last accessed.


      **Example:** `2019-12-14T08:36:13.202Z`
    - **expireAt** string<date-time>
      The timestamp when the request queue will expire and be deleted.


      **Example:** `2019-06-02T17:15:06.751Z`
    - **totalRequestCount** integerrequired
      The total number of requests in the request queue.


      **Example:** `100`
    - **handledRequestCount** integerrequired
      The number of requests that have been handled.


      **Example:** `50`
    - **pendingRequestCount** integerrequired
      The number of requests that are pending and have not been handled yet.


      **Example:** `50`
    - **actId** string \| nullnullable
      The ID of the Actor that created this request queue.

    - **actRunId** string \| nullnullable
      The ID of the Actor run that created this request queue.

    - **hadMultipleClients** booleanrequired
      Whether the request queue has been accessed by multiple different clients.


      **Example:** `true`

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
curl -L 'https://api.apify.com/v2/request-queues' \
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

Show optional parameters

offset — query

limit — query

desc — query

\-\-\-truefalse

unnamed — query

\-\-\-truefalse

ownership — query

\-\-\-ownedByMesharedWithMe

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)