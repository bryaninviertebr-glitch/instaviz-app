---
title: Get user runs list | Apify Documentation
source: https://docs.apify.com/api/v2/actor-runs-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-runs-get#__docusaurus_skipToContent_fallback)

# Get user runs list

Copy for LLM

```
GET https://api.apify.com/v2/actor-runs
```

Gets a list of all runs for a user. The response is a list of objects, where
each object contains basic information about a single Actor run.

The endpoint supports pagination using the `limit` and `offset` parameters
and it will not return more than 1000 array elements.

By default, the records are sorted by the `startedAt` field in ascending
order. Therefore, you can use pagination to incrementally fetch all records while
new ones are still being created. To sort the records in descending order, use
`desc=1` parameter. You can also filter runs by ```startedAt`` and```status\`\` fields ( [available\\
statuses](https://docs.apify.com/platform/actors/running/runs-and-builds#lifecycle)).

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-runs-get\#request)

### Query Parameters

**offset** double

Number of array elements that should be skipped at the start. The
default value is `0`.

**Example:** `10`

**limit** double

Maximum number of array elements to return. The default value (as well
as the maximum) is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `startedAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

**status** string

Single status or comma-separated list of statuses, see ( [available\\
statuses](https://docs.apify.com/platform/actors/running/runs-and-builds#lifecycle)). Used to filter runs by the specified statuses only.

**Example:** `SUCCEEDED`

**startedAfter** date-time

Filter runs that started after the specified date and time (inclusive).
The value must be a valid ISO 8601 datetime string (UTC).

**Example:** `2025-09-01T00:00:00.000Z`

**startedBefore** date-time

Filter runs that started before the specified date and time (inclusive).
The value must be a valid ISO 8601 datetime string (UTC).

**Example:** `2025-09-17T23:59:59.000Z`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-runs-get\#responses)

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
        "id": "HG7ML7M8z78YcAPEB",\
        "actId": "HDSasDasz78YcAPEB",\
        "actorTaskId": "KJHSKHausidyaJKHs",\
        "status": "SUCCEEDED",\
        "startedAt": "2019-11-30T07:34:24.202Z",\
        "finishedAt": "2019-12-12T09:30:12.202Z",\
        "buildId": "HG7ML7M8z78YcAPEB",\
        "buildNumber": "0.0.2",\
        "meta": {\
          "origin": "WEB"\
        },\
        "usageTotalUsd": 0.2,\
        "defaultKeyValueStoreId": "sfAjeR4QmeJCQzTfe",\
        "defaultDatasetId": "3ZojQDdFTsyE7Moy4",\
        "defaultRequestQueueId": "so93g2shcDzK3pA85"\
      },\
      {\
        "id": "HG7ML7M8z78YcAPEB",\
        "actId": "HDSasDasz78YcAPEB",\
        "actorTaskId": "KJHSKHausidyaJKHs",\
        "status": "FAILED",\
        "startedAt": "2019-12-12T07:34:14.202Z",\
        "finishedAt": "2019-12-13T08:36:13.202Z",\
        "buildId": "u78dML7M8z78YcAPEB",\
        "buildNumber": "0.2.2",\
        "meta": {\
          "origin": "DEVELOPMENT"\
        },\
        "usageTotalUsd": 0.6,\
        "defaultKeyValueStoreId": "sffsouqlseJCQzTfe",\
        "defaultDatasetId": "CFGggdjQDsyE7Moyw",\
        "defaultRequestQueueId": "soowucklrmDzKpA8x"\
      }\
    ]
  }
}
```

**Schema**

**data** objectrequired

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

    **Example:** `HG7ML7M8z78YcAPEB`
  - **actId** stringrequired

    **Example:** `HDSasDasz78YcAPEB`
  - **actorTaskId** string \| nullnullable

    **Example:** `KJHSKHausidyaJKHs`
  - **status** ActorJobStatus (string)required
    Status of an Actor job (run or build).

    **Possible values:** \[`READY`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMING-OUT`, `TIMED-OUT`, `ABORTING`, `ABORTED`\]

  - **startedAt** string<date-time>required

    **Example:** `2019-11-30T07:34:24.202Z`
  - **finishedAt** string<date-time>required

    **Example:** `2019-12-12T09:30:12.202Z`
  - **buildId** stringrequired

    **Example:** `HG7ML7M8z78YcAPEB`
  - **buildNumber** string

    **Example:** `0.0.2`
  - **meta** objectrequired





    - **origin** RunOrigin (string)required
      **Possible values:** \[`DEVELOPMENT`, `WEB`, `API`, `SCHEDULER`, `TEST`, `WEBHOOK`, `ACTOR`, `CLI`, `STANDBY`\]

    - **clientIp** string \| nullnullable
      IP address of the client that started the run.

    - **userAgent** string \| nullnullable
      User agent of the client that started the run.

    - **scheduleId** string \| nullnullable
      ID of the schedule that triggered the run.

    - **scheduledAt** string,null<date-time>nullable
      Time when the run was scheduled.


  - **usageTotalUsd** numberrequired

    **Example:** `0.2`
  - **defaultKeyValueStoreId** stringrequired

    **Example:** `sfAjeR4QmeJCQzTfe`
  - **defaultDatasetId** stringrequired

    **Example:** `3ZojQDdFTsyE7Moy4`
  - **defaultRequestQueueId** stringrequired

    **Example:** `so93g2shcDzK3pA85`

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
curl -L 'https://api.apify.com/v2/actor-runs' \
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

status — query

startedAfter — query

startedBefore — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)