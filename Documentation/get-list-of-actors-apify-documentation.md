---
title: Get list of Actors | Apify Documentation
source: https://docs.apify.com/api/v2/acts-get
---

[Skip to main content](https://docs.apify.com/api/v2/acts-get#__docusaurus_skipToContent_fallback)

# Get list of Actors

```
GET /v2/acts
```

Gets the list of all Actors that the user created or used. The response is a
list of objects, where each object contains a basic information about a single Actor.

To only get Actors created by the user, add the `my=1` query parameter.

The endpoint supports pagination using the `limit` and `offset` parameters
and it will not return more than 1000 records.

By default, the records are sorted by the `createdAt` field in ascending
order, therefore you can use pagination to incrementally fetch all Actors while new
ones are still being created. To sort the records in descending order, use the `desc=1` parameter.

You can also sort by your last run by using the `sortBy=stats.lastRunStartedAt` query parameter.
In this case, descending order means the most recently run Actor appears first.

## Request [Direct link to request](https://docs.apify.com/api/v2/acts-get\#request)

### Query Parameters

**my** boolean

If `true` or `1` then the returned list only contains Actors owned by the user. The default value is `false`.

**Example:** `true`

**offset** double

Number of records that should be skipped at the start. The default value
is `0`.

**Example:** `10`

**limit** double

Maximum number of records to return. The default value as well as the
maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `createdAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

**sortBy** string

**Possible values:** \[`createdAt`, `stats.lastRunStartedAt`\]

Field to sort the records by. The default is `createdAt`. You can also use `stats.lastRunStartedAt` to sort
by the most recently ran Actors.

**Example:** `createdAt`

### Status 200

**Response Headers**

```json
{
  "data": {
    "total": 2,
    "count": 2,
    "offset": 0,
    "limit": 1000,
    "desc": false,
    "items": [\
      {\
        "id": "br9CKmk457",\
        "createdAt": "2019-10-29T07:34:24.202Z",\
        "modifiedAt": "2019-10-30T07:34:24.202Z",\
        "name": "MyAct",\
        "username": "janedoe"\
      },\
      {\
        "id": "ksiEKo23pz",\
        "createdAt": "2019-11-30T07:34:24.202Z",\
        "modifiedAt": "2019-12-12T07:34:24.202Z",\
        "name": "MySecondAct",\
        "username": "janedoe"\
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

      **Example:** `br9CKmk457`
    - **createdAt** string<date-time>required

      **Example:** `2019-10-29T07:34:24.202Z`
    - **modifiedAt** string<date-time>required

      **Example:** `2019-10-30T07:34:24.202Z`
    - **name** stringrequired

      **Example:** `MyAct`
    - **username** stringrequired

      **Example:** `janedoe`
    - **title** string

      **Example:** `Hello World Example`
    - **stats** object





      anyOf





      - ActorStats
      - null

**totalBuilds** integer

**Example:** `9`
**totalRuns** integer

**Example:** `16`
**totalUsers** integer

**Example:** `6`
**totalUsers7Days** integer

**Example:** `2`
**totalUsers30Days** integer

**Example:** `6`
**totalUsers90Days** integer

**Example:** `6`
**totalMetamorphs** integer

**Example:** `2`
**lastRunStartedAt** string<date-time>

**Example:** `2019-07-08T14:01:05.546Z`

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