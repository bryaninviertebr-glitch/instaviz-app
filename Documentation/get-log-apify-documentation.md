---
title: Get log | Apify Documentation
source: https://docs.apify.com/api/v2/log-get
---

[Skip to main content](https://docs.apify.com/api/v2/log-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/LogClient#stream) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/LogClientAsync#stream)

# Get log

Copy for LLM

```
GET https://api.apify.com/v2/logs/:buildOrRunId
```

Retrieves logs for a specific Actor build or run.

## Request [Direct link to request](https://docs.apify.com/api/v2/log-get\#request)

### Path Parameters

**buildOrRunId** stringrequired

ID of the Actor build or run.

**Example:** `HG7ML7M8z78YcAPEB`

### Query Parameters

**stream** booleanrequired

If `true` or `1` then the logs will be streamed as long as the run or
build is running.

**Example:** `false`

**download** booleanrequired

If `true` or `1` then the web browser will download the log file rather
than open it in a tab.

**Example:** `false`

**raw** boolean

If `true` or `1`, the logs will be kept verbatim. By default, the API removes
ANSI escape codes from the logs, keeping only printable characters.

**Example:** `false`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/log-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- text/plain

- Example
- Schema

```shell
2017-07-14T06:00:49.733Z Application started.
2017-07-14T06:00:49.741Z Input: { test: 123 }
2017-07-14T06:00:49.752Z Some useful debug information follows.
```

**Schema**

- **string** string

**Example:** `2017-07-14T06:00:49.733Z Application started.
2017-07-14T06:00:49.741Z Input: { test: 123 }
2017-07-14T06:00:49.752Z Some useful debug information follows.
`

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
curl -L 'https://api.apify.com/v2/logs/:buildOrRunId' \
-H 'Accept: text/plain' \
-H 'Authorization: Bearer <token>'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

buildOrRunId — pathrequired

stream — queryrequired

\-\-\-truefalse

download — queryrequired

\-\-\-truefalse

Show optional parameters

raw — query

\-\-\-truefalse

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)