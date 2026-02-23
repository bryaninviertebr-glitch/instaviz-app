---
title: Get collection | Apify Documentation
source: https://docs.apify.com/api/v2/webhook-webhook-dispatches-get
---

[Skip to main content](https://docs.apify.com/api/v2/webhook-webhook-dispatches-get#__docusaurus_skipToContent_fallback)

API Clients

[![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/WebhookClientAsync#dispatches)

# Get collection

Copy for LLM

```
GET https://api.apify.com/v2/webhooks/:webhookId/dispatches
```

Gets a given webhook's list of dispatches.

## Request [Direct link to request](https://docs.apify.com/api/v2/webhook-webhook-dispatches-get\#request)

### Path Parameters

**webhookId** stringrequired

ID number of the webhook.

**Example:** `pVJtoTelgYUq4qJOt`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/webhook-webhook-dispatches-get\#responses)

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
        "webhookId": "asdLZtadYvn4mBZmm",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "status": "ACTIVE",\
        "eventType": "ACTOR.BUILD.ABORTED",\
        "eventData": "Unknown Type: object,null",\
        "calls": [\
          {\
            "startedAt": "2019-12-12T07:34:14.202Z",\
            "finishedAt": "2019-12-12T07:34:14.202Z",\
            "errorMessage": "Cannot send request",\
            "responseStatus": 200,\
            "responseBody": "{\"foo\": \"bar\"}"\
          }\
        ]\
      }\
    ]
  }
}
```

**Schema**

- **data** object







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
    - **webhookId** stringrequired

      **Example:** `asdLZtadYvn4mBZmm`
    - **createdAt** string<date-time>required

      **Example:** `2019-12-12T07:34:14.202Z`
    - **status** WebhookDispatchStatus (string)required
      Status of the webhook dispatch indicating whether the HTTP request was successful.

      **Possible values:** \[`ACTIVE`, `SUCCEEDED`, `FAILED`\]

    - **eventType** WebhookEventType (string)required
      Type of event that triggers the webhook.

      **Possible values:** \[`ACTOR.BUILD.ABORTED`, `ACTOR.BUILD.CREATED`, `ACTOR.BUILD.FAILED`, `ACTOR.BUILD.SUCCEEDED`, `ACTOR.BUILD.TIMED_OUT`, `ACTOR.RUN.ABORTED`, `ACTOR.RUN.CREATED`, `ACTOR.RUN.FAILED`, `ACTOR.RUN.RESURRECTED`, `ACTOR.RUN.SUCCEEDED`, `ACTOR.RUN.TIMED_OUT`, `TEST`\]

    - **eventData** eventData (object,null)





      - **actorId** stringrequired

        **Example:** `vvE7iMKuMc5qTHHsR`
      - **actorRunId** stringrequired

        **Example:** `JgwXN9BdwxGcu9MMF`

    - **calls** object\[\]









      - **startedAt** string,null<date-time>nullable

        **Example:** `2019-12-12T07:34:14.202Z`
      - **finishedAt** string,null<date-time>nullable

        **Example:** `2019-12-12T07:34:14.202Z`
      - **errorMessage** string \| nullnullable

        **Example:** `Cannot send request`
      - **responseStatus** integer \| nullnullable

        **Example:** `200`
      - **responseBody** string \| nullnullable

        **Example:**`{"foo": "bar"}`

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
curl -L 'https://api.apify.com/v2/webhooks/:webhookId/dispatches' \
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