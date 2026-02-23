---
title: Run Actor synchronously with input and return output | Apify Documentation
source: https://docs.apify.com/api/v2/act-run-sync-post
---

[Skip to main content](https://docs.apify.com/api/v2/act-run-sync-post#__docusaurus_skipToContent_fallback)

# Run Actor synchronously with input and return output

Copy for LLM

```
POST https://api.apify.com/v2/acts/:actorId/run-sync
```

Runs a specific Actor and returns its output.

The POST payload including its `Content-Type` header is passed as `INPUT` to
the Actor (usually `application/json`).
The HTTP response contains Actors `OUTPUT` record from its default
key-value store.

The Actor is started with the default options; you can override them using
various URL query parameters.
If the Actor run exceeds 300 seconds,
the HTTP response will have status 408 (Request Timeout).

Beware that it might be impossible to maintain an idle HTTP connection for a
long period of time, due to client timeout or network conditions. Make sure your HTTP client is
configured to have a long enough connection timeout.
If the connection breaks, you will not receive any information about the run
and its status.

To run the Actor asynchronously, use the [Run\\
Actor](https://docs.apify.com/api/v2/act-run-sync-post#/reference/actors/run-collection/run-actor) API endpoint instead.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-run-sync-post\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

### Query Parameters

**outputRecordKey** string

Key of the record from run's default key-value store to be returned
in the response. By default, it is `OUTPUT`.

**Example:** `OUTPUT`

**timeout** double

Optional timeout for the run, in seconds. By default, the run uses a
timeout specified in the default run configuration for the Actor.

**Example:** `60`

**memory** double

Memory limit for the run, in megabytes. The amount of memory can be set
to a power of 2 with a minimum of 128. By default, the run uses a memory
limit specified in the default run configuration for the Actor.

**Example:** `256`

**maxItems** double

Specifies the maximum number of dataset items that will be charged for pay-per-result Actors.
This does NOT guarantee that the Actor will return only this many items.
It only ensures you won't be charged for more than this number of items.
Only works for pay-per-result Actors.
Value can be accessed in the actor run using `ACTOR_MAX_PAID_DATASET_ITEMS` environment variable.

**Example:** `1000`

**maxTotalChargeUsd** double

Specifies the maximum cost of the run. This parameter is
useful for pay-per-event Actors, as it allows you to limit the amount
charged to your subscription. You can access the maximum cost in your Actor
by using the `ACTOR_MAX_TOTAL_CHARGE_USD` environment variable.

**Example:** `5`

**restartOnError** boolean

Determines whether the run will be restarted if it fails.

**Example:** `false`

**build** string

Specifies the Actor build to run. It can be either a build tag or build
number. By default, the run uses the build specified in the default run
configuration for the Actor (typically `latest`).

**Example:** `0.1.234`

**webhooks** string

Specifies optional webhooks associated with the Actor run, which can be
used to receive a notification
e.g. when the Actor finished or failed. The value is a Base64-encoded
JSON array of objects defining the webhooks. For more information, see
[Webhooks documentation](https://docs.apify.com/platform/integrations/webhooks).

**Example:** `dGhpcyBpcyBqdXN0IGV4YW1wbGUK...`

- application/json

### Body **required**

- **object** object

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-run-sync-post\#responses)

- 201
- 400
- 408

### Status 201

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "bar": "foo"
}
```

**Schema**

- **object** object

### Status 400

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "run-failed",
    "message": "Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)\n"
  }
}
```

**Schema**

- **error** objectrequired





  - **type** stringrequired

    **Example:** `run-failed`
  - **message** stringrequired

    **Example:** `Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)`

### Status 408

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "run-timeout-exceeded",
    "message": "Actor run exceeded timeout of 300 seconds for this API endpoint"
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
curl -L 'https://api.apify.com/v2/acts/:actorId/run-sync' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{}'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

actorId — pathrequired

Show optional parameters

outputRecordKey — query

timeout — query

memory — query

maxItems — query

maxTotalChargeUsd — query

restartOnError — query

\-\-\-truefalse

build — query

webhooks — query

Body required

- Example (from schema)
- Example

```json
{}
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)