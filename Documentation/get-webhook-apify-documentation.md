---
title: Get webhook | Apify Documentation
source: https://docs.apify.com/api/v2/webhook-get
---

[Skip to main content](https://docs.apify.com/api/v2/webhook-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/WebhookClient#get) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/WebhookClientAsync#get)

# Get webhook

Copy for LLM

```
GET https://api.apify.com/v2/webhooks/:webhookId
```

Gets webhook object with all details.

## Request [Direct link to request](https://docs.apify.com/api/v2/webhook-get\#request)

### Path Parameters

**webhookId** stringrequired

Webhook ID.

**Example:** `Zib4xbZsmvZeK55ua`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/webhook-get\#responses)

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
    "id": "YiKoxjkaS9gjGTqhF",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-13T08:36:13.202Z",
    "userId": "wRsJZtadYvn4mBZmm",
    "isAdHoc": false,
    "shouldInterpolateStrings": false,
    "eventTypes": [\
      "ACTOR.RUN.SUCCEEDED"\
    ],
    "condition": {
      "actorId": "hksJZtadYvn4mBuin",
      "actorTaskId": "asdLZtadYvn4mBZmm",
      "actorRunId": "hgdKZtadYvn4mBpoi"
    },
    "ignoreSslErrors": false,
    "doNotRetry": false,
    "requestUrl": "http://example.com/",
    "payloadTemplate": "{\\n \"userId\": {{userId}}...",
    "headersTemplate": "{\\n \"Authorization\": \"Bearer ...\"}",
    "description": "this is webhook description",
    "lastDispatch": {
      "status": "ACTIVE",
      "finishedAt": "2019-12-13T08:36:13.202Z"
    },
    "stats": {
      "totalDispatches": 1
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `YiKoxjkaS9gjGTqhF`
  - **createdAt** string<date-time>required

    **Example:** `2019-12-12T07:34:14.202Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2019-12-13T08:36:13.202Z`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **isAdHoc** boolean \| nullnullable

    **Example:** `false`
  - **shouldInterpolateStrings** boolean \| nullnullable

    **Example:** `false`
  - **eventTypes** WebhookEventType (string)\[\]required
    **Possible values:** \[`ACTOR.BUILD.ABORTED`, `ACTOR.BUILD.CREATED`, `ACTOR.BUILD.FAILED`, `ACTOR.BUILD.SUCCEEDED`, `ACTOR.BUILD.TIMED_OUT`, `ACTOR.RUN.ABORTED`, `ACTOR.RUN.CREATED`, `ACTOR.RUN.FAILED`, `ACTOR.RUN.RESURRECTED`, `ACTOR.RUN.SUCCEEDED`, `ACTOR.RUN.TIMED_OUT`, `TEST`\]


    **Example:**`["ACTOR.RUN.SUCCEEDED"]`
  - **condition** objectrequired





    - **actorId** string \| nullnullable

      **Example:** `hksJZtadYvn4mBuin`
    - **actorTaskId** string \| nullnullable

      **Example:** `asdLZtadYvn4mBZmm`
    - **actorRunId** string \| nullnullable

      **Example:** `hgdKZtadYvn4mBpoi`

  - **ignoreSslErrors** booleanrequired

    **Example:** `false`
  - **doNotRetry** boolean \| nullnullable

    **Example:** `false`
  - **requestUrl** string<uri>required

    **Example:** `http://example.com/`
  - **payloadTemplate** string \| nullnullable

    **Example:**`{\n "userId": {{userId}}...`
  - **headersTemplate** string \| nullnullable

    **Example:**`{\n "Authorization": "Bearer ..."}`
  - **description** string \| nullnullable

    **Example:** `this is webhook description`
  - **lastDispatch** object





    anyOf





    - ExampleWebhookDispatch
    - null

**status** WebhookDispatchStatus (string)required
Status of the webhook dispatch indicating whether the HTTP request was successful.

**Possible values:** \[`ACTIVE`, `SUCCEEDED`, `FAILED`\]

**finishedAt** string<date-time>required

**Example:** `2019-12-13T08:36:13.202Z`

  - **stats** object





    anyOf





    - WebhookStats
    - null

**totalDispatches** integerrequired

**Example:** `1`

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
curl -L 'https://api.apify.com/v2/webhooks/:webhookId' \
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

webhookId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)