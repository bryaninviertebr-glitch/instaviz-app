---
title: Abort build | Apify Documentation
source: https://docs.apify.com/api/v2/act-build-abort-post
---

[Skip to main content](https://docs.apify.com/api/v2/act-build-abort-post#__docusaurus_skipToContent_fallback)

# Abort build

Copy for LLM

```
POST https://api.apify.com/v2/acts/:actorId/builds/:buildId/abort
```

deprecated

This endpoint has been deprecated and may be replaced or removed in future versions of the API.

**\[DEPRECATED\]** API endpoints related to build of the Actor were moved
under new namespace [`actor-builds`](https://docs.apify.com/api/v2/act-build-abort-post#/reference/actor-builds). Aborts an
Actor build and returns an object that contains all the details about the
build.

Only builds that are starting or running are aborted. For builds with status
`FINISHED`, `FAILED`, `ABORTING` and `TIMED-OUT` this call does nothing.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-build-abort-post\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

**buildId** stringrequired

Build ID.

**Example:** `3KH8gEpp4d8uQSe8T`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-build-abort-post\#responses)

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
    "id": "HG7ML7M8z78YcAPEB",
    "actId": "janedoe~my-actor",
    "userId": "klmdEpoiojmdEMlk3",
    "startedAt": "2019-11-30T07:34:24.202Z",
    "finishedAt": "2019-12-12T09:30:12.202Z",
    "status": "ABORTED",
    "meta": {
      "origin": "WEB",
      "userAgent": "Mozilla/5.0 (iPad)"
    },
    "stats": {
      "durationMillis": 1000,
      "runTimeSecs": 5.718,
      "computeUnits": 0.012699444444444444
    },
    "options": {
      "useCache": false,
      "memoryMbytes": 1024,
      "diskMbytes": 2048
    },
    "usage": {
      "ACTOR_COMPUTE_UNITS": 0.08
    },
    "usageTotalUsd": 0.02,
    "usageUsd": {
      "ACTOR_COMPUTE_UNITS": 0.02
    },
    "buildNumber": "0.1.1"
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `HG7ML7M8z78YcAPEB`
  - **actId** stringrequired

    **Example:** `janedoe~my-actor`
  - **userId** stringrequired

    **Example:** `klmdEpoiojmdEMlk3`
  - **startedAt** string<date-time>required

    **Example:** `2019-11-30T07:34:24.202Z`
  - **finishedAt** string,null<date-time>nullable

    **Example:** `2019-12-12T09:30:12.202Z`
  - **status** ActorJobStatus (string)required
    Status of an Actor job (run or build).

    **Possible values:** \[`READY`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMING-OUT`, `TIMED-OUT`, `ABORTING`, `ABORTED`\]

  - **meta** objectrequired





    - **origin** RunOrigin (string)required
      **Possible values:** \[`DEVELOPMENT`, `WEB`, `API`, `SCHEDULER`, `TEST`, `WEBHOOK`, `ACTOR`, `CLI`, `STANDBY`\]

    - **clientIp** string
      IP address of the client that started the build.


      **Example:** `172.234.12.34`
    - **userAgent** string
      User agent of the client that started the build.


      **Example:** `Mozilla/5.0 (iPad)`

  - **stats** object





    anyOf





    - BuildStats
    - null

**durationMillis** integer

**Example:** `1000`
**runTimeSecs** number

**Example:** `45.718`
**computeUnits** numberrequired

**Example:** `0.0126994444444444`

  - **options** object





    anyOf





    - BuildOptions
    - null

**useCache** boolean \| nullnullable

**Example:** `false`
**betaPackages** boolean \| nullnullable

**Example:** `false`
**memoryMbytes** integer \| nullnullable

**Example:** `1024`
**diskMbytes** integer \| nullnullable

**Example:** `2048`

  - **usage** object





    anyOf





    - BuildUsage
    - null

**ACTOR\_COMPUTE\_UNITS** number \| nullnullable

**Example:** `0.08`

  - **usageTotalUsd** number \| nullnullable

    **Example:** `0.02`
  - **usageUsd** object





    anyOf





    - BuildUsage
    - null

**ACTOR\_COMPUTE\_UNITS** number \| nullnullable

**Example:** `0.08`

  - **inputSchema** string \| nullnullabledeprecated

    **Example:**`{\n  "title": "Schema for ... }`
  - **readme** string \| nullnullabledeprecated

    **Example:**`# Magic Actor\nThis Actor is magic.`
  - **buildNumber** stringrequired

    **Example:** `0.1.1`
  - **actorDefinition** object





    anyOf





    - ActorDefinition
    - null

**actorSpecification** integer
The Actor specification version that this Actor follows. This property must be set to 1.

**Possible values:** \[`1`\]

**name** string
The name of the Actor.

**version** string
The version of the Actor, specified in the format \[Number\].\[Number\], e.g., 0.1, 1.0.

**Possible values:** Value must match regular expression `^[0-9]+\.[0-9]+$`

**buildTag** string
The tag name to be applied to a successful build of the Actor. Defaults to 'latest' if not specified.

**environmentVariables** object

A map of environment variables to be used during local development and deployment.

    - **property name\*** string

**dockerfile** string
The path to the Dockerfile used for building the Actor on the platform.

**dockerContextDir** string
The path to the directory used as the Docker context when building the Actor.

**readme** string
The path to the README file for the Actor.

**input** object
The input schema object, the full specification can be found in [Apify docs](https://docs.apify.com/platform/actors/development/actor-definition/input-schema)

**changelog** string
The path to the CHANGELOG file displayed in the Actor's information tab.

**storages** object

    - **dataset** object
      Defines the schema of items in your dataset, the full specification can be found in [Apify docs](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema)


**defaultMemoryMbytes** object

Specifies the default amount of memory in megabytes to be used when the Actor is started. Can be an integer or a [dynamic memory expression](https://docs.apify.com/platform/actors/development/actor-definition/dynamic-actor-memory).

oneOf

    - string
    - integer

string
**Examples:**

    - Example 1
    - Example 2
    - Example 3

**Example:** `get(input`

**Example:** `startUrls.length`

**Example:** `1) * 1024`

**minMemoryMbytes** integer
Specifies the minimum amount of memory in megabytes required by the Actor.

**Possible values:**`>= 256`

**maxMemoryMbytes** integer
Specifies the maximum amount of memory in megabytes required by the Actor.

**Possible values:**`>= 256`

**usesStandbyMode** boolean
Specifies whether Standby mode is enabled for the Actor.

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
curl -L -X POST 'https://api.apify.com/v2/acts/:actorId/builds/:buildId/abort' \
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

buildId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)