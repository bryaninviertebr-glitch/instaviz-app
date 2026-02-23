---
title: Run Actor synchronously with input and get dataset items | Apify Documentation
source: https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post
---

[Skip to main content](https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post#__docusaurus_skipToContent_fallback)

# Run Actor synchronously with input and get dataset items

Copy for LLM

```
POST https://api.apify.com/v2/acts/:actorId/run-sync-get-dataset-items
```

Runs a specific Actor and returns its dataset items.

The POST payload including its `Content-Type` header is passed as `INPUT` to
the Actor (usually `application/json`).
The HTTP response contains the Actors dataset items, while the format of
items depends on specifying dataset items' `format` parameter.

You can send all the same options in parameters as the [Get Dataset\\
Items](https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post#/reference/datasets/item-collection/get-items) API endpoint.

The Actor is started with the default options; you can override them using
URL query parameters.
If the Actor run exceeds 300 seconds,
the HTTP response will return the 408 status code (Request Timeout).

Beware that it might be impossible to maintain an idle HTTP connection for a
long period of time,
due to client timeout or network conditions. Make sure your HTTP client is
configured to have a long enough connection timeout.
If the connection breaks, you will not receive any information about the run
and its status.

To run the Actor asynchronously, use the [Run\\
Actor](https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post#/reference/actors/run-collection/run-actor) API endpoint instead.

## Request [Direct link to request](https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post\#request)

### Path Parameters

**actorId** stringrequired

Actor ID or a tilde-separated owner's username and Actor name.

**Example:** `janedoe~my-actor`

### Query Parameters

**timeout** double

Optional timeout for the run, in seconds. By default, the run uses a
timeout specified in the default run configuration for the Actor.

**Example:** `60`

**memory** double

Memory limit for the run, in megabytes. The amount of memory can be set
to a power of 2 with a minimum of 128. By default, the run uses a memory
limit specified in the default run configuration for the Actor.

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
number. By default, the run uses the build specified in the default run
configuration for the Actor (typically `latest`).

**Example:** `0.1.234`

**webhooks** string

Specifies optional webhooks associated with the Actor run, which can be
used to receive a notification
e.g. when the Actor finished or failed. The value is a Base64-encoded
JSON array of objects defining the webhooks. For more information, see
[Webhooks documentation](https://docs.apify.com/platform/integrations/webhooks).

**Example:** `dGhpcyBpcyBqdXN0IGV4YW1wbGUK...`

**format** string

Format of the results, possible values are: `json`, `jsonl`, `csv`,
`html`, `xlsx`, `xml` and `rss`. The default value is `json`.

**Example:** `json`

**clean** boolean

If `true` or `1` then the API endpoint returns only non-empty items and
skips hidden fields (i.e. fields starting with the # character).
The `clean` parameter is just a shortcut for `skipHidden=true` and
`skipEmpty=true` parameters.
Note that since some objects might be skipped from the output, that the
result might contain less items than the `limit` value.

**Example:** `false`

**offset** double

Number of items that should be skipped at the start. The default value
is `0`.

**Example:** `0`

**limit** double

Maximum number of items to return. By default there is no limit.

**Example:** `99`

**fields** string

A comma-separated list of fields which should be picked from the items,
only these fields will remain in the resulting record objects.
Note that the fields in the outputted items are sorted the same way as
they are specified in the `fields` query parameter.
You can use this feature to effectively fix the output format.

**Example:** `myValue,myOtherValue`

**omit** string

A comma-separated list of fields which should be omitted from the items.

**Example:** `myValue,myOtherValue`

**unwind** string

A comma-separated list of fields which should be unwound, in order which
they should be processed. Each field should be either an array or an object.
If the field is an array then every element of
the array will become a separate record and merged with parent object.
If the unwound field is an object then it is merged with the parent object.
If the unwound field is missing or its value is neither an array nor an
object and therefore cannot be merged with a parent object then the item
gets preserved as it is.
Note that the unwound items ignore the `desc` parameter.

**Example:** `myValue,myOtherValue`

**flatten** string

A comma-separated list of fields which should transform nested objects
into flat structures.
For example, with `flatten="foo"` the object `{"foo":{"bar": "hello"}}`
is turned into `{"foo.bar": "hello"}`.
The original object with properties is replaced with the flattened
object.

**Example:** `myValue`

**desc** boolean

By default, results are returned in the same order as they were stored.
To reverse the order, set this parameter to `true` or `1`.

**Example:** `true`

**attachment** boolean

If `true` or `1` then the response will define the `Content-Disposition: attachment` header, forcing a web browser to download the file rather
than to display it. By default this header is not present.

**Example:** `true`

**delimiter** string

A delimiter character for CSV files, only used if `format=csv`. You
might need to URL-encode the character (e.g. use `%09` for tab or `%3B`
for semicolon). The default delimiter is a simple comma (`,`).

**Example:**`;`

**bom** boolean

All text responses are encoded in UTF-8 encoding. By default, the
`format=csv` files are prefixed with
the UTF-8 Byte Order Mark (BOM), while `json`, `jsonl`, `xml`, `html`
and `rss` files are not.
If you want to override this default behavior, specify `bom=1` query
parameter to include the BOM or `bom=0` to skip it.

**Example:** `false`

**xmlRoot** string

Overrides default root element name of `xml` output. By default the root
element is `items`.

**Example:** `items`

**xmlRow** string

Overrides default element name that wraps each page or page function
result object in `xml` output. By default the element name is `item`.

**Example:** `item`

**skipHeaderRow** boolean

If `true` or `1` then header row in the `csv` format is skipped.

**Example:** `true`

**skipHidden** boolean

If `true` or `1` then hidden fields are skipped from the output,
i.e. fields starting with the `#` character.

**Example:** `false`

**skipEmpty** boolean

If `true` or `1` then empty items are skipped from the output.

Note that if used, the results might contain less items than the limit
value.

**Example:** `false`

**simplified** boolean

If `true` or `1` then, the endpoint applies the
`fields=url,pageFunctionResult,errorInfo`
and `unwind=pageFunctionResult` query parameters. This feature is used
to emulate simplified results provided by the
legacy Apify Crawler product and it's not recommended to use it in new
integrations.

**Example:** `false`

**skipFailedPages** boolean

If `true` or `1` then, the all the items with errorInfo property will be
skipped from the output.
This feature is here to emulate functionality of API version 1 used for
the legacy Apify Crawler product and it's not recommended to use it in
new integrations.

**Example:** `false`

- application/json

### Body **required**

- **object** object

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/act-run-sync-get-dataset-items-post\#responses)

- 201
- 400
- 408

### Status 201

**Response Headers**

- **X-Apify-Pagination-Offset**
- **X-Apify-Pagination-Limit**
- **X-Apify-Pagination-Count**
- **X-Apify-Pagination-Total**

- application/json

- Example
- Schema

```json
[\
  {\
    "myValue": "some value",\
    "myOtherValue": "some other value"\
  }\
]
```

**Schema**

object

### Status 400

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "run-failed",
    "message": "Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)"
  }
}
```

**Schema**

- **error** objectrequired





  - **type** stringrequired

    **Example:** `run-failed`
  - **message** stringrequired

    **Example:** `Actor run did not succeed (run ID: 55uatRrZib4xbZs, status: FAILED)`

### Status 408

**Response Headers**

- application/json

- Example
- Schema

```json
{
  "error": {
    "type": "run-timeout-exceeded",
    "message": "Actor run exceeded timeout of 300 seconds for this API endpoint"
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
curl -L 'https://api.apify.com/v2/acts/:actorId/run-sync-get-dataset-items' \
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

actorId — pathrequired

Show optional parameters

timeout — query

memory — query

maxItems — query

maxTotalChargeUsd — query

restartOnError — query

\-\-\-truefalse

build — query

webhooks — query

format — query

clean — query

\-\-\-truefalse

offset — query

limit — query

fields — query

omit — query

unwind — query

flatten — query

desc — query

\-\-\-truefalse

attachment — query

\-\-\-truefalse

delimiter — query

bom — query

\-\-\-truefalse

xmlRoot — query

xmlRow — query

skipHeaderRow — query

\-\-\-truefalse

skipHidden — query

\-\-\-truefalse

skipEmpty — query

\-\-\-truefalse

simplified — query

\-\-\-truefalse

skipFailedPages — query

\-\-\-truefalse

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