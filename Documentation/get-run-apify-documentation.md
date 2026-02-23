---
title: Get run | Apify Documentation
source: https://docs.apify.com/api/v2/actor-run-get
---

[Skip to main content](https://docs.apify.com/api/v2/actor-run-get#__docusaurus_skipToContent_fallback)

# Get run

```
GET /v2/actor-runs/:runId
```

This is not a single endpoint, but an entire group of endpoints that lets
you retrieve the run or any of its default storages.

The endpoints accept the same HTTP methods and query parameters as
the respective storage endpoints.

The base path that represents the Actor run object is:

`/v2/actor-runs/{runId}{?token}`

In order to access the default storages of the Actor run, i.e. log,
key-value store, dataset and request queue, use the following endpoints:

- `/v2/actor-runs/{runId}/log{?token}`
- `/v2/actor-runs/{runId}/key-value-store{?token}`
- `/v2/actor-runs/{runId}/dataset{?token}`
- `/v2/actor-runs/{runId}/request-queue{?token}`

These API endpoints have the same usage as the equivalent storage endpoints.

For example, `/v2/actor-runs/{runId}/key-value-store` has the same HTTP method and
parameters as the [Key-value store object](https://docs.apify.com/api/v2/actor-run-get#/reference/key-value-stores/store-object) endpoint.

Additionally, each of the above API endpoints supports all sub-endpoints
of the original one:

#### Log [Direct link to Log](https://docs.apify.com/api/v2/actor-run-get\#log)

- `/v2/actor-runs/{runId}/log` [Log](https://docs.apify.com/api/v2/actor-run-get#/reference/logs)

#### Key-value store [Direct link to Key-value store](https://docs.apify.com/api/v2/actor-run-get\#key-value-store)

- `/v2/actor-runs/{runId}/key-value-store/keys{?token}` [Key\\
collection](https://docs.apify.com/api/v2/actor-run-get#/reference/key-value-stores/key-collection)
- `/v2/actor-runs/{runId}/key-value-store/records/{recordKey}{?token}` [Record](https://docs.apify.com/api/v2/actor-run-get#/reference/key-value-stores/record)

#### Dataset [Direct link to Dataset](https://docs.apify.com/api/v2/actor-run-get\#dataset)

- `/v2/actor-runs/{runId}/dataset/items{?token}` [Item\\
collection](https://docs.apify.com/api/v2/actor-run-get#/reference/datasets/item-collection)

#### Request queue [Direct link to Request queue](https://docs.apify.com/api/v2/actor-run-get\#request-queue)

- `/v2/actor-runs/{runId}/request-queue/requests{?token}` [Request\\
collection](https://docs.apify.com/api/v2/actor-run-get#/reference/request-queues/request-collection)
- `/v2/actor-runs/{runId}/request-queue/requests/{requestId}{?token}` [Request collection](https://docs.apify.com/api/v2/actor-run-get#/reference/request-queues/request)
- `/v2/actor-runs/{runId}/request-queue/head{?token}` [Queue\\
head](https://docs.apify.com/api/v2/actor-run-get#/reference/request-queues/queue-head)

For example, to download data from a dataset of the Actor run in XML format,
send HTTP GET request to the following URL:

```typescript
https://api.apify.com/v2/actor-runs/{runId}/dataset/items?format=xml
```

In order to save new items to the dataset, send HTTP POST request with JSON
payload to the same URL.

Gets an object that contains all the details about a
specific run of an Actor.

By passing the optional `waitForFinish` parameter the API endpoint will synchronously wait
for the run to finish. This is useful to avoid periodic polling when waiting for Actor run to complete.

This endpoint does not require the authentication token. Instead, calls are authenticated using a hard-to-guess ID of the run. However,
if you access the endpoint without the token, certain attributes, such as `usageUsd` and `usageTotalUsd`, will be hidden.

## Request [Direct link to request](https://docs.apify.com/api/v2/actor-run-get\#request)

### Path Parameters

**runId** stringrequired

Run ID.

**Example:** `3KH8gEpp4d8uQSe8T`

### Query Parameters

**waitForFinish** double

The maximum number of seconds the server waits for the run to finish. By
default it is `0`, the maximum value is `60`.
If the run finishes in time then the returned run object will have a terminal status (e.g. `SUCCEEDED`),
otherwise it will have a transitional status (e.g. `RUNNING`).

**Example:** `60`

### Status 200

**Response Headers**

```json
{
  "data": {
    "id": "HG7ML7M8z78YcAPEB",
    "actId": "HDSasDasz78YcAPEB",
    "userId": "7sT5jcggjjA9fNcxF",
    "actorTaskId": "KJHSKHausidyaJKHs",
    "startedAt": "2019-11-30T07:34:24.202Z",
    "finishedAt": "2019-12-12T09:30:12.202Z",
    "status": "RUNNING",
    "statusMessage": "Actor is running",
    "isStatusMessageTerminal": false,
    "meta": {
      "origin": "WEB",
      "clientIp": "172.234.12.34",
      "userAgent": "Mozilla/5.0 (iPad)"
    },
    "stats": {
      "inputBodyLen": 240,
      "migrationCount": 0,
      "restartCount": 0,
      "resurrectCount": 2,
      "memAvgBytes": 267874071.9,
      "memMaxBytes": 404713472,
      "memCurrentBytes": 0,
      "cpuAvgUsage": 33.75321011075384,
      "cpuMaxUsage": 169.65073553494125,
      "cpuCurrentUsage": 0,
      "netRxBytes": 103508042,
      "netTxBytes": 4854600,
      "durationMillis": 248472,
      "runTimeSecs": 248.472,
      "metamorph": 0,
      "computeUnits": 0.13804
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
    "buildNumber": "0.0.36",
    "containerUrl": "https://g8kd8kbc5ge8.runs.apify.net",
    "isContainerServerReady": true,
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

**data** objectrequired

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









**pricingModel**





Pricing information for the Actor.







**Possible values:** \[`PAY_PER_EVENT`, `PRICE_PER_DATASET_ITEM`, `FLAT_PRICE_PER_MONTH`, `FREE`\]









  - **PAY\_PER\_EVENT**
    - **apifyMarginPercentage** numberrequired
      In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

    - **createdAt** string<date-time>required
      When this pricing info record has been created

    - **startedAt** string<date-time>required
      Since when is this pricing info record effective for a given Actor

    - **notifiedAboutFutureChangeAt** string,null<date-time>nullable
    - **notifiedAboutChangeAt** string,null<date-time>nullable
    - **reasonForChange** string \| nullnullable
    - **pricingPerEvent** objectrequired





      - **actorChargeEvents** object





        - **property name\*** ActorChargeEvent





          - **eventPriceUsd** numberrequired
          - **eventTitle** stringrequired
          - **eventDescription** stringrequired

    - **minimalMaxTotalChargeUsd** number \| nullnullable
  - **PRICE\_PER\_DATASET\_ITEM**
    - **apifyMarginPercentage** numberrequired
      In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

    - **createdAt** string<date-time>required
      When this pricing info record has been created

    - **startedAt** string<date-time>required
      Since when is this pricing info record effective for a given Actor

    - **notifiedAboutFutureChangeAt** string,null<date-time>nullable
    - **notifiedAboutChangeAt** string,null<date-time>nullable
    - **reasonForChange** string \| nullnullable
    - **unitName** stringrequired
      Name of the unit that is being charged

    - **pricePerUnitUsd** numberrequired
  - **FLAT\_PRICE\_PER\_MONTH**
    - **apifyMarginPercentage** numberrequired
      In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

    - **createdAt** string<date-time>required
      When this pricing info record has been created

    - **startedAt** string<date-time>required
      Since when is this pricing info record effective for a given Actor

    - **notifiedAboutFutureChangeAt** string,null<date-time>nullable
    - **notifiedAboutChangeAt** string,null<date-time>nullable
    - **reasonForChange** string \| nullnullable
    - **trialMinutes** integerrequired
      For how long this Actor can be used for free in trial period

    - **pricePerUnitUsd** numberrequired
      Monthly flat price in USD
  - **FREE**
    - **apifyMarginPercentage** numberrequired
      In \[0, 1\], fraction of pricePerUnitUsd that goes to Apify

    - **createdAt** string<date-time>required
      When this pricing info record has been created

    - **startedAt** string<date-time>required
      Since when is this pricing info record effective for a given Actor

    - **notifiedAboutFutureChangeAt** string,null<date-time>nullable
    - **notifiedAboutChangeAt** string,null<date-time>nullable
    - **reasonForChange** string \| nullnullable

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