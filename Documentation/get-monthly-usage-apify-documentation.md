---
title: Get monthly usage | Apify Documentation
source: https://docs.apify.com/api/v2/users-me-usage-monthly-get
---

[Skip to main content](https://docs.apify.com/api/v2/users-me-usage-monthly-get#__docusaurus_skipToContent_fallback)

# Get monthly usage

Copy for LLM

```
GET https://api.apify.com/v2/users/me/usage/monthly
```

Returns a complete summary of your usage for the current usage cycle,
an overall sum, as well as a daily breakdown of usage. It is the same
information you will see on your account's [Billing page](https://console.apify.com/billing#/usage). The information
includes your use of storage, data transfer, and request queue usage.

Using the `date` parameter will show your usage in the usage cycle that
includes that date.

## Request [Direct link to request](https://docs.apify.com/api/v2/users-me-usage-monthly-get\#request)

### Query Parameters

**date** string

Date in the YYYY-MM-DD format.

**Example:** `2020-06-14`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/users-me-usage-monthly-get\#responses)

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
    "usageCycle": {
      "startAt": "2022-10-02T00:00:00.000Z",
      "endAt": "2022-11-01T23:59:59.999Z"
    },
    "monthlyServiceUsage": {},
    "dailyServiceUsages": [\
      {\
        "date": "2022-10-02T00:00:00.000Z",\
        "serviceUsage": {\
          "ACTOR_COMPUTE_UNITS": {\
            "quantity": 60,\
            "baseAmountUsd": 0.00030000000000000003,\
            "baseUnitPriceUsd": 0.000005,\
            "amountAfterVolumeDiscountUsd": 0.00030000000000000003,\
            "priceTiers": []\
          }\
        },\
        "totalUsageCreditsUsd": 0.0474385791970591\
      }\
    ],
    "totalUsageCreditsUsdBeforeVolumeDiscount": 0.786143673840067,
    "totalUsageCreditsUsdAfterVolumeDiscount": 0.786143673840067
  }
}
```

**Schema**

- **data** objectrequired





  - **usageCycle** objectrequired





    - **startAt** string<date-time>required

      **Example:** `2022-10-02T00:00:00.000Z`
    - **endAt** string<date-time>required

      **Example:** `2022-11-01T23:59:59.999Z`

  - **monthlyServiceUsage** objectrequired







    A map of usage item names (e.g., ACTOR\_COMPUTE\_UNITS) to their usage details.





    - **property name\*** UsageItem





      - **quantity** numberrequired

        **Example:** `2.784475`
      - **baseAmountUsd** numberrequired

        **Example:** `0.69611875`
      - **baseUnitPriceUsd** number

        **Example:** `0.25`
      - **amountAfterVolumeDiscountUsd** number

        **Example:** `0.69611875`
      - **priceTiers** object\[\]









        - **quantityAbove** numberrequired

          **Example:** `0`
        - **discountPercent** numberrequired

          **Example:** `100`
        - **tierQuantity** numberrequired

          **Example:** `0.39`
        - **unitPriceUsd** numberrequired

          **Example:** `0`
        - **priceUsd** numberrequired

          **Example:** `0`

  - **dailyServiceUsages** object\[\]required









    - **date** stringrequired

      **Example:** `2022-10-02T00:00:00.000Z`
    - **serviceUsage** objectrequired







      A map of service usage item names to their usage details.





      - **property name\*** UsageItem





        - **quantity** numberrequired

          **Example:** `2.784475`
        - **baseAmountUsd** numberrequired

          **Example:** `0.69611875`
        - **baseUnitPriceUsd** number

          **Example:** `0.25`
        - **amountAfterVolumeDiscountUsd** number

          **Example:** `0.69611875`
        - **priceTiers** object\[\]









          - **quantityAbove** numberrequired

            **Example:** `0`
          - **discountPercent** numberrequired

            **Example:** `100`
          - **tierQuantity** numberrequired

            **Example:** `0.39`
          - **unitPriceUsd** numberrequired

            **Example:** `0`
          - **priceUsd** numberrequired

            **Example:** `0`

    - **totalUsageCreditsUsd** numberrequired

      **Example:** `0.0474385791970591`

  - **totalUsageCreditsUsdBeforeVolumeDiscount** numberrequired

    **Example:** `0.786143673840067`
  - **totalUsageCreditsUsdAfterVolumeDiscount** numberrequired

    **Example:** `0.786143673840067`

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
curl -L 'https://api.apify.com/v2/users/me/usage/monthly' \
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

date — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)