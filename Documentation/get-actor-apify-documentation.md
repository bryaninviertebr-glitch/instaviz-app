---
title: Get Actor | Apify Documentation
source: https://docs.apify.com/api/v2/act-get
---

[Skip to main content](https://docs.apify.com/api/v2/act-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/ActorClient#get) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ActorClientAsync#get)

# Get Actor

Copy for LLM

```
GET https://api.apify.com/v2/acts/:actorId
```

Gets an object that contains all the details about a specific Actor.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-get\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-get\#responses)

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
    "id": "zdc3Pyhyz3m8vjDeM",
    "userId": "wRsJZtadYvn4mBZmm",
    "name": "MyActor",
    "username": "jane35",
    "description": "My favourite Actor!",
    "isPublic": false,
    "createdAt": "2019-07-08T11:27:57.401Z",
    "modifiedAt": "2019-07-08T14:01:05.546Z",
    "stats": {
      "totalBuilds": 9,
      "totalRuns": 16,
      "totalUsers": 6,
      "totalUsers7Days": 2,
      "totalUsers30Days": 6,
      "totalUsers90Days": 6,
      "totalMetamorphs": 2,
      "lastRunStartedAt": "2019-07-08T14:01:05.546Z"
    },
    "versions": [\
      {\
        "versionNumber": "0.1",\
        "envVars": null,\
        "sourceType": "SOURCE_FILES",\
        "applyEnvVarsToBuild": false,\
        "buildTag": "latest",\
        "sourceFiles": []\
      },\
      {\
        "versionNumber": "0.2",\
        "sourceType": "GIT_REPO",\
        "envVars": null,\
        "applyEnvVarsToBuild": false,\
        "buildTag": "latest",\
        "gitRepoUrl": "https://github.com/jane35/my-actor"\
      },\
      {\
        "versionNumber": "0.3",\
        "sourceType": "TARBALL",\
        "envVars": null,\
        "applyEnvVarsToBuild": false,\
        "buildTag": "latest",\
        "tarballUrl": "https://github.com/jane35/my-actor/archive/master.zip"\
      },\
      {\
        "versionNumber": "0.4",\
        "sourceType": "GITHUB_GIST",\
        "envVars": null,\
        "applyEnvVarsToBuild": false,\
        "buildTag": "latest",\
        "gitHubGistUrl": "https://gist.github.com/jane35/e51feb784yu89"\
      }\
    ],
    "defaultRunOptions": {
      "build": "latest",
      "timeoutSecs": 3600,
      "memoryMbytes": 2048,
      "restartOnError": false
    },
    "exampleRunInput": {
      "body": "{ \"helloWorld\": 123 }",
      "contentType": "application/json; charset=utf-8"
    },
    "isDeprecated": false,
    "deploymentKey": "ssh-rsa AAAA ...",
    "title": "My Actor",
    "taggedBuilds": {
      "latest": {
        "buildId": "z2EryhbfhgSyqj6Hn",
        "buildNumber": "0.0.2",
        "finishedAt": "2019-06-10T11:15:49.286Z"
      }
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `zdc3Pyhyz3m8vjDeM`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **name** stringrequired

    **Example:** `MyActor`
  - **username** stringrequired

    **Example:** `jane35`
  - **description** string \| nullnullable

    **Example:** `My favourite actor!`
  - **restartOnError** booleandeprecated

    **Example:** `false`
  - **isPublic** booleanrequired

    **Example:** `false`
  - **actorPermissionLevel** ActorPermissionLevel (string)
    Determines permissions that the Actor requires to run. For more information, see the [Actor permissions documentation](https://docs.apify.com/platform/actors/development/permissions).

    **Possible values:** \[`LIMITED_PERMISSIONS`, `FULL_PERMISSIONS`\]


    **Example:** `LIMITED_PERMISSIONS`
  - **createdAt** string<date-time>required

    **Example:** `2019-07-08T11:27:57.401Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2019-07-08T14:01:05.546Z`
  - **stats** objectrequired





    - **totalBuilds** integer

      **Example:** `9`
    - **totalRuns** integer

      **Example:** `16`
    - **totalUsers** integer

      **Example:** `6`
    - **totalUsers7Days** integer

      **Example:** `2`
    - **totalUsers30Days** integer

      **Example:** `6`
    - **totalUsers90Days** integer

      **Example:** `6`
    - **totalMetamorphs** integer

      **Example:** `2`
    - **lastRunStartedAt** string<date-time>

      **Example:** `2019-07-08T14:01:05.546Z`

  - **versions** object\[\]required









    - **versionNumber** stringrequired

      **Example:** `0.0`
    - **sourceType** objectrequired





      anyOf





      - VersionSourceType
      - null

VersionSourceType (string)
**Possible values:** \[`SOURCE_FILES`, `GIT_REPO`, `TARBALL`, `GITHUB_GIST`\]

    - **envVars** object\[\]









      - **name** stringrequired

        **Example:** `MY_ENV_VAR`
      - **value** stringrequired

        **Example:** `my-value`
      - **isSecret** boolean \| nullnullable

        **Example:** `false`

    - **applyEnvVarsToBuild** boolean \| nullnullable

      **Example:** `false`
    - **buildTag** string

      **Example:** `latest`
    - **sourceFiles** object\[\]









      anyOf





      - SourceCodeFile
      - SourceCodeFolder

**format** SourceCodeFileFormat (string)required
**Possible values:** \[`BASE64`, `TEXT`\]

**Example:** `TEXT`
**content** stringrequired

**Example:** `console.log('This is the main.js file');`
**name** stringrequired

**Example:** `src/main.js`

    - **gitRepoUrl** string \| nullnullable
      URL of the Git repository when sourceType is GIT\_REPO.

    - **tarballUrl** string \| nullnullable
      URL of the tarball when sourceType is TARBALL.

    - **gitHubGistUrl** string \| nullnullable
      URL of the GitHub Gist when sourceType is GITHUB\_GIST.


  - **pricingInfos** object\[\]









    oneOf





    - PayPerEventActorPricingInfo
    - PricePerDatasetItemActorPricingInfo
    - FlatPricePerMonthActorPricingInfo
    - FreeActorPricingInfo

**apifyMarginPercentage** numberrequired
In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

**createdAt** string<date-time>required
When this pricing info record has been created

**startedAt** string<date-time>required
Since when is this pricing info record effective for a given Actor

**notifiedAboutFutureChangeAt** string,null<date-time>nullable
**notifiedAboutChangeAt** string,null<date-time>nullable
**reasonForChange** string \| nullnullable
**pricingModel** PricingModel (string)required
**Possible values:** \[`PAY_PER_EVENT`, `PRICE_PER_DATASET_ITEM`, `FLAT_PRICE_PER_MONTH`, `FREE`\]

**pricingPerEvent** objectrequired

    - **actorChargeEvents** object





      - **property name\*** ActorChargeEvent





        - **eventPriceUsd** numberrequired
        - **eventTitle** stringrequired
        - **eventDescription** stringrequired

**minimalMaxTotalChargeUsd** number \| nullnullable

  - **defaultRunOptions** objectrequired





    - **build** stringrequired

      **Example:** `latest`
    - **timeoutSecs** integer

      **Example:** `3600`
    - **memoryMbytes** integerrequired

      **Example:** `2048`
    - **restartOnError** boolean

      **Example:** `false`

  - **exampleRunInput** object





    anyOf





    - exampleRunInput
    - null

**body** stringrequired

**Example:**`{ "helloWorld": 123 }`
**contentType** stringrequired

**Example:** `application/json; charset=utf-8`

  - **isDeprecated** boolean \| nullnullable

    **Example:** `false`
  - **deploymentKey** string

    **Example:** `ssh-rsa AAAA ...`
  - **title** string \| nullnullable

    **Example:** `My Actor`
  - **taggedBuilds** object





    anyOf





    - TaggedBuilds
    - null

object
A dictionary mapping build tag names (e.g., "latest", "beta") to their build information.

**Example:**`{"latest":{"buildId":"z2EryhbfhgSyqj6Hn","buildNumber":"0.0.2","finishedAt":"2019-06-10T11:15:49.286Z"},"beta":{"buildId":"abc123def456","buildNumber":"1.0.0-beta","finishedAt":"2019-07-15T14:30:00.000Z"}}`

  - **readmeSummary** string
    A brief, LLM-generated readme summary


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

- Apify CLI

```bash
apify actors info <ACTOR ID>
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/acts/:actorId' \
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

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)