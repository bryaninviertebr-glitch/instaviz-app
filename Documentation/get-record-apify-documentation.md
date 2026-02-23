---
title: Get record | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-record-get
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-record-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/KeyValueStoreClient#getRecord) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/KeyValueStoreClientAsync#get_record)

# Get record

Copy for LLM

```
GET https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey
```

Gets a value stored in the key-value store under a specific key.

The response body has the same `Content-Encoding` header as it was set in
[Put record](https://docs.apify.com/api/v2/key-value-store-record-get#tag/Key-value-storesRecord/operation/keyValueStore_record_put).

If the request does not define the `Accept-Encoding` HTTP header with the
right encoding, the record will be decompressed.

Most HTTP clients support decompression by default. After using the HTTP
client with decompression support, the `Accept-Encoding` header is set by
the client and body is decompressed automatically.

Please note that for security reasons, Apify API can perform small modifications
to HTML documents before they are served via this endpoint. To fetch the raw HTML
content without any modifications, use the `attachment` query parameter.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-record-get\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**recordKey** stringrequired

Key of the record.

**Example:** `someKey`

### Query Parameters

**signature** string

Signature used to access the record.

**Example:** `2wTI46Bg8qWQrV7tavlPI`

**attachment** boolean

If `true` or `1`, the response will be served with `Content-Disposition: attachment` header,
causing web browsers to offer downloading HTML records instead of displaying them.

**Example:** `true`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/key-value-store-record-get\#responses)

- 200
- 302
- 400

### Status 200

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "foo": "bar"
}
```

**Schema**

### Status 302

**Response Headers**

- **Location**

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
apify key-value-stores get-value <STORE ID> INPUT
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey' \
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

recordKey — pathrequired

Show optional parameters

signature — query

attachment — query

\-\-\-truefalse

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)