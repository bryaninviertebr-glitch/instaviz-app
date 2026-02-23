---
title: Get default build | Apify Documentation
source: https://docs.apify.com/api/v2/act-build-default-get
---

[Skip to main content](https://docs.apify.com/api/v2/act-build-default-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/ActorClient#defaultBuild) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ActorClient#default_build)

# Get default build

Copy for LLM

```
GET https://api.apify.com/v2/acts/:actorId/builds/default
```

Get the default build for an Actor.

Use the optional `waitForFinish` parameter to synchronously wait for the build to finish.
This avoids the need for periodic polling when waiting for the build to complete.

This endpoint does not require an authentication token. Instead, calls are authenticated using the Actor's unique ID.
However, if you access the endpoint without a token, certain attributes (e.g., `usageUsd` and `usageTotalUsd`) will be hidden.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-build-default-get\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

### Query Parameters

**waitForFinish** double

The maximum number of seconds the server waits for the build to finish.
If the build finishes within this time, the returned build object will have a terminal status (e.g. `SUCCEEDED`),
otherwise it will have a transitional status (e.g. `RUNNING`).

By default it is `0`, the maximum value is `60`.

**Example:** `60`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-build-default-get\#responses)

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
    "status": "SUCCEEDED",
    "meta": {
      "origin": "WEB",
      "clientIp": "172.234.12.34",
      "userAgent": "Mozilla/5.0 (iPad)"
    },
    "stats": {
      "durationMillis": 1000,
      "runTimeSecs": 45.718,
      "computeUnits": 0.012699444444444444
    },
    "options": {
      "useCache": false,
      "betaPackages": false,
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
    "inputSchema": "{\\n  \\\"title\\\": \\\"Schema for ... }",
    "readme": "# Magic Actor\\nThis Actor is magic.",
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
curl -L 'https://api.apify.com/v2/acts/:actorId/builds/default' \
-H 'Accept: application/json'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Parameters

actorId — pathrequired

Show optional parameters

waitForFinish — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)