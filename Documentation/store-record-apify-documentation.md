---
title: Store record | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-store-record-put
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-store-record-put#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/KeyValueStoreClient#setRecord) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/KeyValueStoreClientAsync#set_record)

# Store record

Copy for LLM

```
PUT https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey
```

Stores a value under a specific key to the key-value store.

The value is passed as the PUT payload and it is stored with a MIME content
type defined by the `Content-Type` header and with encoding defined by the
`Content-Encoding` header.

To save bandwidth, storage, and speed up your upload, send the request
payload compressed with Gzip compression and add the `Content-Encoding: gzip`
header. It is possible to set up another compression type with `Content-Encoding`
request header.

Below is a list of supported `Content-Encoding` types.

- Gzip compression: `Content-Encoding: gzip`
- Deflate compression: `Content-Encoding: deflate`
- Brotli compression: `Content-Encoding: br`

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-store-record-put\#request)

### Path Parameters

**storeId** stringrequired

Key-value store ID or `username~store-name`.

**Example:** `WkzbQMuFYuamGv3YF`

**recordKey** stringrequired

Key of the record.

**Example:** `someKey`

### Header Parameters

**Content-Encoding** stringrequired

**Possible values:** \[`gzip`\]

**Example:** `gzip`

- application/json

### Body **required**

- **property name\*** any
The request body contains the value to store in the record. The content type
should be specified in the Content-Type header.


**Example:**`{"message":"Hello, world!","count":42}`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/key-value-store-record-put\#responses)

- 201
- 400

### Status 201

**Response Headers**

- **Location**

- application/json

- Example
- Schema

```json
{}
```

**Schema**

- **object** object

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
apify key-value-stores set-value <STORE ID> INPUT '{"new": "value"}'
```

- CURL

```bash
curl -L -X PUT 'https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{
  "message": "Hello, world!",
  "count": 42
}'
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

Content-Encoding — headerrequired

\-\-\-gzip

Body required

- Example (from schema)
- Example

```json
{
  "message": "Hello, world!",
  "count": 42
}
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)