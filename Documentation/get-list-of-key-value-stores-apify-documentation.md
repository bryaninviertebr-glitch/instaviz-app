---
title: Get list of key-value stores | Apify Documentation
source: https://docs.apify.com/api/v2/key-value-stores-get
---

[Skip to main content](https://docs.apify.com/api/v2/key-value-stores-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/KeyValueStoreCollectionClient#list) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/KeyValueStoreCollectionClientAsync#list)

# Get list of key-value stores

Copy for LLM

```
GET https://api.apify.com/v2/key-value-stores
```

Gets the list of key-value stores owned by the user.

The response is a list of objects, where each objects contains a basic
information about a single key-value store.

The endpoint supports pagination using the `limit` and `offset` parameters
and it will not return more than 1000 array elements.

By default, the records are sorted by the `createdAt` field in ascending
order, therefore you can use pagination to incrementally fetch all key-value stores
while new ones are still being created. To sort the records in descending order, use
the `desc=1` parameter.

## Request [Direct link to request](https://docs.apify.com/api/v2/key-value-stores-get\#request)

### Query Parameters

**offset** double

Number of records that should be skipped at the start. The default value
is `0`.

**Example:** `10`

**limit** double

Maximum number of records to return. The default value as well as the
maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `startedAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

**unnamed** boolean

If `true` or `1` then all the stores are returned. By default, only
named key-value stores are returned.

**Example:** `true`

**ownership** StorageOwnership

**Possible values:** \[`ownedByMe`, `sharedWithMe`\]

Filter by ownership. If this parameter is omitted, all accessible key-value stores are returned.

- `ownedByMe`: Return only key-value stores owned by the user.
- `sharedWithMe`: Return only key-value stores shared with the user by other users.

**Example:** `ownedByMe`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/key-value-stores-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- application/json

- Example (auto)
- Schema

```json
{
  "data": {
    "items": [\
      {\
        "id": "WkzbQMuFYuamGv3YF",\
        "name": "d7b9MDYsbtX5L7XAj",\
        "userId": "BPWDBd7Z9c746JAnF",\
        "username": "janedoe",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-13T08:36:13.202Z",\
        "accessedAt": "2019-12-14T08:36:13.202Z",\
        "actId": null,\
        "actRunId": null\
      },\
      {\
        "id": "YiKoxjkaS9gjGTqhF",\
        "name": "eshop-items",\
        "userId": "BPWDBd7Z9c746JAnF",\
        "username": "janedoe",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-13T08:36:13.202Z",\
        "accessedAt": "2019-12-14T08:36:13.202Z",\
        "actId": null,\
        "actRunId": null\
      }\
    ]
  }
}
```

**Schema**

- **data** objectrequired







Common pagination fields for list responses.





  - **total** integerrequired
    The total number of items available across all pages.

    **Possible values:**`>= 0`


    **Example:** `2`
  - **offset** integerrequired
    The starting position for this page of results.

    **Possible values:**`>= 0`


    **Example:** `0`
  - **limit** integerrequired
    The maximum number of items returned per page.

    **Possible values:**`>= 1`


    **Example:** `1000`
  - **desc** booleanrequired
    Whether the results are sorted in descending order.


    **Example:** `false`
  - **count** integerrequired
    The number of items returned in this response.

    **Possible values:**`>= 0`


    **Example:** `2`
  - **items** object\[\]required









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
apify key-value-stores ls
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/key-value-stores' \
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

offset — query

limit — query

desc — query

\-\-\-truefalse

unnamed — query

\-\-\-truefalse

ownership — query

\-\-\-ownedByMesharedWithMe

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)