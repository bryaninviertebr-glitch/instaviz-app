---
title: Get store | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-get
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-get#__docusaurus_skipToContent_fallback)

# Get store

```
GET /v2/key-value-stores/:storeId
```

Gets an object that contains all the details about a specific key-value
store.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-get\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Status 200

**Response Headers**

```json
{
  "data": {
    "id": "WkzbQMuFYuamGv3YF",
    "name": "d7b9MDYsbtX5L7XAj",
    "userId": "BPWDBd7Z9c746JAnF",
    "username": "janedoe",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-13T08:36:13.202Z",
    "accessedAt": "2019-12-14T08:36:13.202Z",
    "actId": null,
    "actRunId": null,
    "consoleUrl": "https://console.apify.com/storage/key-value-stores/27TmTznX9YPeAYhkC",
    "keysPublicUrl": "https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/keys?signature=abc123",
    "urlSigningSecretKey": "string",
    "generalAccess": "RESTRICTED",
    "stats": {
      "readCount": 9,
      "writeCount": 3,
      "deleteCount": 6,
      "listCount": 2,
      "s3StorageBytes": 18
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `WkzbQMuFYuamGv3YF`
  - **name** string

    **Example:** `d7b9MDYsbtX5L7XAj`
  - **userId** string \| nullnullable

    **Example:** `BPWDBd7Z9c746JAnF`
  - **username** string \| nullnullable

    **Example:** `janedoe`
  - **createdAt** string<date-time>required

    **Example:** `2019-12-12T07:34:14.202Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2019-12-13T08:36:13.202Z`
  - **accessedAt** string<date-time>required

    **Example:** `2019-12-14T08:36:13.202Z`
  - **actId** string \| nullnullable

    **Example:** `null`
  - **actRunId** string \| nullnullable

    **Example:** `null`
  - **consoleUrl** string<uri>

    **Example:** `https://console.apify.com/storage/key-value-stores/27TmTznX9YPeAYhkC`
  - **keysPublicUrl** string<uri>
    A public link to access keys of the key-value store directly.


    **Example:** `https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/keys?signature=abc123`
  - **urlSigningSecretKey** string \| nullnullable
    A secret key for generating signed public URLs. It is only provided to clients with WRITE permission for the key-value store.

  - **generalAccess** GeneralAccess (string)
    Defines the general access level for the resource.

    **Possible values:** \[`ANYONE_WITH_ID_CAN_READ`, `ANYONE_WITH_NAME_CAN_READ`, `FOLLOW_USER_SETTING`, `RESTRICTED`\]


    **Example:** `RESTRICTED`
  - **stats** object





    - **readCount** integerrequired

      **Example:** `9`
    - **writeCount** integerrequired

      **Example:** `3`
    - **deleteCount** integerrequired

      **Example:** `6`
    - **listCount** integerrequired

      **Example:** `2`
    - **s3StorageBytes** integer

      **Example:** `18`

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