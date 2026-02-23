---
title: Create key-value store | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-stores-post
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-stores-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/KeyValueStoreCollectionClient#getOrCreate) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/KeyValueStoreCollectionClientAsync#get_or_create)

# Create key-value store

Copy for LLM

```
POST https://api.apify.com/v2/key-value-stores
```

Creates a key-value store and returns its object. The response is the same
object as returned by the [Get store](https://docs.apify.com/api/v2/key-value-stores-post#/reference/key-value-stores/store-object/get-store)
endpoint.

Keep in mind that data stored under unnamed store follows [data retention\\
period](https://docs.apify.com/platform/storage#data-retention).

It creates a store with the given name if the parameter name is used.
If there is another store with the same name, the endpoint does not create a
new one and returns the existing object instead.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-stores-post\#request)

### Query Parameters

**name** string

Custom unique name to easily identify the store in the future.

**Example:** `eshop-values`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/key-value-stores-post\#responses)

- 201
- 400

### Status 201

**Response Headers**

- **Location**

- application/json

- Example
- Schema

```json
{
  "data": {
    "id": "WkzbQMuFYuamGv3YF",
    "name": "d7b9MDYsbtX5L7XAj",
    "userId": "wRsJZtadYvn4mBZmm",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-13T08:36:13.202Z",
    "accessedAt": "2019-12-14T08:36:13.202Z",
    "actId": null,
    "actRunId": null,
    "consoleUrl": "https://console.apify.com/storage/key-value-stores/WkzbQMuFYuamGv3YF",
    "keysPublicUrl": "https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/keys?signature=abc123"
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
apify key-value-stores create <STORE NAME>
```

- CURL

```bash
curl -L -X POST 'https://api.apify.com/v2/key-value-stores' \
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

Show optional parameters

name — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)