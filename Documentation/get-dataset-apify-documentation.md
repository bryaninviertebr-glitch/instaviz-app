---
title: Get dataset | Apify Documentation
source: https://docs.apify.com/api/v2/dataset-get
---

[Skip to main content](https://docs.apify.com/api/v2/dataset-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/DatasetClient#get) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/DatasetClientAsync#get)

# Get dataset

Copy for LLM

```
GET https://api.apify.com/v2/datasets/:datasetId
```

Returns dataset object for given dataset ID.

This does not return dataset items, only information about the storage itself.
To retrieve dataset items, use the [List dataset items](https://docs.apify.com/api/v2/dataset-items-get) endpoint.

note

Keep in mind that attributes `itemCount` and `cleanItemCount` are not propagated right away after data are pushed into a dataset.

There is a short period (up to 5 seconds) during which these counters may not match with exact counts in dataset items.

## Request [Direct link to request](https://docs.apify.com/api/v2/dataset-get\#request)

### Path Parameters

**datasetId** stringrequired

Dataset ID or `username~dataset-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**token** string

API authentication token. It is required only when using the `username~dataset-name` format for `datasetId`.

**Example:** `soSkq9ekdmfOslopH`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/dataset-get\#responses)

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
    "id": "WkzbQMuFYuamGv3YF",
    "name": "d7b9MDYsbtX5L7XAj",
    "userId": "wRsJZtadYvn4mBZmm",
    "createdAt": "2019-12-12T07:34:14.202Z",
    "modifiedAt": "2019-12-13T08:36:13.202Z",
    "accessedAt": "2019-12-14T08:36:13.202Z",
    "itemCount": 7,
    "cleanItemCount": 5,
    "actId": null,
    "actRunId": null,
    "fields": [],
    "consoleUrl": "https://console.apify.com/storage/datasets/WkzbQMuFYuamGv3YF"
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `WkzbQMuFYuamGv3YF`
  - **name** string

    **Example:** `d7b9MDYsbtX5L7XAj`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **createdAt** string<date-time>required

    **Example:** `2019-12-12T07:34:14.202Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2019-12-13T08:36:13.202Z`
  - **accessedAt** string<date-time>required

    **Example:** `2019-12-14T08:36:13.202Z`
  - **itemCount** integerrequired
    **Possible values:**`>= 0`


    **Example:** `7`
  - **cleanItemCount** integerrequired
    **Possible values:**`>= 0`


    **Example:** `5`
  - **actId** string \| nullnullable
  - **actRunId** string \| nullnullable
  - **fields** string\[\]nullable
  - **schema** object \| nullnullable
    Defines the schema of items in your dataset, the full specification can be found in [Apify docs](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema)


    **Example:**`{"actorSpecification":1,"title":"My dataset","views":{"overview":{"title":"Overview","transformation":{"fields":["linkUrl"]},"display":{"component":"table","properties":{"linkUrl":{"label":"Link URL","format":"link"}}}}}}`
  - **consoleUrl** string<uri>required

    **Example:** `https://console.apify.com/storage/datasets/27TmTznX9YPeAYhkC`
  - **itemsPublicUrl** string<uri>
    A public link to access the dataset items directly.


    **Example:** `https://api.apify.com/v2/datasets/WkzbQMuFYuamGv3YF/items?signature=abc123`
  - **urlSigningSecretKey** string \| nullnullable
    A secret key for generating signed public URLs. It is only provided to clients with WRITE permission for the dataset.

  - **generalAccess** GeneralAccess (string)
    Defines the general access level for the resource.

    **Possible values:** \[`ANYONE_WITH_ID_CAN_READ`, `ANYONE_WITH_NAME_CAN_READ`, `FOLLOW_USER_SETTING`, `RESTRICTED`\]


    **Example:** `RESTRICTED`
  - **stats** object





    - **readCount** integerrequired

      **Example:** `22`
    - **writeCount** integerrequired

      **Example:** `3`
    - **storageBytes** integerrequired

      **Example:** `783`

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

- CURL

```bash
curl -L 'https://api.apify.com/v2/datasets/:datasetId' \
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

datasetId — pathrequired

Show optional parameters

token — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)