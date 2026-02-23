---
title: Run task synchronously | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-run-sync-post
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-run-sync-post#__docusaurus_skipToContent_fallback)

# Run task synchronously

Copy for LLM

```
POST https://api.apify.com/v2/actor-tasks/:actorTaskId/run-sync
```

Runs an Actor task and synchronously returns its output.

The run must finish in 300 seconds
otherwise the HTTP request fails with a timeout error (this won't abort
the run itself).

Optionally, you can override the Actor input configuration by passing a JSON
object as the POST payload and setting the `Content-Type: application/json` HTTP header.

Note that if the object in the POST payload does not define a particular
input property, the Actor run uses the default value defined by the task (or Actor's input
schema if not defined by the task).

Beware that it might be impossible to maintain an idle HTTP connection for
an extended period, due to client timeout or network conditions. Make sure your HTTP client is
configured to have a long enough connection timeout.

If the connection breaks, you will not receive any information about the run
and its status.

Input fields from Actor task configuration can be overloaded with values
passed as the POST payload.

Just make sure to specify `Content-Type` header to be `application/json` and
input to be an object.

To run the task asynchronously, use the [Run\\
task](https://docs.apify.com/api/v2/actor-task-run-sync-post#/reference/actor-tasks/run-collection/run-task) API endpoint instead.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-run-sync-post\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

### Query Parameters

**timeout** double

Optional timeout for the run, in seconds. By default, the run uses a
timeout specified in the task settings.

**Example:** `60`

**memory** double

Memory limit for the run, in megabytes. The amount of memory can be set
to a power of 2 with a minimum of 128. By default, the run uses a memory
limit specified in the task settings.

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
number. By default, the run uses the build specified in the task
settings (typically `latest`).

**Example:** `0.1.234`

**outputRecordKey** string

Key of the record from run's default key-value store to be returned
in the response. By default, it is `OUTPUT`.

**Example:** `OUTPUT`

**webhooks** string

Specifies optional webhooks associated with the Actor run, which can be
used to receive a notification

e.g. when the Actor finished or failed. The value is a Base64-encoded
JSON array of objects defining the webhooks. For more information, see

[Webhooks\\
documentation](https://docs.apify.com/platform/integrations/webhooks).

**Example:** `dGhpcyBpcyBqdXN0IGV4YW1wbGUK...`

- application/json

### Body **required**

- **object** object

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-task-run-sync-post\#responses)

- 201
- 400

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

- Example (auto)
- Schema

```json
{
  "error": {
    "type": "run-failed",
    "message": "Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)"
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
curl -L 'https://api.apify.com/v2/actor-tasks/:actorTaskId/run-sync' \
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

actorTaskId — pathrequired

Show optional parameters

timeout — query

memory — query

maxItems — query

maxTotalChargeUsd — query

restartOnError — query

\-\-\-truefalse

build — query

outputRecordKey — query

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