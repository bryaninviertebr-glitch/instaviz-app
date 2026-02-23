---
title: Get list of task runs | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-runs-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-runs-get#__docusaurus_skipToContent_fallback)

# Get list of task runs

```
GET /v2/actor-tasks/:actorTaskId/runs
```

Get a list of runs of a specific task. The response is a list of objects,
where each object contains essential information about a single task run.

The endpoint supports pagination using the `limit` and `offset` parameters,
and it does not return more than a 1000 array elements.

By default, the records are sorted by the `startedAt` field in ascending
order; therefore you can use pagination to incrementally fetch all records while
new ones are still being created. To sort the records in descending order, use
the `desc=1` parameter. You can also filter runs by status ( [available\\
statuses](https://docs.apify.com/platform/actors/running/runs-and-builds#lifecycle)).

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-runs-get\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

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

**status** string

Single status or comma-separated list of statuses, see ( [available\\
statuses](https://docs.apify.com/platform/actors/running/runs-and-builds#lifecycle)). Used to filter runs by the specified statuses only.

**Example:** `SUCCEEDED`

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
        "actId": "HDSasDasz78YcAPEB",\
        "actorTaskId": "KJHSKHausidyaJKHs",\
        "status": "SUCCEEDED",\
        "startedAt": "2019-11-30T07:34:24.202Z",\
        "finishedAt": "2019-12-12T09:30:12.202Z",\
        "buildId": "HG7ML7M8z78YcAPEB",\
        "buildNumber": "0.0.2",\
        "meta": {\
          "origin": "WEB"\
        },\
        "usageTotalUsd": 0.2,\
        "defaultKeyValueStoreId": "sfAjeR4QmeJCQzTfe",\
        "defaultDatasetId": "3ZojQDdFTsyE7Moy4",\
        "defaultRequestQueueId": "so93g2shcDzK3pA85"\
      },\
      {\
        "id": "HG7ML7M8z78YcAPEB",\
        "actId": "HDSasDasz78YcAPEB",\
        "actorTaskId": "KJHSKHausidyaJKHs",\
        "status": "FAILED",\
        "startedAt": "2019-12-12T07:34:14.202Z",\
        "finishedAt": "2019-12-13T08:36:13.202Z",\
        "buildId": "u78dML7M8z78YcAPEB",\
        "buildNumber": "0.2.2",\
        "meta": {\
          "origin": "DEVELOPMENT"\
        },\
        "usageTotalUsd": 0.6,\
        "defaultKeyValueStoreId": "sffsouqlseJCQzTfe",\
        "defaultDatasetId": "CFGggdjQDsyE7Moyw",\
        "defaultRequestQueueId": "soowucklrmDzKpA8x"\
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
    - **actId** stringrequired

      **Example:** `HDSasDasz78YcAPEB`
    - **actorTaskId** string \| nullnullable

      **Example:** `KJHSKHausidyaJKHs`
    - **status** ActorJobStatus (string)required
      Status of an Actor job (run or build).

      **Possible values:** \[`READY`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMING-OUT`, `TIMED-OUT`, `ABORTING`, `ABORTED`\]

    - **startedAt** string<date-time>required

      **Example:** `2019-11-30T07:34:24.202Z`
    - **finishedAt** string<date-time>required

      **Example:** `2019-12-12T09:30:12.202Z`
    - **buildId** stringrequired

      **Example:** `HG7ML7M8z78YcAPEB`
    - **buildNumber** string

      **Example:** `0.0.2`
    - **meta** objectrequired





      - **origin** RunOrigin (string)required
        **Possible values:** \[`DEVELOPMENT`, `WEB`, `API`, `SCHEDULER`, `TEST`, `WEBHOOK`, `ACTOR`, `CLI`, `STANDBY`\]

      - **clientIp** string \| nullnullable
        IP address of the client that started the run.

      - **userAgent** string \| nullnullable
        User agent of the client that started the run.

      - **scheduleId** string \| nullnullable
        ID of the schedule that triggered the run.

      - **scheduledAt** string,null<date-time>nullable
        Time when the run was scheduled.


    - **usageTotalUsd** numberrequired

      **Example:** `0.2`
    - **defaultKeyValueStoreId** stringrequired

      **Example:** `sfAjeR4QmeJCQzTfe`
    - **defaultDatasetId** stringrequired

      **Example:** `3ZojQDdFTsyE7Moy4`
    - **defaultRequestQueueId** stringrequired

      **Example:** `so93g2shcDzK3pA85`

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