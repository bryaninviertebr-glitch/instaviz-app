---
title: Update limits | Apify Documentation
source: https://docs.apify.com/api/v2/users-me-limits-put
---

[Skip to main content](https://docs.apify.com/api/v2/users-me-limits-put#__docusaurus_skipToContent_fallback)

# Update limits

Copy for LLM

```
PUT https://api.apify.com/v2/users/me/limits
```

Updates the account's limits manageable on your account's [Limits page](https://console.apify.com/billing#/limits).
Specifically the: `maxMonthlyUsageUsd` and `dataRetentionDays` limits (see request body schema for more details).

## Request [Direct link to request](https://docs.apify.com/api/v2/users-me-limits-put\#request)

- application/json

### Body

- **maxMonthlyUsageUsd** number
If your platform usage in the billing period exceeds the prepaid usage, you will be charged extra. Setting this property you can update your hard limit on monthly platform usage to prevent accidental overage or to limit the extra charges.


**Example:** `300`
- **dataRetentionDays** integer
Apify securely stores your ten most recent Actor runs indefinitely, ensuring they are always accessible. Unnamed storages and other Actor runs are automatically deleted after the retention period. If you're subscribed, you can change it to keep data for longer or to limit your usage. [Lear more](https://docs.apify.com/platform/storage/usage#data-retention).


**Example:** `90`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/users-me-limits-put\#responses)

- 201
- 400

### Status 201

**Response Headers**

- application/json

- Example (auto)
- Schema

```json
{}
```

**Schema**

- **object** object

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
curl -L -X PUT 'https://api.apify.com/v2/users/me/limits' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "maxMonthlyUsageUsd": 300,
  "dataRetentionDays": 90
}'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Body

```json
{
  "maxMonthlyUsageUsd": 300,
  "dataRetentionDays": 90
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