---
title: Create request queue | Apify Documentation
source: https://docs.apify.com/api/v2/request-queues-post
---

[Skip to main content](https://docs.apify.com/api/v2/request-queues-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RequestQueueCollectionClient#getOrCreate) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RequestQueueCollectionClientAsync#get_or_create)

# Create request queue

Copy for LLM

```
POST https://api.apify.com/v2/request-queues
```

Creates a request queue and returns its object.
Keep in mind that requests stored under unnamed queue follows [data\\
retention period](https://docs.apify.com/platform/storage#data-retention).

It creates a queue of given name if the parameter name is used. If a queue
with the given name already exists then the endpoint returns
its object.

## Request [Direct link to request](https://docs.apify.com/api/v2/request-queues-post\#request)

### Query Parameters

**name** string

Custom unique name to easily identify the queue in the future.

**Example:** `example-com`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/request-queues-post\#responses)

- 201
- 400

### Status 201

**Response Headers**

- **Location**

- application/json

- Example
- Schema

```json
{
  "data": {
    "id": "WkzbQMuFYuamGv3YF",
    "name": "some-name",
    "userId": "wRsJZtadYvn4mBZmm",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-13T08:36:13.202Z",
    "accessedAt": "2019-12-14T08:36:13.202Z",
    "totalRequestCount": 870,
    "handledRequestCount": 100,
    "pendingRequestCount": 670,
    "hadMultipleClients": true,
    "consoleUrl": "https://console.apify.com/storage/request-queues/WkzbQMuFYuamGv3YF"
  }
}
```

**Schema**

**data** objectrequired

A request queue object containing metadata and statistics.

- **id** stringrequired
A unique identifier assigned to the request queue.


**Example:** `WkzbQMuFYuamGv3YF`
- **name** string
The name of the request queue.


**Example:** `some-name`
- **userId** stringrequired
The ID of the user who owns the request queue.


**Example:** `wRsJZtadYvn4mBZmm`
- **createdAt** string<date-time>required
The timestamp when the request queue was created.


**Example:** `2019-12-12T07:34:14.202Z`
- **modifiedAt** string<date-time>required
The timestamp when the request queue was last modified. Modifications include adding, updating, or removing requests, as well as locking or unlocking requests in the request queue.


**Example:** `2030-12-13T08:36:13.202Z`
- **accessedAt** string<date-time>required
The timestamp when the request queue was last accessed.


**Example:** `2019-12-14T08:36:13.202Z`
- **totalRequestCount** integerrequired
The total number of requests in the request queue.

**Possible values:**`>= 0`


**Example:** `870`
- **handledRequestCount** integerrequired
The number of requests that have been handled.

**Possible values:**`>= 0`


**Example:** `100`
- **pendingRequestCount** integerrequired
The number of requests that are pending and have not been handled yet.

**Possible values:**`>= 0`


**Example:** `670`
- **hadMultipleClients** booleanrequired
Whether the request queue has been accessed by multiple different clients.


**Example:** `true`
- **consoleUrl** string<uri>required
The URL to view the request queue in the Apify console.


**Example:** `https://api.apify.com/v2/request-queues/27TmTznX9YPeAYhkC`
- **stats** object







Statistics about request queue operations and storage.





  - **deleteCount** integer
    The number of delete operations performed on the request queue.


    **Example:** `0`
  - **headItemReadCount** integer
    The number of times requests from the head were read.


    **Example:** `5`
  - **readCount** integer
    The total number of read operations performed on the request queue.


    **Example:** `100`
  - **storageBytes** integer
    The total storage size in bytes used by the request queue.


    **Example:** `1024`
  - **writeCount** integer
    The total number of write operations performed on the request queue.


    **Example:** `10`

- **generalAccess** GeneralAccess (string)
Defines the general access level for the resource.

**Possible values:** \[`ANYONE_WITH_ID_CAN_READ`, `ANYONE_WITH_NAME_CAN_READ`, `FOLLOW_USER_SETTING`, `RESTRICTED`\]


**Example:** `RESTRICTED`

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
curl -L -X POST 'https://api.apify.com/v2/request-queues' \
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

name — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)