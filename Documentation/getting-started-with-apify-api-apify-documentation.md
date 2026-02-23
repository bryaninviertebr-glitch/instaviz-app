---
title: Getting started with Apify API | Apify Documentation
source: https://docs.apify.com/api/v2/getting-started
---

[Skip to main content](https://docs.apify.com/api/v2/getting-started#__docusaurus_skipToContent_fallback)

On this page

The Apify API provides programmatic access to the [Apify platform](https://docs.apify.com/). The API is organized around [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) HTTP endpoints.

HTTP Client

Apify API

Actor Run

Dataset

Key-Value Store

The diagram illustrates the basic workflow when using the Apify API:

1. Your application communicates with the Apify API by sending requests to run Actors and receiving results back.
2. When you request to run an Actor, the Apify API creates and manages an Actor run instance on the platform.
3. The Actor processes data and stores results in Apify's storage systems:
   - **Dataset**: Structured storage optimized for tabular or list-type data, ideal for scraped items or processed results.
   - **Key-Value Store**: Flexible storage for various data types (including images, JSON, HTML, and text), perfect for configuration settings and non-tabular outputs.

## Prerequisites [Direct link to Prerequisites](https://docs.apify.com/api/v2/getting-started\#prerequisites)

Before you can start using the API, check if you have all the necessary prerequisites:

- An Apify account with an API token.
- A tool to make HTTP requests (cURL, Postman, or your preferred programming language).

## Authentication [Direct link to Authentication](https://docs.apify.com/api/v2/getting-started\#authentication)

You must authenticate all API requests presented on this page. You can authenticate using your API token:

```http

```

You can find your API token in the Apify Console under **[Settings > Integrations](https://console.apify.com/settings/integrations)**.

### Verify your account [Direct link to Verify your account](https://docs.apify.com/api/v2/getting-started\#verify-your-account)

To check your API credentials or account details:

Endpoint

```http
GET https://api.apify.com/v2/users/me
```

Expected response codes:

- `200`

## Basic workflow [Direct link to Basic workflow](https://docs.apify.com/api/v2/getting-started\#basic-workflow)

The most common workflow involving Apify API consists of the following steps:

1. Running an Actor.
2. Retrieving the results.

### 1\. Run an Actor [Direct link to 1. Run an Actor](https://docs.apify.com/api/v2/getting-started\#1-run-an-actor)

#### Synchronously [Direct link to Synchronously](https://docs.apify.com/api/v2/getting-started\#synchronously)

For shorter runs where you need immediate results:

Endpoint

```http
POST https://api.apify.com/v2/acts/:actorId/run-sync
```

Expected response codes:

- `201`
- `400`
- `408`

#### Asynchronously [Direct link to Asynchronously](https://docs.apify.com/api/v2/getting-started\#asynchronously)

For longer-running operations or when you don't need immediate results.

Endpoint

```http
POST https://api.apify.com/v2/acts/:actorId/runs
```

Expected response codes:

- `201`

### 2\. Retrieve results [Direct link to 2. Retrieve results](https://docs.apify.com/api/v2/getting-started\#2-retrieve-results)

#### From a Dataset [Direct link to From a Dataset](https://docs.apify.com/api/v2/getting-started\#from-a-dataset)

Most Actors store their results in a dataset:

Endpoint

```http
GET https://api.apify.com/v2/datasets/:datasetId/items
```

Optional query parameters:

- `format=json`(default), other possible formats are:
  - jsonl
  - xml
  - html
  - csv
  - xlsx
  - rss
- `limit=100` (number of items to retrieve)
- `offset=0` (pagination offset)

Expected response codes:

- `200`

#### From a Key-value store [Direct link to From a Key-value store](https://docs.apify.com/api/v2/getting-started\#from-a-key-value-store)

Endpoint

```http
GET https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey
```

Expected response codes:

- `200`
- `302`

### Additional operations [Direct link to Additional operations](https://docs.apify.com/api/v2/getting-started\#additional-operations)

#### Get log [Direct link to Get log](https://docs.apify.com/api/v2/getting-started\#get-log)

You can get a log for a specific run or build of an Actor.

Endpoint

```http
GET https://api.apify.com/v2/logs/:buildOrRunId
```

Expected response codes:

- `200`

#### Monitor run status [Direct link to Monitor run status](https://docs.apify.com/api/v2/getting-started\#monitor-run-status)

Endpoint

```http
GET https://api.apify.com/v2/actor-runs/:runId
```

Expected response codes:

- `200`

#### Store data in Dataset [Direct link to Store data in Dataset](https://docs.apify.com/api/v2/getting-started\#store-data-in-dataset)

To store your own data in a Dataset:

Endpoint

```http
POST https://api.apify.com/v2/datasets/:datasetId/items
```

If any item in the request fails validation, the entire request will be rejected.

Expected response codes:

- `201`
- `400`

#### Store data in Key-value store [Direct link to Store data in Key-value store](https://docs.apify.com/api/v2/getting-started\#store-data-in-key-value-store)

To store your own data in a Key-value store:

Endpoint

```http
PUT https://api.apify.com/v2/key-value-stores/:storeId/records/:recordKey
```

Include your data in the request body and set the appropriate `Content-Type` header.

Expected response codes:

- `201`

## HTTP Status Code Descriptions [Direct link to HTTP Status Code Descriptions](https://docs.apify.com/api/v2/getting-started\#http-status-code-descriptions)

### `200` OK [Direct link to 200-ok](https://docs.apify.com/api/v2/getting-started\#200-ok)

The request has succeeded.

### `201` Created [Direct link to 201-created](https://docs.apify.com/api/v2/getting-started\#201-created)

The request has been fulfilled and a new resource has been created.

### `302` Found [Direct link to 302-found](https://docs.apify.com/api/v2/getting-started\#302-found)

A redirection response indicating that the requested resource has been temporarily moved to a different URL.

### `400` Bad Request [Direct link to 400-bad-request](https://docs.apify.com/api/v2/getting-started\#400-bad-request)

The server cannot process the request due to client error, such as request syntax, invalid request parameters, or invalid data format. This occurs when:

- The request body contains invalid data
- Required parameters are missing
- Data validation fails for Dataset items

### `408` Request Timeout [Direct link to 408-request-timeout](https://docs.apify.com/api/v2/getting-started\#408-request-timeout)

The server timed out waiting for the request to complete.

## Next steps [Direct link to Next steps](https://docs.apify.com/api/v2/getting-started\#next-steps)

- Explore more advanced API endpoints in our full [API reference](https://docs.apify.com/api/v2).
- Learn about webhooks to get notified when your runs finish.
- Check out Apify client libraries for the following programming languages:
  - [JavaScript](https://docs.apify.com/api/client/js/)
  - [Python](https://docs.apify.com/api/client/python)

- [Prerequisites](https://docs.apify.com/api/v2/getting-started#prerequisites)
- [Authentication](https://docs.apify.com/api/v2/getting-started#authentication)
  - [Verify your account](https://docs.apify.com/api/v2/getting-started#verify-your-account)
- [Basic workflow](https://docs.apify.com/api/v2/getting-started#basic-workflow)
  - [1\. Run an Actor](https://docs.apify.com/api/v2/getting-started#1-run-an-actor)
  - [2\. Retrieve results](https://docs.apify.com/api/v2/getting-started#2-retrieve-results)
  - [Additional operations](https://docs.apify.com/api/v2/getting-started#additional-operations)
- [HTTP Status Code Descriptions](https://docs.apify.com/api/v2/getting-started#http-status-code-descriptions)
  - [`200` OK](https://docs.apify.com/api/v2/getting-started#200-ok)
  - [`201` Created](https://docs.apify.com/api/v2/getting-started#201-created)
  - [`302` Found](https://docs.apify.com/api/v2/getting-started#302-found)
  - [`400` Bad Request](https://docs.apify.com/api/v2/getting-started#400-bad-request)
  - [`408` Request Timeout](https://docs.apify.com/api/v2/getting-started#408-request-timeout)
- [Next steps](https://docs.apify.com/api/v2/getting-started#next-steps)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)