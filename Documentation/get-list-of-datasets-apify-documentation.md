---
title: Get list of datasets | Apify Documentation
source: https://docs.apify.com/api/v2/datasets-get
---

[Skip to main content](https://docs.apify.com/api/v2/datasets-get#__docusaurus_skipToContent_fallback)

# Get list of datasets

```
GET /v2/datasets
```

Lists all of a user's datasets.

The response is a JSON array of objects,
where each object contains basic information about one dataset.

By default, the objects are sorted by the `createdAt` field in ascending
order, therefore you can use pagination to incrementally fetch all datasets while new
ones are still being created. To sort them in descending order, use `desc=1`
parameter. The endpoint supports pagination using `limit` and `offset`
parameters and it will not return more than 1000 array elements.

## Request [Direct link to request](https://docs.apify.com/api/v2/datasets-get\#request)

### Query Parameters

**offset** double

Number of array elements that should be skipped at the start. The default value is `0`.

**Example:** `10`

**limit** double

Maximum number of array elements to return. The default value as well as the maximum is `1000`.

**Example:** `99`

**desc** boolean

If `true` or `1` then the objects are sorted by the `startedAt` field in
descending order. By default, they are sorted in ascending order.

**Example:** `true`

**unnamed** boolean

If `true` or `1` then unnamed datasets are displayed. For performance reasons, both named and unnamed datasets that are empty will not be shown when this parameter is enabled. By default only named datasets are returned.

**Example:** `true`

**ownership** StorageOwnership

**Possible values:** \[`ownedByMe`, `sharedWithMe`\]

Filter by ownership. If this parameter is omitted, all accessible datasets are returned.

- `ownedByMe`: Return only datasets owned by the user.
- `sharedWithMe`: Return only datasets shared with the user by other users.

**Example:** `ownedByMe`

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
        "id": "wkzbqmufyuamgv3yf",\
        "name": "d7b9mdysbtx5l7xaj",\
        "userId": "tbXmWu7GCxnyYtSiL",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-13T08:36:13.202Z",\
        "accessedAt": "2019-12-14T08:36:13.202Z",\
        "itemCount": 7,\
        "cleanItemCount": 5,\
        "actId": null,\
        "actRunId": null\
      },\
      {\
        "id": "YiKoxjkaS9gjGTqhF",\
        "name": "eshop-items",\
        "userId": "tbXmWu7GCxnyYtSiL",\
        "createdAt": "2019-12-12T07:34:14.202Z",\
        "modifiedAt": "2019-12-13T08:36:13.202Z",\
        "accessedAt": "2019-12-14T08:36:13.202Z",\
        "itemCount": 2,\
        "cleanItemCount": 2,\
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
    - **name** stringrequired

      **Example:** `d7b9MDYsbtX5L7XAj`
    - **userId** stringrequired

      **Example:** `tbXmWu7GCxnyYtSiL`
    - **createdAt** string<date-time>required

      **Example:** `2019-12-12T07:34:14.202Z`
    - **modifiedAt** string<date-time>required

      **Example:** `2019-12-13T08:36:13.202Z`
    - **accessedAt** string<date-time>required

      **Example:** `2019-12-14T08:36:13.202Z`
    - **itemCount** integerrequired

      **Example:** `7`
    - **cleanItemCount** integerrequired

      **Example:** `5`
    - **actId** string \| nullnullable
    - **actRunId** string \| nullnullable

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