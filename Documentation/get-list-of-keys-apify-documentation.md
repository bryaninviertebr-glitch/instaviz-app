---
title: Get list of keys | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-keys-get
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-keys-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/KeyValueStoreClient#listKeys) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/KeyValueStoreClientAsync#list_keys)

# Get list of keys

Copy for LLM

```
GET https://api.apify.com/v2/key-value-stores/:storeId/keys
```

Returns a list of objects describing keys of a given key-value store, as
well as some information about the values (e.g. size).

This endpoint is paginated using `exclusiveStartKey` and `limit` parameters

- see [Pagination](https://docs.apify.com/api/v2#using-key) for more details.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-keys-get\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**exclusiveStartKey** string

All keys up to this one (including) are skipped from the result.

**Example:** `Ihnsp8YrvJ8102Kj`

**limit** double

Number of keys to be returned. Maximum value is `1000`.

**Example:** `100`

**collection** string

Limit the results to keys that belong to a specific collection from the key-value store schema. The key-value store need to have a schema defined for this parameter to work.

**Example:** `postImages`

**prefix** string

Limit the results to keys that start with a specific prefix.

**Example:** `post-images-`

**signature** string

Signature used to access the keys.

**Example:** `2wTI46Bg8qWQrV7tavlPI`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/key-value-store-keys-get\#responses)

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
    "items": [\
      {\
        "key": "second-key",\
        "size": 36,\
        "recordPublicUrl": "https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/records/second-key?signature=abc123"\
      },\
      {\
        "key": "third-key",\
        "size": 128,\
        "recordPublicUrl": "https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/records/third-key?signature=abc123"\
      }\
    ],
    "count": 2,
    "limit": 2,
    "exclusiveStartKey": "some-key",
    "isTruncated": true,
    "nextExclusiveStartKey": "third-key"
  }
}
```

**Schema**

- **data** objectrequired





  - **items** object\[\]required









    - **key** stringrequired

      **Example:** `second-key`
    - **size** integerrequired

      **Example:** `36`
    - **recordPublicUrl** string<uri>required
      A public link to access this record directly.


      **Example:** `https://api.apify.com/v2/key-value-stores/WkzbQMuFYuamGv3YF/records/some-key?signature=abc123`

  - **count** integerrequired

    **Example:** `2`
  - **limit** integerrequired

    **Example:** `2`
  - **exclusiveStartKey** string

    **Example:** `some-key`
  - **isTruncated** booleanrequired

    **Example:** `true`
  - **nextExclusiveStartKey** string

    **Example:** `third-key`

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
apify key-value-stores keys <STORE ID>
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/key-value-stores/:storeId/keys' \
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

storeId — pathrequired

Show optional parameters

exclusiveStartKey — query

limit — query

collection — query

prefix — query

signature — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)