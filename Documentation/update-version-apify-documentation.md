---
title: Update version | Apify Documentation
source: https://docs.apify.com/api/v2/act-version-put
---

[Skip to main content](https://docs.apify.com/api/v2/act-version-put#__docusaurus_skipToContent_fallback)

API Clients

[![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/ActorVersionClientAsync#update)

# Update version

Copy for LLM

```
PUT https://api.apify.com/v2/acts/:actorId/versions/:versionNumber
```

Updates Actor version using values specified by a [Version object](https://docs.apify.com/api/v2/act-version-put#/reference/actors/version-object) passed as JSON in the POST payload.

If the object does not define a specific property, its value will not be
updated.

The request needs to specify the `Content-Type: application/json` HTTP
header!

When providing your API authentication token, we recommend using the
request's `Authorization` header, rather than the URL. ( [More\\
info](https://docs.apify.com/api/v2/act-version-put#/introduction/authentication)).

The response is the [Version object](https://docs.apify.com/api/v2/act-version-put#/reference/actors/version-object) as
returned by the [Get version](https://docs.apify.com/api/v2/act-version-put#/reference/actors/version-object/get-version) endpoint.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-version-put\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

**versionNumber** stringrequired

Actor major and minor version of the Actor.

**Example:** `1.0`

- application/json

### Body **required**

- **versionNumber** string \| nullnullable

**Example:** `0.0`
- **sourceType** object





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
- **buildTag** string \| nullnullable

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


## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-version-put\#responses)

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
    "versionNumber": "0.0",
    "sourceType": "SOURCE_FILES",
    "envVars": "Unknown Type: array,null",
    "applyEnvVarsToBuild": false,
    "buildTag": "latest",
    "sourceFiles": [\
      {\
        "format": "TEXT",\
        "content": "console.log('This is the main.js file');",\
        "name": "src/main.js"\
      },\
      {\
        "name": "src/utils",\
        "folder": true\
      }\
    ],
    "gitRepoUrl": "string",
    "tarballUrl": "string",
    "gitHubGistUrl": "string"
  }
}
```

**Schema**

- **data** objectrequired





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
curl -L -X PUT 'https://api.apify.com/v2/acts/:actorId/versions/:versionNumber' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "versionNumber": "0.0",
  "sourceType": "SOURCE_FILES",
  "envVars": "Unknown Type: array,null",
  "applyEnvVarsToBuild": false,
  "buildTag": "latest",
  "sourceFiles": [\
    {\
      "format": "TEXT",\
      "content": "console.log('\''This is the main.js file'\'');",\
      "name": "src/main.js"\
    }\
  ],
  "gitRepoUrl": "string",
  "tarballUrl": "string",
  "gitHubGistUrl": "string"
}'
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

Body required

- Example (from schema)
- Example

```json
{
  "versionNumber": "0.0",
  "sourceType": "SOURCE_FILES",
  "envVars": "Unknown Type: array,null",
  "applyEnvVarsToBuild": false,
  "buildTag": "latest",
  "sourceFiles": [\
    {\
      "format": "TEXT",\
      "content": "console.log('This is the main.js file');",\
      "name": "src/main.js"\
    }\
  ],
  "gitRepoUrl": "string",
  "tarballUrl": "string",
  "gitHubGistUrl": "string"
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