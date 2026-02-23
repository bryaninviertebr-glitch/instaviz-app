---
title: Get OpenAPI definition | Apify Documentation
source: https://docs.apify.com/api/v2/actor-build-openapi-json-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-build-openapi-json-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/BuildClient#getOpenApiDefinition) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/BuildClient#get_open_api_definition)

# Get OpenAPI definition

Copy for LLM

```
GET https://api.apify.com/v2/actor-builds/:buildId/openapi.json
```

Get the OpenAPI definition for Actor builds. Two similar endpoints are available:

- [First endpoint](https://docs.apify.com/api/v2/act-openapi-json-get): Requires both `actorId` and `buildId`. Use `default` as the `buildId` to get the OpenAPI schema for the default Actor build.
- [Second endpoint](https://docs.apify.com/api/v2/actor-build-openapi-json-get): Requires only `buildId`.

Get the OpenAPI definition for a specific Actor build.
Authentication is based on the build's unique ID. No authentication token is required.

note

You can also use the [`/api/v2/act-openapi-json-get`](https://docs.apify.com/api/v2/act-openapi-json-get) endpoint to get the OpenAPI definition for a build.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-build-openapi-json-get\#request)

### Path Parameters

**buildId** stringrequired

ID of the build you want to get, found in the build's `Info` tab.

**Example:** `soSkq9ekdmfOslopH`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-build-openapi-json-get\#responses)

- 200
- 400

### Status 200

The OpenAPI specification document for the Actor build.

**Response Headers**

- application/json

- Example (auto)
- Schema

```json
{}
```

**Schema**

- **object** object
A standard OpenAPI 3.x JSON document.


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
curl -L 'https://api.apify.com/v2/actor-builds/:buildId/openapi.json' \
-H 'Accept: application/json'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Parameters

buildId — pathrequired

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)