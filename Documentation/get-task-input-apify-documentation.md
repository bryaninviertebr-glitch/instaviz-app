---
title: Get task input | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-input-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-input-get#__docusaurus_skipToContent_fallback)

# Get task input

```
GET /v2/actor-tasks/:actorTaskId/input
```

Returns the input of a given task.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-input-get\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

### Status 200

**Response Headers**

```json
{
  "myField1": "some-value",
  "myField2": "another-value",
  "myField3": 1
}
```

**Schema**

- **object** object

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