---
title: Create dataset | Apify Documentation
source: https://docs.apify.com/api/v2/datasets-post
---

[Skip to main content](https://docs.apify.com/api/v2/datasets-post#__docusaurus_skipToContent_fallback)

# Create dataset

```
POST /v2/datasets
```

Creates a dataset and returns its object.
Keep in mind that data stored under unnamed dataset follows [data retention period](https://docs.apify.com/platform/storage#data-retention).
It creates a dataset with the given name if the parameter name is used.
If a dataset with the given name already exists then returns its object.

## Request [Direct link to request](https://docs.apify.com/api/v2/datasets-post\#request)

### Query Parameters

**name** string

Custom unique name to easily identify the dataset in the future.

**Example:** `eshop-items`

### Status 201

**Response Headers**

- **Location**

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