---
title: Get schedule log | Apify Documentation
source: https://docs.apify.com/api/v2/schedule-log-get
---

[Skip to main content](https://docs.apify.com/api/v2/schedule-log-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/ScheduleClient#getLog) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ScheduleClientAsync#get_log)

# Get schedule log

Copy for LLM

```
GET https://api.apify.com/v2/schedules/:scheduleId/log
```

Gets the schedule log as a JSON array containing information about up to a
1000 invocations of the schedule.

## Request [Direct link to request](https://docs.apify.com/api/v2/schedule-log-get\#request)

### Path Parameters

**scheduleId** stringrequired

Schedule ID.

**Example:** `asdLZtadYvn4mBZmm`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/schedule-log-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "data": [\
    {\
      "message": "Schedule invoked",\
      "level": "INFO",\
      "createdAt": "2019-03-26T12:28:00.370Z"\
    },\
    {\
      "message": "Cannot start Actor task \\\"iEvfA6pm6DWjRTGxS\\\": Provided input must be object, got \\\"string\\\" instead.",\
      "level": "ERROR",\
      "createdAt": "2019-03-26T12:30:00.325Z"\
    }\
  ]
}
```

**Schema**

- **data** object\[\]required









  - **message** stringrequired

    **Example:** `Schedule invoked`
  - **level** stringrequired

    **Example:** `INFO`
  - **createdAt** string<date-time>required

    **Example:** `2019-03-26T12:28:00.370Z`

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
curl -L 'https://api.apify.com/v2/schedules/:scheduleId/log' \
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

scheduleId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)