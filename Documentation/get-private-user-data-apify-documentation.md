---
title: Get private user data | Apify Documentation
source: https://docs.apify.com/api/v2/users-me-get
---

[Skip to main content](https://docs.apify.com/api/v2/users-me-get#__docusaurus_skipToContent_fallback)

# Get private user data

```
GET /v2/users/me
```

Returns information about the current user account, including both public
and private information.

The user account is identified by the provided authentication token.

The fields `plan`, `email` and `profile` are omitted when this endpoint is accessed from Actor run.

### Status 200

**Response Headers**

```json
{
  "data": {
    "id": "YiKoxjkaS9gjGTqhF",
    "username": "myusername",
    "profile": {
      "bio": "I started web scraping in 1985 using Altair BASIC.",
      "name": "Jane Doe",
      "pictureUrl": "https://apify.com/img/anonymous_user_picture.png",
      "githubUsername": "torvalds.",
      "websiteUrl": "http://www.example.com",
      "twitterUsername": "@BillGates"
    },
    "email": "bob@example.com",
    "proxy": {
      "password": "ad78knd9Jkjd86",
      "groups": [\
        {\
          "name": "Group1",\
          "description": "Group1 description",\
          "availableCount": 10\
        }\
      ]
    },
    "plan": {
      "id": "Personal",
      "description": "Cost-effective plan for freelancers, developers and students.",
      "isEnabled": true,
      "monthlyBasePriceUsd": 49,
      "monthlyUsageCreditsUsd": 49,
      "usageDiscountPercent": 0,
      "enabledPlatformFeatures": [\
        [\
          "ACTORS"\
        ],\
        [\
          "STORAGE"\
        ],\
        [\
          "PROXY_SERPS"\
        ],\
        [\
          "SCHEDULER"\
        ],\
        [\
          "WEBHOOKS"\
        ]\
      ],
      "maxMonthlyUsageUsd": 9999,
      "maxActorMemoryGbytes": 32,
      "maxMonthlyActorComputeUnits": 1000,
      "maxMonthlyResidentialProxyGbytes": 10,
      "maxMonthlyProxySerps": 30000,
      "maxMonthlyExternalDataTransferGbytes": 1000,
      "maxActorCount": 100,
      "maxActorTaskCount": 1000,
      "dataRetentionDays": 14,
      "availableProxyGroups": {
        "RESIDENTIAL": 1000,
        "DATACENTER": 500,
        "GOOGLE_SERP": 200
      },
      "teamAccountSeatCount": 1,
      "supportLevel": "COMMUNITY",
      "availableAddOns": []
    },
    "effectivePlatformFeatures": {
      "ACTORS": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "STORAGE": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "SCHEDULER": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "PROXY": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "PROXY_EXTERNAL_ACCESS": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "PROXY_RESIDENTIAL": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "PROXY_SERPS": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "WEBHOOKS": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "ACTORS_PUBLIC_ALL": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      },
      "ACTORS_PUBLIC_DEVELOPER": {
        "isEnabled": true,
        "disabledReason": "The \"Selected public Actors for developers\" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com",
        "disabledReasonType": "DISABLED",
        "isTrial": false,
        "trialExpirationAt": "2025-01-01T14:00:00.000Z"
      }
    },
    "createdAt": "2022-11-29T14:48:29.381Z",
    "isPaying": true
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `YiKoxjkaS9gjGTqhF`
  - **username** stringrequired

    **Example:** `myusername`
  - **profile** objectrequired





    - **bio** string

      **Example:** `I started web scraping in 1985 using Altair BASIC.`
    - **name** string

      **Example:** `Jane Doe`
    - **pictureUrl** string<uri>

      **Example:** `https://apify.com/img/anonymous_user_picture.png`
    - **githubUsername** string

      **Example:** `torvalds.`
    - **websiteUrl** string<uri>

      **Example:** `http://www.example.com`
    - **twitterUsername** string

      **Example:**`@BillGates`

  - **email** string<email>required

    **Example:** `bob@example.com`
  - **proxy** objectrequired





    - **password** stringrequired

      **Example:** `ad78knd9Jkjd86`
    - **groups** object\[\]required









      - **name** stringrequired

        **Example:** `Group1`
      - **description** stringrequired

        **Example:** `Group1 description`
      - **availableCount** integerrequired

        **Example:** `10`

  - **plan** objectrequired





    - **id** stringrequired

      **Example:** `Personal`
    - **description** stringrequired

      **Example:** `Cost-effective plan for freelancers, developers and students.`
    - **isEnabled** booleanrequired

      **Example:** `true`
    - **monthlyBasePriceUsd** numberrequired

      **Example:** `49`
    - **monthlyUsageCreditsUsd** numberrequired

      **Example:** `49`
    - **usageDiscountPercent** numberrequired

      **Example:** `0`
    - **enabledPlatformFeatures** array\[\]required

      **Example:**`[["ACTORS"],["STORAGE"],["PROXY_SERPS"],["SCHEDULER"],["WEBHOOKS"]]`
    - **maxMonthlyUsageUsd** numberrequired

      **Example:** `9999`
    - **maxActorMemoryGbytes** numberrequired

      **Example:** `32`
    - **maxMonthlyActorComputeUnits** numberrequired

      **Example:** `1000`
    - **maxMonthlyResidentialProxyGbytes** numberrequired

      **Example:** `10`
    - **maxMonthlyProxySerps** integerrequired

      **Example:** `30000`
    - **maxMonthlyExternalDataTransferGbytes** numberrequired

      **Example:** `1000`
    - **maxActorCount** integerrequired

      **Example:** `100`
    - **maxActorTaskCount** integerrequired

      **Example:** `1000`
    - **dataRetentionDays** integerrequired

      **Example:** `14`
    - **availableProxyGroups** objectrequired







      A dictionary mapping proxy group names to the number of available proxies in each group.
      The keys are proxy group names (e.g., "RESIDENTIAL", "DATACENTER") and values are
      the count of available proxies.





      - **property name\*** integer
        The number of available proxies in this group.


    - **teamAccountSeatCount** integerrequired

      **Example:** `1`
    - **supportLevel** stringrequired

      **Example:** `COMMUNITY`
    - **availableAddOns** string\[\]required

      **Example:**`[]`

  - **effectivePlatformFeatures** objectrequired





    - **ACTORS** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **STORAGE** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **SCHEDULER** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **PROXY** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **PROXY\_EXTERNAL\_ACCESS** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **PROXY\_RESIDENTIAL** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **PROXY\_SERPS** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **WEBHOOKS** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **ACTORS\_PUBLIC\_ALL** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

    - **ACTORS\_PUBLIC\_DEVELOPER** objectrequired





      - **isEnabled** booleanrequired

        **Example:** `true`
      - **disabledReason** string \| nullnullablerequired

        **Example:** `The "Selected public Actors for developers" feature is not enabled for your account. Please upgrade your plan or contact support@apify.com`
      - **disabledReasonType** string \| nullnullablerequired

        **Example:** `DISABLED`
      - **isTrial** booleanrequired

        **Example:** `false`
      - **trialExpirationAt** string,null<date-time>nullablerequired

        **Example:** `2025-01-01T14:00:00.000Z`

  - **createdAt** string<date-time>required

    **Example:** `2022-11-29T14:48:29.381Z`
  - **isPaying** booleanrequired

    **Example:** `true`

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