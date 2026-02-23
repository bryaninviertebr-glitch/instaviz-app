---
title: Get limits | Apify Documentation
source: https://docs.apify.com/api/v2/users-me-limits-get
---

[Skip to main content](https://docs.apify.com/api/v2/users-me-limits-get#__docusaurus_skipToContent_fallback)

# Get limits

Copy for LLM

```
GET https://api.apify.com/v2/users/me/limits
```

Returns a complete summary of your account's limits. It is the same
information you will see on your account's [Limits page](https://console.apify.com/billing#/limits). The returned data
includes the current usage cycle, a summary of your limits, and your current usage.

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/users-me-limits-get\#responses)

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
    "monthlyUsageCycle": {
      "startAt": "2022-10-02T00:00:00.000Z",
      "endAt": "2022-11-01T23:59:59.999Z"
    },
    "limits": {
      "maxMonthlyUsageUsd": 300,
      "maxMonthlyActorComputeUnits": 1000,
      "maxMonthlyExternalDataTransferGbytes": 7,
      "maxMonthlyProxySerps": 50,
      "maxMonthlyResidentialProxyGbytes": 0.5,
      "maxActorMemoryGbytes": 16,
      "maxActorCount": 100,
      "maxActorTaskCount": 1000,
      "maxConcurrentActorJobs": 256,
      "maxTeamAccountSeatCount": 9,
      "dataRetentionDays": 90
    },
    "current": {
      "monthlyUsageUsd": 43,
      "monthlyActorComputeUnits": 500.784475,
      "monthlyExternalDataTransferGbytes": 3.00861903931946,
      "monthlyProxySerps": 34,
      "monthlyResidentialProxyGbytes": 0.4,
      "actorMemoryGbytes": 8,
      "actorCount": 31,
      "actorTaskCount": 130,
      "activeActorJobCount": 0,
      "teamAccountSeatCount": 5
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **monthlyUsageCycle** objectrequired





    - **startAt** string<date-time>required

      **Example:** `2022-10-02T00:00:00.000Z`
    - **endAt** string<date-time>required

      **Example:** `2022-11-01T23:59:59.999Z`

  - **limits** objectrequired





    - **maxMonthlyUsageUsd** numberrequired

      **Example:** `300`
    - **maxMonthlyActorComputeUnits** numberrequired

      **Example:** `1000`
    - **maxMonthlyExternalDataTransferGbytes** numberrequired

      **Example:** `7`
    - **maxMonthlyProxySerps** integerrequired

      **Example:** `50`
    - **maxMonthlyResidentialProxyGbytes** numberrequired

      **Example:** `0.5`
    - **maxActorMemoryGbytes** numberrequired

      **Example:** `16`
    - **maxActorCount** integerrequired

      **Example:** `100`
    - **maxActorTaskCount** integerrequired

      **Example:** `1000`
    - **maxConcurrentActorJobs** integerrequired

      **Example:** `256`
    - **maxTeamAccountSeatCount** integerrequired

      **Example:** `9`
    - **dataRetentionDays** integerrequired

      **Example:** `90`

  - **current** objectrequired





    - **monthlyUsageUsd** numberrequired

      **Example:** `43`
    - **monthlyActorComputeUnits** numberrequired

      **Example:** `500.784475`
    - **monthlyExternalDataTransferGbytes** numberrequired

      **Example:** `3.00861903931946`
    - **monthlyProxySerps** integerrequired

      **Example:** `34`
    - **monthlyResidentialProxyGbytes** numberrequired

      **Example:** `0.4`
    - **actorMemoryGbytes** numberrequired

      **Example:** `8`
    - **actorCount** integerrequired

      **Example:** `31`
    - **actorTaskCount** integerrequired

      **Example:** `130`
    - **activeActorJobCount** integerrequired

      **Example:** `0`
    - **teamAccountSeatCount** integerrequired

      **Example:** `5`

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
curl -L 'https://api.apify.com/v2/users/me/limits' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)