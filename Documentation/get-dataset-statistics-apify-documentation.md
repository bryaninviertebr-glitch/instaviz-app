---
title: Get dataset statistics | Apify Documentation
source: https://docs.apify.com/api/v2/dataset-statistics-get
---

[Skip to main content](https://docs.apify.com/api/v2/dataset-statistics-get#__docusaurus_skipToContent_fallback)

# Get dataset statistics

```
GET /v2/datasets/:datasetId/statistics
```

Returns statistics for given dataset.

Provides only [field statistics](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema/validation#dataset-field-statistics).

## Request [Direct link to request](https://docs.apify.com/api/v2/dataset-statistics-get\#request)

### Path Parameters

**datasetId** stringrequired

Dataset ID or `username~dataset-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Status 200

```json
{
  "data": {
    "fieldStatistics": {
      "name": {
        "nullCount": 122
      },
      "price": {
        "min": 59,
        "max": 89
      }
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **fieldStatistics** object,null







    When you configure the dataset [fields schema](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema/validation), we measure the statistics such as `min`, `max`, `nullCount` and `emptyCount` for each field. This property provides statistics for each field from dataset fields schema.



    See dataset field statistics [documentation](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema/validation#dataset-field-statistics) for more information.





    - **property name\*** DatasetFieldStatistics





      - **min** number \| nullnullable
        Minimum value of the field. For numbers, this is calculated directly. For strings, this is the length of the shortest string. For arrays, this is the length of the shortest array. For objects, this is the number of keys in the smallest object.

      - **max** number \| nullnullable
        Maximum value of the field. For numbers, this is calculated directly. For strings, this is the length of the longest string. For arrays, this is the length of the longest array. For objects, this is the number of keys in the largest object.

      - **nullCount** integer \| nullnullable
        How many items in the dataset have a null value for this field.

      - **emptyCount** integer \| nullnullable
        How many items in the dataset are `undefined`, meaning that for example empty string is not considered empty.


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