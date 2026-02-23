---
title: Get task | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/TaskClient#get) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/TaskClientAsync#get)

# Get task

Copy for LLM

```
GET https://api.apify.com/v2/actor-tasks/:actorTaskId
```

Get an object that contains all the details about a task.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-get\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-task-get\#responses)

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
    "id": "zdc3Pyhyz3m8vjDeM",
    "userId": "wRsJZtadYvn4mBZmm",
    "actId": "asADASadYvn4mBZmm",
    "name": "my-task",
    "username": "janedoe",
    "createdAt": "2018-10-26T07:23:14.855Z",
    "modifiedAt": "2018-10-26T13:30:49.578Z",
    "removedAt": null,
    "stats": {
      "totalRuns": 15
    },
    "options": {
      "build": "latest",
      "timeoutSecs": 300,
      "memoryMbytes": 128
    },
    "input": {
      "hello": "world"
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `zdc3Pyhyz3m8vjDeM`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **actId** stringrequired

    **Example:** `asADASadYvn4mBZmm`
  - **name** stringrequired

    **Example:** `my-task`
  - **username** string \| nullnullable

    **Example:** `janedoe`
  - **createdAt** string<date-time>required

    **Example:** `2018-10-26T07:23:14.855Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2018-10-26T13:30:49.578Z`
  - **removedAt** string,null<date-time>nullable
  - **stats** object





    anyOf





    - TaskStats
    - null

**totalRuns** integer

**Example:** `15`

  - **options** object





    anyOf





    - TaskOptions
    - null

**build** string \| nullnullable

**Example:** `latest`
**timeoutSecs** integer \| nullnullable

**Example:** `300`
**memoryMbytes** integer \| nullnullable

**Example:** `128`
**restartOnError** boolean \| nullnullable

**Example:** `false`

  - **input** object





    anyOf





    - TaskInput
    - null

object
The input configuration for the Actor task. This is a user-defined JSON object
that will be passed to the Actor when the task is run.

**Example:**`{"startUrls":[{"url":"https://example.com"}],"maxRequestsPerCrawl":100}`

  - **standbyUrl** string,null<uri>nullable

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
curl -L 'https://api.apify.com/v2/actor-tasks/:actorTaskId' \
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

actorTaskId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)