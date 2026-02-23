---
title: Get public user data | Apify Documentation
source: https://docs.apify.com/api/v2/user-get
---

[Skip to main content](https://docs.apify.com/api/v2/user-get#__docusaurus_skipToContent_fallback)

# Get public user data

```
GET /v2/users/:userId
```

Returns public information about a specific user account, similar to what
can be seen on public profile pages (e.g. [https://apify.com/apify](https://apify.com/apify)).

This operation requires no authentication token.

## Request [Direct link to request](https://docs.apify.com/api/v2/user-get\#request)

### Path Parameters

**userId** stringrequired

User ID or username.

**Example:** `HGzIk8z78YcAPEB`

### Status 200

**Response Headers**

```json
{
  "data": {
    "username": "d7b9MDYsbtX5L7XAj",
    "profile": {
      "bio": "I started web scraping in 1985 using Altair BASIC.",
      "name": "Jane Doe",
      "pictureUrl": "https://apify.com/img/anonymous_user_picture.png",
      "githubUsername": "torvalds.",
      "websiteUrl": "http://www.example.com",
      "twitterUsername": "@BillGates"
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **username** stringrequired

    **Example:** `d7b9MDYsbtX5L7XAj`
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