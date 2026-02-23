---
title: Charge events in run | Apify Documentation
source: https://docs.apify.com/api/v2/post-charge-run
---

[Skip to main content](https://docs.apify.com/api/v2/post-charge-run#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/RunClient#charge) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/RunClientAsync#charge)

# Charge events in run

Copy for LLM

```
POST https://api.apify.com/v2/actor-runs/:runId/charge
```

Charge for events in the run of your [pay per event Actor](https://docs.apify.com/platform/actors/running/actors-in-store#pay-per-event).
The event you are charging for must be one of the configured events in your Actor. If the Actor is not set up as pay per event, or if the event is not configured,
the endpoint will return an error. The endpoint must be called from the Actor run itself, with the same API token that the run was started with.

Learn more about pay-per-event pricing

For more details about pay-per-event (PPE) pricing, refer to our [PPE documentation](https://docs.apify.com/platform/actors/publishing/monetize/pay-per-event).

## Request [Direct link to request](https://docs.apify.com/api/v2/post-charge-run\#request)

### Path Parameters

**runId** stringrequired

Run ID.

**Example:** `3KH8gEpp4d8uQSe8T`

### Header Parameters

**idempotency-key** string

Always pass a unique idempotency key (any unique string) for each charge to avoid double charging in case of retries or network errors.

**Example:** `2024-12-09T01:23:45.000Z-random-uuid`

- application/json

### Body **required**

Define which event, and how many times, you want to charge for.

- **eventName** stringrequired

**Example:** `ANALYZE_PAGE`
- **count** integerrequired

**Example:** `1`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/post-charge-run\#responses)

- 201
- 400

### Status 201

The charge was successful. Note that you still have to make sure in your Actor that the total charge for the run respects the maximum value set by the user, as the API does not check this. Above the limit, the charges reported as successful in API will not be added to your payouts, but you will still bear the associated costs. Use the Apify charge manager or SDK to avoid having to deal with this manually.

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
curl -L 'https://api.apify.com/v2/actor-runs/:runId/charge' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "eventName": "ANALYZE_PAGE",
  "count": 1
}'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

runId — pathrequired

Show optional parameters

idempotency-key — header

Body required

- Example (from schema)
- Example

```json
{
  "eventName": "ANALYZE_PAGE",
  "count": 1
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