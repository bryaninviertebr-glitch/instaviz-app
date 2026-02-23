---
title: Get list of environment variables | Apify Documentation
source: https://docs.apify.com/api/v2/act-version-env-vars-get
---

[Skip to main content](https://docs.apify.com/api/v2/act-version-env-vars-get#__docusaurus_skipToContent_fallback)

API Clients

[![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ActorEnvVarCollectionClientAsync#list)

# Get list of environment variables

Copy for LLM

```
GET https://api.apify.com/v2/acts/:actorId/versions/:versionNumber/env-vars
```

Gets the list of environment variables for a specific version of an Actor.
The response is a JSON object with the list of [EnvVar objects](https://docs.apify.com/api/v2/act-version-env-vars-get#/reference/actors/environment-variable-object), where each contains basic information about a single environment variable.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-version-env-vars-get\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

**versionNumber** stringrequired

Actor version

**Example:** `0.1`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-version-env-vars-get\#responses)

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
    "total": 5,
    "items": [\
      {\
        "name": "MY_ENV_VAR",\
        "value": "my-value",\
        "isSecret": false\
      }\
    ]
  }
}
```

**Schema**

- **data** objectrequired





  - **total** integerrequired

    **Example:** `5`
  - **items** object\[\]required









    - **name** stringrequired

      **Example:** `MY_ENV_VAR`
    - **value** stringrequired

      **Example:** `my-value`
    - **isSecret** boolean \| nullnullable

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
curl -L 'https://api.apify.com/v2/acts/:actorId/versions/:versionNumber/env-vars' \
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

actorId — pathrequired

versionNumber — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)