---
title: Delete version | Apify Documentation
source: https://docs.apify.com/api/v2/act-version-delete
---

[Skip to main content](https://docs.apify.com/api/v2/act-version-delete#__docusaurus_skipToContent_fallback)

# Delete version

```
DELETE /v2/acts/:actorId/versions/:versionNumber
```

Deletes a specific version of Actor's source code.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-version-delete\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

**versionNumber** stringrequired

Actor major and minor version of the Actor.

**Example:** `1.0`

### Status 204

**Response Headers**

```json
{}
```

**Schema**

- **object** object

**Example:**`{}`

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