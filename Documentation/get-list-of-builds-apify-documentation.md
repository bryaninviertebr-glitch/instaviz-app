---
title: Get list of builds | Apify Documentation
source: https://docs.apify.com/api/v2/act-builds-get
---

[Skip to main content](https://docs.apify.com/api/v2/act-builds-get#__docusaurus_skipToContent_fallback)

# Get list of builds

```
GET /v2/acts/:actorId/builds
```

Gets the list of builds of a specific Actor. The response is a JSON with the
list of objects, where each object contains basic information about a single build.

The endpoint supports pagination using the `limit` and `offset` parameters
and it will not return more than 1000 records.

By default, the records are sorted by the `startedAt` field in ascending order,
therefore you can use pagination to incrementally fetch all builds while new
ones are still being started. To sort the records in descending order, use
the `desc=1` parameter.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-builds-get\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

### Query Parameters

**offset** double

Number of records that should be skipped at the start. The default value is `0`.

**Example:** `10`

**limit** double

Maximum number of records to return. The default value as well as the maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `startedAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

### Status 200

**Response Headers**

```json
{
  "data": {
    "total": 2,
    "offset": 0,
    "limit": 1000,
    "desc": false,
    "count": 2,
    "items": [\
      {\
        "id": "HG7ML7M8z78YcAPEB",\
        "actId": "janedoe~my-actor",\
        "status": "READY",\
        "startedAt": "2019-11-30T07:34:24.202Z",\
        "finishedAt": "2019-12-12T09:30:12.202Z",\
        "usageTotalUsd": 0.02,\
        "meta": {\
          "origin": "DEVELOPMENT",\
          "clientIp": "172.234.12.34",\
          "userAgent": "Mozilla/5.0 (iPad)"\
        }\
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

      **Example:** `HG7ML7M8z78YcAPEB`
    - **actId** string

      **Example:** `janedoe~my-actor`
    - **status** ActorJobStatus (string)required
      Status of an Actor job (run or build).

      **Possible values:** \[`READY`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMING-OUT`, `TIMED-OUT`, `ABORTING`, `ABORTED`\]

    - **startedAt** string<date-time>required

      **Example:** `2019-11-30T07:34:24.202Z`
    - **finishedAt** string<date-time>required

      **Example:** `2019-12-12T09:30:12.202Z`
    - **usageTotalUsd** numberrequired

      **Example:** `0.02`
    - **meta** object





      - **origin** RunOrigin (string)required
        **Possible values:** \[`DEVELOPMENT`, `WEB`, `API`, `SCHEDULER`, `TEST`, `WEBHOOK`, `ACTOR`, `CLI`, `STANDBY`\]

      - **clientIp** string
        IP address of the client that started the build.


        **Example:** `172.234.12.34`
      - **userAgent** string
        User agent of the client that started the build.


        **Example:** `Mozilla/5.0 (iPad)`

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