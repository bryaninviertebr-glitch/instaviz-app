---
title: Delete record | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-record-delete
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-record-delete#__docusaurus_skipToContent_fallback)

# Delete record

```
DELETE /v2/key-value-stores/:storeId/records/:recordKey
```

Removes a record specified by a key from the key-value store.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-record-delete\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**recordKey** stringrequired

Key of the record.

**Example:** `someKey`

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