---
title: Run task | Apify Documentation
source: https://docs.apify.com/api/v2/actor-task-runs-post
---

[Skip to main content](https://docs.apify.com/api/v2/actor-task-runs-post#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/TaskClient#start) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/TaskClientAsync#call)

# Run task

Copy for LLM

```
POST https://api.apify.com/v2/actor-tasks/:actorTaskId/runs
```

Runs an Actor task and immediately returns without waiting for the run to
finish.

Optionally, you can override the Actor input configuration by passing a JSON
object as the POST payload and setting the `Content-Type: application/json` HTTP header.

Note that if the object in the POST payload does not define a particular
input property, the Actor run uses the default value defined by the task (or Actor's input
schema if not defined by the task).

The response is the Actor Run object as returned by the [Get\\
run](https://docs.apify.com/api/v2/actor-task-runs-post#/reference/actor-runs/run-object-and-its-storages/get-run) endpoint.

If you want to wait for the run to finish and receive the actual output of
the Actor run as the response, use one of the [Run task\\
synchronously](https://docs.apify.com/api/v2/actor-task-runs-post#/reference/actor-tasks/run-task-synchronously) API endpoints
instead.

To fetch the Actor run results that are typically stored in the default
dataset, you'll need to pass the ID received in the `defaultDatasetId` field
received in the response JSON to the
[Get dataset items](https://docs.apify.com/api/v2/actor-task-runs-post#/reference/datasets/item-collection/get-items) API endpoint.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-task-runs-post\#request)

### Path Parameters

**actorTaskId** stringrequired

Task ID or a tilde-separated owner's username and task's name.

**Example:** `janedoe~my-task`

### Query Parameters

**timeout** double

Optional timeout for the run, in seconds. By default, the run uses a
timeout specified in the task settings.

**Example:** `60`

**memory** double

Memory limit for the run, in megabytes. The amount of memory can be set
to a power of 2 with a minimum of 128. By default, the run uses a memory
limit specified in the task settings.

**Example:** `256`

**maxItems** double

Specifies the maximum number of dataset items that will be charged for pay-per-result Actors.
This does NOT guarantee that the Actor will return only this many items.
It only ensures you won't be charged for more than this number of items.
Only works for pay-per-result Actors.
Value can be accessed in the actor run using `ACTOR_MAX_PAID_DATASET_ITEMS` environment variable.

**Example:** `1000`

**maxTotalChargeUsd** double

Specifies the maximum cost of the run. This parameter is
useful for pay-per-event Actors, as it allows you to limit the amount
charged to your subscription. You can access the maximum cost in your Actor
by using the `ACTOR_MAX_TOTAL_CHARGE_USD` environment variable.

**Example:** `5`

**restartOnError** boolean

Determines whether the run will be restarted if it fails.

**Example:** `false`

**build** string

Specifies the Actor build to run. It can be either a build tag or build
number. By default, the run uses the build specified in the task
settings (typically `latest`).

**Example:** `0.1.234`

**waitForFinish** double

The maximum number of seconds the server waits for the run to finish. By
default, it is `0`, the maximum value is `60`.
If the run finishes in time then the returned run object will have a
terminal status (e.g. `SUCCEEDED`),
otherwise it will have a transitional status (e.g. `RUNNING`).

**Example:** `60`

**webhooks** string

Specifies optional webhooks associated with the Actor run, which can be
used to receive a notification
e.g. when the Actor finished or failed. The value is a Base64-encoded
JSON array of objects defining the webhooks.

**Note**: if you already have a webhook set up for the Actor or task,
you do not have to add it again here.

For more information, see [Webhooks documentation](https://docs.apify.com/platform/integrations/webhooks).

**Example:** `dGhpcyBpcyBqdXN0IGV4YW1wbGUK...`

- application/json

### Body **required**

- **object** object

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/actor-task-runs-post\#responses)

- 201
- 400

### Status 201

**Response Headers**

- **Location**

- application/json

- Example
- Schema

```json
{
  "data": {
    "id": "HG7ML7M8z78YcAPEB",
    "actId": "HDSasDasz78YcAPEB",
    "userId": "BPWZBd9V9c746JAnF",
    "actorTaskId": "KJHSKHausidyaJKHs",
    "startedAt": "2019-11-30T07:34:24.202Z",
    "finishedAt": "2019-12-12T09:30:12.202Z",
    "status": "SUCCEEDED",
    "statusMessage": "Actor has finished",
    "isStatusMessageTerminal": true,
    "meta": {
      "origin": "WEB",
      "clientIp": "172.234.12.34",
      "userAgent": "Mozilla/5.0 (iPad)",
      "scheduleId": "dWazFsPpxMigMSqHL",
      "scheduledAt": "2019-06-10T11:40:00.000Z"
    },
    "stats": {
      "inputBodyLen": 240,
      "migrationCount": 0,
      "restartCount": 0,
      "resurrectCount": 2,
      "memAvgBytes": 35914228.4,
      "memMaxBytes": 38244352,
      "memCurrentBytes": 0,
      "cpuAvgUsage": 0.00955965,
      "cpuMaxUsage": 3.15469,
      "cpuCurrentUsage": 0,
      "netRxBytes": 2652,
      "netTxBytes": 1338,
      "durationMillis": 26239,
      "runTimeSecs": 26.239,
      "metamorph": 0,
      "computeUnits": 0.0072886
    },
    "options": {
      "build": "latest",
      "timeoutSecs": 300,
      "memoryMbytes": 1024,
      "diskMbytes": 2048
    },
    "buildId": "7sT5jcggjjA9fNcxF",
    "exitCode": 0,
    "generalAccess": "RESTRICTED",
    "defaultKeyValueStoreId": "eJNzqsbPiopwJcgGQ",
    "defaultDatasetId": "wmKPijuyDnPZAPRMk",
    "defaultRequestQueueId": "FL35cSF7jrxr3BY39",
    "buildNumber": "0.2.2",
    "containerUrl": "https://nwfcc4btrgqt.runs.apify.com",
    "isContainerServerReady": false,
    "gitBranchName": "master",
    "usage": {
      "ACTOR_COMPUTE_UNITS": 3,
      "DATASET_READS": 4,
      "DATASET_WRITES": 4,
      "KEY_VALUE_STORE_READS": 5,
      "KEY_VALUE_STORE_WRITES": 3,
      "KEY_VALUE_STORE_LISTS": 5,
      "REQUEST_QUEUE_READS": 2,
      "REQUEST_QUEUE_WRITES": 1,
      "DATA_TRANSFER_INTERNAL_GBYTES": 1,
      "DATA_TRANSFER_EXTERNAL_GBYTES?": 3,
      "PROXY_RESIDENTIAL_TRANSFER_GBYTES": 34,
      "PROXY_SERPS": 3
    },
    "usageTotalUsd": 0.2654,
    "usageUsd": {
      "ACTOR_COMPUTE_UNITS": 0.072,
      "DATASET_READS": 0.0004,
      "DATASET_WRITES": 0.0002,
      "KEY_VALUE_STORE_READS": 0.0006,
      "KEY_VALUE_STORE_WRITES": 0.002,
      "KEY_VALUE_STORE_LISTS": 0.004,
      "REQUEST_QUEUE_READS": 0.005,
      "REQUEST_QUEUE_WRITES": 0.02,
      "DATA_TRANSFER_INTERNAL_GBYTES": 0.0004,
      "DATA_TRANSFER_EXTERNAL_GBYTES?": 0.0002,
      "PROXY_RESIDENTIAL_TRANSFER_GBYTES": 0.16,
      "PROXY_SERPS": 0.0006
    }
  }
}
```

**Schema**

- **data** objectrequired







Represents an Actor run and its associated data.





  - **id** stringrequired
    Unique identifier of the Actor run.


    **Example:** `HG7ML7M8z78YcAPEB`
  - **actId** stringrequired
    ID of the Actor that was run.


    **Example:** `HDSasDasz78YcAPEB`
  - **userId** stringrequired
    ID of the user who started the run.


    **Example:** `7sT5jcggjjA9fNcxF`
  - **actorTaskId** string \| nullnullable
    ID of the Actor task, if the run was started from a task.


    **Example:** `KJHSKHausidyaJKHs`
  - **startedAt** string<date-time>required
    Time when the Actor run started.


    **Example:** `2019-11-30T07:34:24.202Z`
  - **finishedAt** string,null<date-time>nullable
    Time when the Actor run finished.


    **Example:** `2019-12-12T09:30:12.202Z`
  - **status** ActorJobStatus (string)required
    Status of an Actor job (run or build).

    **Possible values:** \[`READY`, `RUNNING`, `SUCCEEDED`, `FAILED`, `TIMING-OUT`, `TIMED-OUT`, `ABORTING`, `ABORTED`\]

  - **statusMessage** string \| nullnullable
    Detailed message about the run status.


    **Example:** `Actor is running`
  - **isStatusMessageTerminal** boolean \| nullnullable
    Whether the status message is terminal (final).


    **Example:** `false`
  - **meta** objectrequired







    Metadata about the Actor run.





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


  - **pricingInfo** object







    Pricing information for the Actor.









    **pricingModel** PricingModel (string)





    Pricing information for the Actor.







    **Possible values:** \[`PAY_PER_EVENT`, `PRICE_PER_DATASET_ITEM`, `FLAT_PRICE_PER_MONTH`, `FREE`\]













    - PAY\_PER\_EVENT
    - PRICE\_PER\_DATASET\_ITEM
    - FLAT\_PRICE\_PER\_MONTH
    - FREE

**apifyMarginPercentage** numberrequired
In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

**createdAt** string<date-time>required
When this pricing info record has been created

**startedAt** string<date-time>required
Since when is this pricing info record effective for a given Actor

**notifiedAboutFutureChangeAt** string,null<date-time>nullable
**notifiedAboutChangeAt** string,null<date-time>nullable
**reasonForChange** string \| nullnullable
**pricingPerEvent** objectrequired

    - **actorChargeEvents** object





      - **property name\*** ActorChargeEvent





        - **eventPriceUsd** numberrequired
        - **eventTitle** stringrequired
        - **eventDescription** stringrequired

**minimalMaxTotalChargeUsd** number \| nullnullable

**apifyMarginPercentage** numberrequired
In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

**createdAt** string<date-time>required
When this pricing info record has been created

**startedAt** string<date-time>required
Since when is this pricing info record effective for a given Actor

**notifiedAboutFutureChangeAt** string,null<date-time>nullable
**notifiedAboutChangeAt** string,null<date-time>nullable
**reasonForChange** string \| nullnullable
**unitName** stringrequired
Name of the unit that is being charged

**pricePerUnitUsd** numberrequired

**apifyMarginPercentage** numberrequired
In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

**createdAt** string<date-time>required
When this pricing info record has been created

**startedAt** string<date-time>required
Since when is this pricing info record effective for a given Actor

**notifiedAboutFutureChangeAt** string,null<date-time>nullable
**notifiedAboutChangeAt** string,null<date-time>nullable
**reasonForChange** string \| nullnullable
**trialMinutes** integerrequired
For how long this Actor can be used for free in trial period

**pricePerUnitUsd** numberrequired
Monthly flat price in USD

**apifyMarginPercentage** numberrequired
In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

**createdAt** string<date-time>required
When this pricing info record has been created

**startedAt** string<date-time>required
Since when is this pricing info record effective for a given Actor

**notifiedAboutFutureChangeAt** string,null<date-time>nullable
**notifiedAboutChangeAt** string,null<date-time>nullable
**reasonForChange** string \| nullnullable

  - **stats** objectrequired







    Statistics of the Actor run.





    - **inputBodyLen** integer
      **Possible values:**`>= 0`


      **Example:** `240`
    - **migrationCount** integer
      **Possible values:**`>= 0`


      **Example:** `0`
    - **rebootCount** integer
      **Possible values:**`>= 0`


      **Example:** `0`
    - **restartCount** integerrequired
      **Possible values:**`>= 0`


      **Example:** `0`
    - **resurrectCount** integerrequired
      **Possible values:**`>= 0`


      **Example:** `2`
    - **memAvgBytes** number

      **Example:** `267874071.9`
    - **memMaxBytes** integer
      **Possible values:**`>= 0`


      **Example:** `404713472`
    - **memCurrentBytes** integer
      **Possible values:**`>= 0`


      **Example:** `0`
    - **cpuAvgUsage** number

      **Example:** `33.7532101107538`
    - **cpuMaxUsage** number

      **Example:** `169.650735534941`
    - **cpuCurrentUsage** number

      **Example:** `0`
    - **netRxBytes** integer
      **Possible values:**`>= 0`


      **Example:** `103508042`
    - **netTxBytes** integer
      **Possible values:**`>= 0`


      **Example:** `4854600`
    - **durationMillis** integer
      **Possible values:**`>= 0`


      **Example:** `248472`
    - **runTimeSecs** number
      **Possible values:**`>= 0`


      **Example:** `248.472`
    - **metamorph** integer
      **Possible values:**`>= 0`


      **Example:** `0`
    - **computeUnits** numberrequired
      **Possible values:**`>= 0`


      **Example:** `0.13804`

  - **chargedEventCounts** object







    A map of charged event types to their counts. The keys are event type identifiers defined by the Actor's pricing model (pay-per-event), and the values are the number of times each event was charged during this run.





    - **property name\*** integer

  - **options** objectrequired







    Configuration options for the Actor run.





    - **build** stringrequired

      **Example:** `latest`
    - **timeoutSecs** integerrequired
      **Possible values:**`>= 0`


      **Example:** `300`
    - **memoryMbytes** integerrequired
      **Possible values:**`>= 128` and `<= 32768`


      **Example:** `1024`
    - **diskMbytes** integerrequired
      **Possible values:**`>= 0`


      **Example:** `2048`
    - **maxItems** integer
      **Possible values:**`>= 1`


      **Example:** `1000`
    - **maxTotalChargeUsd** number
      **Possible values:**`>= 0`


      **Example:** `5`

  - **buildId** stringrequired
    ID of the Actor build used for this run.


    **Example:** `7sT5jcggjjA9fNcxF`
  - **exitCode** integer \| nullnullable
    Exit code of the Actor run process.


    **Example:** `0`
  - **generalAccess** GeneralAccess (string)required
    General access level for the Actor run.

    **Possible values:** \[`ANYONE_WITH_ID_CAN_READ`, `ANYONE_WITH_NAME_CAN_READ`, `FOLLOW_USER_SETTING`, `RESTRICTED`\]


    **Example:** `RESTRICTED`
  - **defaultKeyValueStoreId** stringrequired
    ID of the default key-value store for this run.


    **Example:** `eJNzqsbPiopwJcgGQ`
  - **defaultDatasetId** stringrequired
    ID of the default dataset for this run.


    **Example:** `wmKPijuyDnPZAPRMk`
  - **defaultRequestQueueId** stringrequired
    ID of the default request queue for this run.


    **Example:** `FL35cSF7jrxr3BY39`
  - **buildNumber** string
    Build number of the Actor build used for this run.


    **Example:** `0.0.36`
  - **containerUrl** string<uri>
    URL of the container running the Actor.


    **Example:** `https://g8kd8kbc5ge8.runs.apify.net`
  - **isContainerServerReady** boolean \| nullnullable
    Whether the container's HTTP server is ready to accept requests.


    **Example:** `true`
  - **gitBranchName** string \| nullnullable
    Name of the git branch used for the Actor build.


    **Example:** `master`
  - **usage** object







    Resource usage statistics for the run.





    anyOf





    - RunUsage
    - null

**ACTOR\_COMPUTE\_UNITS** number \| nullnullable

**Example:** `3`
**DATASET\_READS** integer \| nullnullable

**Example:** `4`
**DATASET\_WRITES** integer \| nullnullable

**Example:** `4`
**KEY\_VALUE\_STORE\_READS** integer \| nullnullable

**Example:** `5`
**KEY\_VALUE\_STORE\_WRITES** integer \| nullnullable

**Example:** `3`
**KEY\_VALUE\_STORE\_LISTS** integer \| nullnullable

**Example:** `5`
**REQUEST\_QUEUE\_READS** integer \| nullnullable

**Example:** `2`
**REQUEST\_QUEUE\_WRITES** integer \| nullnullable

**Example:** `1`
**DATA\_TRANSFER\_INTERNAL\_GBYTES** number \| nullnullable

**Example:** `1`
**DATA\_TRANSFER\_EXTERNAL\_GBYTES?** number \| nullnullable

**Example:** `3`
**PROXY\_RESIDENTIAL\_TRANSFER\_GBYTES** number \| nullnullable

**Example:** `34`
**PROXY\_SERPS** integer \| nullnullable

**Example:** `3`

  - **usageTotalUsd** number \| nullnullable
    Total cost in USD for this run. Represents what you actually pay. For run owners: includes platform usage (compute units) and/or event costs depending on the Actor's pricing model. For run non-owners: only available for Pay-Per-Event Actors (event costs only). Not available for Pay-Per-Result Actors when you're not the Actor owner.


    **Example:** `0.2654`
  - **usageUsd** object







    Platform usage costs breakdown in USD. Only present if you own the run AND are paying for platform usage (Pay-Per-Usage, Rental, or Pay-Per-Event with usage costs like standby Actors). Not available for standard Pay-Per-Event Actors or Pay-Per-Result Actors owned by others.





    anyOf





    - RunUsageUsd
    - null

**ACTOR\_COMPUTE\_UNITS** number \| nullnullable

**Example:** `0.0003`
**DATASET\_READS** number \| nullnullable

**Example:** `0.0001`
**DATASET\_WRITES** number \| nullnullable

**Example:** `0.0001`
**KEY\_VALUE\_STORE\_READS** number \| nullnullable

**Example:** `0.0001`
**KEY\_VALUE\_STORE\_WRITES** number \| nullnullable

**Example:** `0.00005`
**KEY\_VALUE\_STORE\_LISTS** number \| nullnullable

**Example:** `0.0001`
**REQUEST\_QUEUE\_READS** number \| nullnullable

**Example:** `0.0001`
**REQUEST\_QUEUE\_WRITES** number \| nullnullable

**Example:** `0.0001`
**DATA\_TRANSFER\_INTERNAL\_GBYTES** number \| nullnullable

**Example:** `0.001`
**DATA\_TRANSFER\_EXTERNAL\_GBYTES?** number \| nullnullable

**Example:** `0.003`
**PROXY\_RESIDENTIAL\_TRANSFER\_GBYTES** number \| nullnullable

**Example:** `0.034`
**PROXY\_SERPS** number \| nullnullable

**Example:** `0.003`

  - **metamorphs** object







    List of metamorph events that occurred during the run.





    anyOf





    - object\[\]
    - null

**createdAt** string<date-time>required
Time when the metamorph occurred.

**Example:** `2019-11-30T07:39:24.202Z`
**actorId** stringrequired
ID of the Actor that the run was metamorphed to.

**Example:** `nspoEjklmnsF2oosD`
**buildId** stringrequired
ID of the build used for the metamorphed Actor.

**Example:** `ME6oKecqy5kXDS4KQ`
**inputKey** string \| nullnullable
Key of the input record in the key-value store.

**Example:** `INPUT-METAMORPH-1`

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

- Apify CLI

```bash
apify task run <TASK ID>
```

- CURL

```bash
curl -L 'https://api.apify.com/v2/actor-tasks/:actorTaskId/runs' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <token>' \
-d '{}'
```

RequestCollapse all

Base URL

Edit

https://api.apify.com

Auth

Bearer Token

Parameters

actorTaskId — pathrequired

Show optional parameters

timeout — query

memory — query

maxItems — query

maxTotalChargeUsd — query

restartOnError — query

\-\-\-truefalse

build — query

waitForFinish — query

webhooks — query

Body required

- Example (from schema)
- Example

```json
{}
```

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)