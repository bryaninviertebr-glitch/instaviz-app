---
title: Store items | Apify Documentation
source: https://docs.apify.com/api/v2/dataset-items-post
---

[Skip to main content](https://docs.apify.com/api/v2/dataset-items-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/DatasetClient#pushItems) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/DatasetClientAsync#push_items)

# Store items

Copy for LLM

```
POST https://api.apify.com/v2/datasets/:datasetId/items
```

Appends an item or an array of items to the end of the dataset.
The POST payload is a JSON object or a JSON array of objects to save into the dataset.

If the data you attempt to store in the dataset is invalid (meaning any of the items received by the API fails the validation), the whole request is discarded and the API will return a response with status code 400.
For more information about dataset schema validation, see [Dataset schema](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema/validation).

**IMPORTANT:** The limit of request payload size for the dataset is 5 MB. If the array exceeds the size, you'll need to split it into a number of smaller arrays.

## Request [Direct link to request](https://docs.apify.com/api/v2/dataset-items-post\#request)

### Path Parameters

**datasetId** stringrequired

Dataset ID or `username~dataset-name`.

**Example:** `WkzbQMuFYuamGv3YF`

- application/json

### Body array **required**

- **property name\*** any
The request body containing the item(s) to add to the dataset. Can be a single
object or an array of objects. Each object represents one dataset item.


**Example:**`{"title":"Example Item","url":"https://example.com","price":19.99}`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/dataset-items-post\#responses)

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

**Example:**`{}`

### Status 400

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "schema-validation-error",
    "message": "Schema validation failed",
    "data": {
      "invalidItems": [\
        {\
          "itemPosition": 2,\
          "validationErrors": [\
            {\
              "instancePath": "/1/stringField",\
              "schemaPath": "/items/properties/stringField/type",\
              "keyword": "type",\
              "params": {\
                "type": "string"\
              },\
              "message": "must be string"\
            }\
          ]\
        }\
      ]
    }
  }
}
```

**Schema**

**error** objectrequired

- **type** string
The type of the error.


**Example:** `schema-validation-error`
- **message** string
A human-readable message describing the error.


**Example:** `Schema validation failed`
- **data** object





  - **invalidItems** object\[\]required







    A list of invalid items in the received array of items.









    - **itemPosition** integer
      The position of the invalid item in the array.


      **Example:** `2`
    - **validationErrors** object\[\]







      A complete list of AJV validation error objects for the invalid item.









      - **instancePath** string
        The path to the instance being validated.

      - **schemaPath** string
        The path to the schema that failed the validation.

      - **keyword** string
        The validation keyword that caused the error.

      - **message** string
        A message describing the validation error.

      - **params** object
        Additional parameters specific to the validation error.


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
apify datasets push-items <DATASET ID> '{ "foo": "bar" }'
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/datasets/:datasetId/items' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '[\
  {\
    "foo": "bar"\
  },\
  {\
    "foo": "hotel"\
  },\
  {\
    "foo": "restaurant"\
  }\
]'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

datasetId — pathrequired

Body required

- Example (from schema)
- Example

```json
[\
  {\
    "foo": "bar"\
  },\
  {\
    "foo": "hotel"\
  },\
  {\
    "foo": "restaurant"\
  }\
]
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)