---
title: Get list of schedules | Apify Documentation
source: https://docs.apify.com/api/v2/schedules-get
---

[Skip to main content](https://docs.apify.com/api/v2/schedules-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/ScheduleCollectionClient#list) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ScheduleCollectionClientAsync#list)

# Get list of schedules

Copy for LLM

```
GET https://api.apify.com/v2/schedules
```

Gets the list of schedules that the user created.

The endpoint supports pagination using the `limit` and `offset` parameters.
It will not return more than 1000 records.

By default, the records are sorted by the `createdAt` field in ascending
order. To sort the records in descending order, use the `desc=1` parameter.

## Request [Direct link to request](https://docs.apify.com/api/v2/schedules-get\#request)

### Query Parameters

**offset** double

Number of records that should be skipped at the start. The default value is `0`.

**Example:** `10`

**limit** double

Maximum number of records to return. The default value, as well as the maximum, is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1`, the objects are sorted by the `createdAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/schedules-get\#responses)

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
        "id": "asdLZtadYvn4mBZmm",\
        "userId": "wRsJZtadYvn4mBZmm",\
        "name": "my-schedule",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-20T06:33:11.202Z",\
        "lastRunAt": "2019-04-12T07:33:10.202Z",\
        "nextRunAt": "2019-04-12T07:34:10.202Z",\
        "isEnabled": true,\
        "isExclusive": true,\
        "cronExpression": "* * * * *",\
        "timezone": "UTC",\
        "actions": [\
          {\
            "id": "ZReCs7hkdieq8ZUki",\
            "type": "RUN_ACTOR",\
            "actorId": "HKhKmiCMrDgu9eXeE"\
          }\
        ]\
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

      **Example:** `asdLZtadYvn4mBZmm`
    - **userId** stringrequired

      **Example:** `wRsJZtadYvn4mBZmm`
    - **name** stringrequired

      **Example:** `my-schedule`
    - **createdAt** string<date-time>required

      **Example:** `2019-12-12T07:34:14.202Z`
    - **modifiedAt** string<date-time>required

      **Example:** `2019-12-20T06:33:11.202Z`
    - **lastRunAt** string,null<date-time>nullable

      **Example:** `2019-04-12T07:33:10.202Z`
    - **nextRunAt** string,null<date-time>nullable

      **Example:** `2019-04-12T07:34:10.202Z`
    - **isEnabled** booleanrequired

      **Example:** `true`
    - **isExclusive** booleanrequired

      **Example:** `true`
    - **cronExpression** stringrequired

      **Example:**`* * * * *`
    - **timezone** stringrequired

      **Example:** `UTC`
    - **actions** object\[\]required









      - **id** stringrequired

        **Example:** `ZReCs7hkdieq8ZUki`
      - **type** ScheduleActionType (string)required
        Type of action to perform when the schedule triggers.

        **Possible values:** \[`RUN_ACTOR`, `RUN_ACTOR_TASK`\]

      - **actorId** stringrequired

        **Example:** `HKhKmiCMrDgu9eXeE`

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
curl -L 'https://api.apify.com/v2/schedules' \
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