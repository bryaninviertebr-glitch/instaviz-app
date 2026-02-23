---
title: Update schedule | Apify Documentation
source: https://docs.apify.com/api/v2/schedule-put
---

[Skip to main content](https://docs.apify.com/api/v2/schedule-put#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/ScheduleClient#update) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ScheduleClientAsync#update)

# Update schedule

Copy for LLM

```
PUT https://api.apify.com/v2/schedules/:scheduleId
```

Updates a schedule using values specified by a schedule object passed as
JSON in the POST payload. If the object does not define a specific property,
its value will not be updated.

The response is the full schedule object as returned by the
[Get schedule](https://docs.apify.com/api/v2/schedule-put#/reference/schedules/schedule-object/get-schedule) endpoint.

**The request needs to specify the `Content-Type: application/json` HTTP**
**header!**

When providing your API authentication token, we recommend using the
request's `Authorization` header, rather than the URL. ( [More\\
info](https://docs.apify.com/api/v2/schedule-put#/introduction/authentication)).

## Request [Direct link to request](https://docs.apify.com/api/v2/schedule-put\#request)

### Path Parameters

**scheduleId** stringrequired

Schedule ID.

**Example:** `asdLZtadYvn4mBZmm`

- application/json

### Body **required**

- **name** string \| nullnullable

**Example:** `my-schedule`
- **isEnabled** boolean \| nullnullable

**Example:** `true`
- **isExclusive** boolean \| nullnullable

**Example:** `true`
- **cronExpression** string \| nullnullable

**Example:**`* * * * *`
- **timezone** string \| nullnullable

**Example:** `UTC`
- **description** string \| nullnullable

**Example:** `Schedule of actor ...`
- **actions** object\[\]









  - **type** ScheduleActionType (string)required
    Type of action to perform when the schedule triggers.

    **Possible values:** \[`RUN_ACTOR`, `RUN_ACTOR_TASK`\]

  - **actorId** stringrequired

    **Example:** `jF8GGEvbEg4Au3NLA`
  - **runInput** object





    anyOf





    - ScheduleActionsRunInput
    - null

**body** string \| nullnullable

**Example:**`{\n   "foo": "actor"\n}`
**contentType** string \| nullnullable

**Example:** `application/json; charset=utf-8`

  - **runOptions** object





    anyOf





    - ScheduleActionsRunOptions
    - null

**build** string \| nullnullable

**Example:** `latest`
**timeoutSecs** integer \| nullnullable

**Example:** `60`
**memoryMbytes** integer \| nullnullable

**Example:** `1024`
**restartOnError** boolean \| nullnullable

**Example:** `false`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/schedule-put\#responses)

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
    "id": "asdLZtadYvn4mBZmm",
    "userId": "wRsJZtadYvn4mBZmm",
    "name": "my-schedule",
    "cronExpression": "* * * * *",
    "timezone": "UTC",
    "isEnabled": true,
    "isExclusive": true,
    "description": "Schedule of actor ...",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-20T06:33:11.202Z",
    "nextRunAt": "2019-04-12T07:34:10.202Z",
    "lastRunAt": "2019-04-12T07:33:10.202Z",
    "actions": [\
      {\
        "id": "c6KfSgoQzFhMk3etc",\
        "type": "RUN_ACTOR",\
        "actorId": "jF8GGEvbEg4Au3NLA",\
        "runInput": {\
          "body": "{\\n   \"foo\": \"actor\"\\n}",\
          "contentType": "application/json; charset=utf-8"\
        },\
        "runOptions": {\
          "build": "latest",\
          "timeoutSecs": 60,\
          "memoryMbytes": 1024,\
          "restartOnError": false\
        }\
      }\
    ]
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `asdLZtadYvn4mBZmm`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **name** stringrequired

    **Example:** `my-schedule`
  - **cronExpression** stringrequired

    **Example:**`* * * * *`
  - **timezone** stringrequired

    **Example:** `UTC`
  - **isEnabled** booleanrequired

    **Example:** `true`
  - **isExclusive** booleanrequired

    **Example:** `true`
  - **description** string \| nullnullable

    **Example:** `Schedule of actor ...`
  - **createdAt** string<date-time>required

    **Example:** `2019-12-12T07:34:14.202Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2019-12-20T06:33:11.202Z`
  - **nextRunAt** string,null<date-time>nullable

    **Example:** `2019-04-12T07:34:10.202Z`
  - **lastRunAt** string,null<date-time>nullable

    **Example:** `2019-04-12T07:33:10.202Z`
  - **actions** object\[\]required









    - **id** stringrequired

      **Example:** `c6KfSgoQzFhMk3etc`
    - **type** ScheduleActionType (string)required
      Type of action to perform when the schedule triggers.

      **Possible values:** \[`RUN_ACTOR`, `RUN_ACTOR_TASK`\]

    - **actorId** stringrequired

      **Example:** `jF8GGEvbEg4Au3NLA`
    - **runInput** object





      anyOf





      - ScheduleActionsRunInput
      - null

**body** string \| nullnullable

**Example:**`{\n   "foo": "actor"\n}`
**contentType** string \| nullnullable

**Example:** `application/json; charset=utf-8`

    - **runOptions** object





      anyOf





      - ScheduleActionsRunOptions
      - null

**build** string \| nullnullable

**Example:** `latest`
**timeoutSecs** integer \| nullnullable

**Example:** `60`
**memoryMbytes** integer \| nullnullable

**Example:** `1024`
**restartOnError** boolean \| nullnullable

**Example:** `false`

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
curl -L -X PUT 'https://api.apify.com/v2/schedules/:scheduleId' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "name": "my-schedule",
  "isEnabled": true,
  "isExclusive": true,
  "cronExpression": "* * * * *",
  "timezone": "UTC",
  "description": "Schedule of actor ...",
  "actions": "Unknown Type: array,null"
}'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

scheduleId — pathrequired

Body required

```json
{
  "name": "my-schedule",
  "isEnabled": true,
  "isExclusive": true,
  "cronExpression": "* * * * *",
  "timezone": "UTC",
  "description": "Schedule of actor ...",
  "actions": "Unknown Type: array,null"
}
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)