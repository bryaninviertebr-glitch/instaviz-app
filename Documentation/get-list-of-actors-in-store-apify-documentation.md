---
title: Get list of Actors in store | Apify Documentation
source: https://docs.apify.com/api/v2/store-get
---

[Skip to main content](https://docs.apify.com/api/v2/store-get#__docusaurus_skipToContent_fallback)

# Get list of Actors in store

Copy for LLM

```
GET https://api.apify.com/v2/store
```

Gets the list of public Actors in Apify Store. You can use `search`
parameter to search Actors by string in title, name, description, username
and readme.
If you need detailed info about a specific Actor, use the [Get\\
Actor](https://docs.apify.com/api/v2/store-get#/reference/actors/actor-object/get-actor) endpoint.

The endpoint supports pagination using the `limit` and `offset` parameters.
It will not return more than 1,000 records.

## Request [Direct link to request](https://docs.apify.com/api/v2/store-get\#request)

### Query Parameters

**limit** double

Maximum number of elements to return. The default and maximum value is
`1,000`.

**Example:** `99`

**offset** double

Number of elements that should be skipped at the start. The default
value is `0`.

**Example:** `10`

**search** string

String to search by. The search runs on the following fields: `title`,
`name`, `description`, `username`, `readme`.

**Example:** `web scraper`

**sortBy** string

Specifies the field by which to sort the results. The supported values
are `relevance` (default), `popularity`, `newest` and `lastUpdate`.

**Example:**`'popularity'`

**category** string

Filters the results by the specified category.

**Example:**`'AI'`

**username** string

Filters the results by the specified username.

**Example:**`'apify'`

**pricingModel** string

**Possible values:** \[`FREE`, `FLAT_PRICE_PER_MONTH`, `PRICE_PER_DATASET_ITEM`, `PAY_PER_EVENT`\]

Only return Actors with the specified pricing model.

**Example:** `FREE`

**allowsAgenticUsers** boolean

If true, only return Actors that allow agentic users. If false, only
return Actors that do not allow agentic users.

**Example:** `true`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/store-get\#responses)

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
    "total": 100,
    "offset": 0,
    "limit": 1000,
    "desc": false,
    "count": 1,
    "items": [\
      {\
        "id": "zdc3Pyhyz3m8vjDeM",\
        "title": "My Public Actor",\
        "name": "my-public-actor",\
        "username": "jane35",\
        "userFullName": "Jane Doe",\
        "description": "My public Actor!",\
        "pictureUrl": "https://...",\
        "userPictureUrl": "https://...",\
        "url": "https://...",\
        "stats": {\
          "totalBuilds": 9,\
          "totalRuns": 16,\
          "totalUsers": 6,\
          "totalUsers7Days": 2,\
          "totalUsers30Days": 6,\
          "totalUsers90Days": 6,\
          "totalMetamorphs": 2,\
          "lastRunStartedAt": "2019-07-08T14:01:05.546Z"\
        },\
        "currentPricingInfo": {\
          "pricingModel": "FREE"\
        },\
        "isWhiteListedForAgenticPayment": true\
      },\
      {\
        "id": "zdc3Pyhyz3m8vjDeM",\
        "title": "My Public Actor",\
        "name": "my-public-actor",\
        "username": "jane35",\
        "userFullName": "Jane H. Doe",\
        "categories": [\
          "MARKETING",\
          "LEAD_GENERATION"\
        ],\
        "description": "My public Actor!",\
        "pictureUrl": "https://...",\
        "userPictureUrl": "https://...",\
        "url": "https://...",\
        "stats": {\
          "totalBuilds": 9,\
          "totalRuns": 16,\
          "totalUsers": 6,\
          "totalUsers7Days": 2,\
          "totalUsers30Days": 6,\
          "totalUsers90Days": 6,\
          "totalMetamorphs": 2,\
          "lastRunStartedAt": "2019-07-08T14:01:05.546Z"\
        },\
        "currentPricingInfo": {\
          "pricingModel": "FREE"\
        },\
        "isWhiteListedForAgenticPayment": false\
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

      **Example:** `zdc3Pyhyz3m8vjDeM`
    - **title** stringrequired

      **Example:** `My Public Actor`
    - **name** stringrequired

      **Example:** `my-public-actor`
    - **username** stringrequired

      **Example:** `jane35`
    - **userFullName** stringrequired

      **Example:** `Jane H. Doe`
    - **description** stringrequired

      **Example:** `My public actor!`
    - **categories** string\[\]

      **Example:**`["MARKETING","LEAD_GENERATION"]`
    - **notice** string
    - **pictureUrl** string,null<uri>nullable

      **Example:** `https://...`
    - **userPictureUrl** string,null<uri>nullable

      **Example:** `https://...`
    - **url** string,null<uri>nullable

      **Example:** `https://...`
    - **stats** objectrequired





      - **totalBuilds** integer

        **Example:** `9`
      - **totalRuns** integer

        **Example:** `16`
      - **totalUsers** integer

        **Example:** `6`
      - **totalUsers7Days** integer

        **Example:** `2`
      - **totalUsers30Days** integer

        **Example:** `6`
      - **totalUsers90Days** integer

        **Example:** `6`
      - **totalMetamorphs** integer

        **Example:** `2`
      - **lastRunStartedAt** string<date-time>

        **Example:** `2019-07-08T14:01:05.546Z`

    - **currentPricingInfo** objectrequired





      - **pricingModel** stringrequired

        **Example:** `FREE`

    - **isWhiteListedForAgenticPayment** boolean \| nullnullable
      Whether the Actor is whitelisted for agentic payment processing.

    - **readmeSummary** string
      A brief, LLM-generated readme summary


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
curl -L 'https://api.apify.com/v2/store' \
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

limit — query

offset — query

search — query

sortBy — query

category — query

username — query

pricingModel — query

\-\-\-FREEFLAT\_PRICE\_PER\_MONTHPRICE\_PER\_DATASET\_ITEMPAY\_PER\_EVENT

allowsAgenticUsers — query

\-\-\-truefalse

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)