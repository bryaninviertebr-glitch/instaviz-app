---
title: Check if a record exists | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-record-head
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-record-head#__docusaurus_skipToContent_fallback)

# Check if a record exists

```
HEAD /v2/key-value-stores/:storeId/records/:recordKey
```

Check if a value is stored in the key-value store under a specific key.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-record-head\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**recordKey** stringrequired

Key of the record.

**Example:** `someKey`

### Status 200

The record exists

**Response Headers**

### Status 404

The record does not exist

**Response Headers**

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)