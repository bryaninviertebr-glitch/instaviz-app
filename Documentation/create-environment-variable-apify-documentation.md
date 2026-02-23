---
title: Create environment variable | Apify Documentation
source: https://docs.apify.com/api/v2/act-version-env-vars-post
---

[Skip to main content](https://docs.apify.com/api/v2/act-version-env-vars-post#__docusaurus_skipToContent_fallback)

# Create environment variable

```
POST /v2/acts/:actorId/versions/:versionNumber/env-vars
```

Creates an environment variable of an Actor using values specified in a
[EnvVar object](https://docs.apify.com/api/v2/act-version-env-vars-post#/reference/actors/environment-variable-object) passed as
JSON in the POST payload.

The request must specify `name` and `value` parameters (as strings) in the
JSON payload and a `Content-Type: application/json` HTTP header.

```typescript
{
    "name": "ENV_VAR_NAME",
    "value": "my-env-var"
}
```

The response is the [EnvVar\\
object](https://docs.apify.com/api/v2/act-version-env-vars-post#/reference/actors/environment-variable-object) as returned by the [Get environment\\
variable](https://docs.apify.com/api/v2/act-version-env-vars-post#/reference/actors/environment-variable-object/get-environment-variable)
endpoint.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-version-env-vars-post\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

**versionNumber** stringrequired

Actor version

**Example:** `0.1`

### Body **required**

- **name** stringrequired

**Example:** `MY_ENV_VAR`
- **value** stringrequired

**Example:** `my-value`
- **isSecret** boolean \| nullnullable

**Example:** `false`

### Status 201

**Response Headers**

- **Location**

```json
{
  "data": {
    "name": "MY_ENV_VAR",
    "value": "my-value",
    "isSecret": false
  }
}
```

**Schema**

- **data** objectrequired





  - **name** stringrequired

    **Example:** `MY_ENV_VAR`
  - **value** stringrequired

    **Example:** `my-value`
  - **isSecret** boolean \| nullnullable

    **Example:** `false`

### Status 400

Bad request - invalid input parameters or request body.

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

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)