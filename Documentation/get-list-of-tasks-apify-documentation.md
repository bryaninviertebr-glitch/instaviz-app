---
title: Get list of tasks | Apify Documentation
source: https://docs.apify.com/api/v2/actor-tasks-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-tasks-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/TaskCollectionClient#list) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/TaskCollectionClientAsync#list)

# Get list of tasks

Copy for LLM

```
GET https://api.apify.com/v2/actor-tasks
```

Gets the complete list of tasks that a user has created or used.

The response is a list of objects in which each object contains essential
information about a single task.

The endpoint supports pagination using the `limit` and `offset` parameters,
and it does not return more than a 1000 records.

By default, the records are sorted by the `createdAt` field in ascending
order; therefore you can use pagination to incrementally fetch all tasks while new
ones are still being created. To sort the records in descending order, use
the `desc=1` parameter.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-tasks-get\#request)

### Query Parameters

**offset** double

Number of records that should be skipped at the start. The default value is `0`.

**Example:** `10`

**limit** double

Maximum number of records to return. The default value as well as the maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `createdAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-tasks-get\#responses)

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
    "total": 2,
    "offset": 0,
    "limit": 1000,
    "desc": false,
    "count": 2,
    "items": [\
      {\
        "id": "zdc3Pyhyz3m8vjDeM",\
        "userId": "wRsJZtadYvn4mBZmm",\
        "actId": "asADASadYvn4mBZmm",\
        "actName": "my-actor",\
        "name": "my-task",\
        "username": "janedoe",\
        "actUsername": "janedoe",\
        "createdAt": "2018-10-26T07:23:14.855Z",\
        "modifiedAt": "2018-10-26T13:30:49.578Z",\
        "stats": {\
          "totalRuns": 15\
        }\
      },\
      {\
        "id": "aWE3asdas3m8vjDeM",\
        "userId": "wRsJZtadYvn4mBZmm",\
        "actId": "asADASadYvn4mBZmm",\
        "actName": "my-actor",\
        "actUsername": "janedoe",\
        "name": "my-task-2",\
        "username": "janedoe",\
        "createdAt": "2018-10-26T07:23:14.855Z",\
        "modifiedAt": "2018-10-26T13:30:49.578Z",\
        "stats": {\
          "totalRuns": 4\
        }\
      }\
    ]
  }
}
```

**Schema**

- **data** objectrequired







Common pagination fields for list responses.





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









    - **id** stringrequired

      **Example:** `zdc3Pyhyz3m8vjDeM`
    - **userId** stringrequired

      **Example:** `wRsJZtadYvn4mBZmm`
    - **actId** stringrequired

      **Example:** `asADASadYvn4mBZmm`
    - **actName** string \| nullnullable

      **Example:** `my-actor`
    - **name** stringrequired

      **Example:** `my-task`
    - **username** string \| nullnullable

      **Example:** `janedoe`
    - **actUsername** string \| nullnullable

      **Example:** `janedoe`
    - **createdAt** string<date-time>required

      **Example:** `2018-10-26T07:23:14.855Z`
    - **modifiedAt** string<date-time>required

      **Example:** `2018-10-26T13:30:49.578Z`
    - **stats** object





      anyOf





      - TaskStats
      - null

**totalRuns** integer

**Example:** `15`

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
curl -L 'https://api.apify.com/v2/actor-tasks' \
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

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)