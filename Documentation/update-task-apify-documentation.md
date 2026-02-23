---
title: Update task | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-put
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-put#__docusaurus_skipToContent_fallback)

# Update task

```
PUT /v2/actor-tasks/:actorTaskId
```

Update settings of a task using values specified by an object passed as JSON
in the POST payload.

If the object does not define a specific property, its value is not updated.

The response is the full task object as returned by the
[Get task](https://docs.apify.com/api/v2/actor-task-put#/reference/tasks/task-object/get-task) endpoint.

The request needs to specify the `Content-Type: application/json` HTTP
header!

When providing your API authentication token, we recommend using the
request's `Authorization` header, rather than the URL. ( [More\\
info](https://docs.apify.com/api/v2/actor-task-put#/introduction/authentication)).

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-put\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

### Body **required**

- **id** stringrequired

**Example:** `ZxLNxrRaZrSjuhT9y`
- **userId** stringrequired

**Example:** `BPWZBd7Z9c746JAnF`
- **actId** stringrequired

**Example:** `asADASadYvn4mBZmm`
- **name** stringrequired

**Example:** `my-task`
- **username** string \| nullnullable

**Example:** `janedoe`
- **createdAt** string<date-time>required

**Example:** `2018-10-26T07:23:14.855Z`
- **modifiedAt** string<date-time>required

**Example:** `2018-10-26T13:30:49.578Z`
- **removedAt** string,null<date-time>nullable
- **stats** object





anyOf





  - TaskStats
  - null

**totalRuns** integer

**Example:** `15`

- **options** object





anyOf





  - TaskOptions
  - null

**build** string \| nullnullable

**Example:** `latest`
**timeoutSecs** integer \| nullnullable

**Example:** `300`
**memoryMbytes** integer \| nullnullable

**Example:** `128`
**restartOnError** boolean \| nullnullable

**Example:** `false`

- **input** object





anyOf





  - TaskInput
  - null

object
The input configuration for the Actor task. This is a user-defined JSON object
that will be passed to the Actor when the task is run.

**Example:**`{"startUrls":[{"url":"https://example.com"}],"maxRequestsPerCrawl":100}`

### Status 200

**Response Headers**

```json
{
  "data": {
    "id": "zdc3Pyhyz3m8vjDeM",
    "userId": "wRsJZtadYvn4mBZmm",
    "actId": "asADASadYvn4mBZmm",
    "name": "my-task",
    "username": "janedoe",
    "createdAt": "2018-10-26T07:23:14.855Z",
    "modifiedAt": "2018-10-26T13:30:49.578Z",
    "removedAt": null,
    "stats": {
      "totalRuns": 15
    },
    "options": {
      "build": "latest",
      "timeoutSecs": 300,
      "memoryMbytes": 128
    },
    "input": {
      "hello": "world"
    }
  }
}
```

**Schema**

- **data** objectrequired





  - **id** stringrequired

    **Example:** `zdc3Pyhyz3m8vjDeM`
  - **userId** stringrequired

    **Example:** `wRsJZtadYvn4mBZmm`
  - **actId** stringrequired

    **Example:** `asADASadYvn4mBZmm`
  - **name** stringrequired

    **Example:** `my-task`
  - **username** string \| nullnullable

    **Example:** `janedoe`
  - **createdAt** string<date-time>required

    **Example:** `2018-10-26T07:23:14.855Z`
  - **modifiedAt** string<date-time>required

    **Example:** `2018-10-26T13:30:49.578Z`
  - **removedAt** string,null<date-time>nullable
  - **stats** object





    anyOf





    - TaskStats
    - null

**totalRuns** integer

**Example:** `15`

  - **options** object





    anyOf





    - TaskOptions
    - null

**build** string \| nullnullable

**Example:** `latest`
**timeoutSecs** integer \| nullnullable

**Example:** `300`
**memoryMbytes** integer \| nullnullable

**Example:** `128`
**restartOnError** boolean \| nullnullable

**Example:** `false`

  - **input** object





    anyOf





    - TaskInput
    - null

object
The input configuration for the Actor task. This is a user-defined JSON object
that will be passed to the Actor when the task is run.

**Example:**`{"startUrls":[{"url":"https://example.com"}],"maxRequestsPerCrawl":100}`

  - **standbyUrl** string,null<uri>nullable

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