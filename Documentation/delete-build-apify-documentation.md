---
title: Delete build | Apify Documentation
source: https://docs.apify.com/api/v2/actor-build-delete
---

[Skip to main content](https://docs.apify.com/api/v2/actor-build-delete#__docusaurus_skipToContent_fallback)

# Delete build

```
DELETE /v2/actor-builds/:buildId
```

Delete the build. The build that is the current default build for the Actor
cannot be deleted.

Only users with build permissions for the Actor can delete builds.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-build-delete\#request)

### Path Parameters

**buildId** stringrequired

ID of the build you want to get, found in the build's `Info` tab.

**Example:** `soSkq9ekdmfOslopH`

### Status 204

**Response Headers**

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