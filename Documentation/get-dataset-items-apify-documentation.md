---
title: Get dataset items | Apify Documentation
source: https://docs.apify.com/api/v2/dataset-items-get
---

[Skip to main content](https://docs.apify.com/api/v2/dataset-items-get#__docusaurus_skipToContent_fallback)

API Clients

[![JavaScript](https://docs.apify.com/img/javascript-40x40.svg)JavaScript](https://docs.apify.com/api/client/js/reference/class/DatasetClient#listItems) [![Python](https://docs.apify.com/img/python-40x40.svg)Python](https://docs.apify.com/api/client/python/reference/class/DatasetClientAsync#stream_items)

# Get dataset items

Copy for LLM

```
GET https://api.apify.com/v2/datasets/:datasetId/items
```

Returns data stored in the dataset in a desired format.

### Response format [Direct link to Response format](https://docs.apify.com/api/v2/dataset-items-get\#response-format)

The format of the response depends on `format` query parameter.

The `format` parameter can have one of the following values:
`json`, `jsonl`, `xml`, `html`,
`csv`, `xlsx` and `rss`.

The following table describes how each format is treated.

| Format | Items |
| --- | --- |
| `json` | The response is a JSON, JSONL or XML array of raw item objects. |
| `jsonl` |
| `xml` |
| `html` | The response is a HTML, CSV or XLSX table, where columns correspond to the<br>properties of the item and rows correspond to each dataset item. |
| `csv` |
| `xlsx` |
| `rss` | The response is a RSS file. Each item is displayed as child elements of one<br>`<item>`. |

Note that CSV, XLSX and HTML tables are limited to 2000 columns and the column names cannot be longer than 200 characters.
JSON, XML and RSS formats do not have such restrictions.

### Hidden fields [Direct link to Hidden fields](https://docs.apify.com/api/v2/dataset-items-get\#hidden-fields)

The top-level fields starting with the `#` character are considered hidden.
These are useful to store debugging information and can be omitted from the output by providing the `skipHidden=1` or `clean=1` query parameters.
For example, if you store the following object to the dataset:

```typescript
{
    productName: "iPhone Xs",
    description: "Welcome to the big screens."
    #debug: {
        url: "https://www.apple.com/lae/iphone-xs/",
        crawledAt: "2019-01-21T16:06:03.683Z"
    }
}
```

The `#debug` field will be considered as hidden and can be omitted from the
results. This is useful to
provide nice cleaned data to end users, while keeping debugging info
available if needed. The Dataset object
returned by the API contains the number of such clean items in the`dataset.cleanItemCount` property.

### XML format extension [Direct link to XML format extension](https://docs.apify.com/api/v2/dataset-items-get\#xml-format-extension)

When exporting results to XML or RSS formats, the names of object properties become XML tags and the corresponding values become tag's children. For example, the following JavaScript object:

```typescript
{
    name: "Paul Newman",
    address: [\
        { type: "home", street: "21st", city: "Chicago" },\
        { type: "office", street: null, city: null }\
    ]
}
```

will be transformed to the following XML snippet:

```typescript
<name>Paul Newman</name>
<address>
  <type>home</type>
  <street>21st</street>
  <city>Chicago</city>
</address>
<address>
  <type>office</type>
  <street/>
  <city/>
</address>
```

If the JavaScript object contains a property named `@` then its sub-properties are exported as attributes of the parent XML
element.
If the parent XML element does not have any child elements then its value is taken from a JavaScript object property named `#`.

For example, the following JavaScript object:

```typescript
{
  "address": [{\
    "@": {\
      "type": "home"\
    },\
    "street": "21st",\
    "city": "Chicago"\
  },\
  {\
    "@": {\
      "type": "office"\
    },\
    "#": 'unknown'\
  }]
}
```

will be transformed to the following XML snippet:

```typescript
<address type="home">
  <street>21st</street>
  <city>Chicago</city>
</address>
<address type="office">unknown</address>
```

This feature is also useful to customize your RSS feeds generated for various websites.

By default the whole result is wrapped in a `<items>` element and each page object is wrapped in a `<item>` element.
You can change this using `xmlRoot` and `xmlRow` url parameters.

### Pagination [Direct link to Pagination](https://docs.apify.com/api/v2/dataset-items-get\#pagination)

The generated response supports [pagination](https://docs.apify.com/api/v2/dataset-items-get#/introduction/pagination).
The pagination is always performed with the granularity of a single item, regardless whether `unwind` parameter was provided.
By default, the **Items** in the response are sorted by the time they were stored to the database, therefore you can use pagination to incrementally fetch the items as they are being added.
No limit exists to how many items can be returned in one response.

If you specify `desc=1` query parameter, the results are returned in the reverse order than they were stored (i.e. from newest to oldest items).
Note that only the order of **Items** is reversed, but not the order of the `unwind` array elements.

## Request [Direct link to request](https://docs.apify.com/api/v2/dataset-items-get\#request)

### Path Parameters

**datasetId** stringrequired

Dataset ID or `username~dataset-name`.

**Example:** `WkzbQMuFYuamGv3YF`

### Query Parameters

**format** string

Format of the results, possible values are: `json`, `jsonl`, `csv`, `html`, `xlsx`, `xml` and `rss`. The default value is `json`.

**Example:** `json`

**clean** boolean

If `true` or `1` then the API endpoint returns only non-empty items and skips hidden fields (i.e. fields starting with the # character).
The `clean` parameter is just a shortcut for `skipHidden=true` and `skipEmpty=true` parameters.
Note that since some objects might be skipped from the output, that the result might contain less items than the `limit` value.

**Example:** `false`

**offset** double

Number of items that should be skipped at the start. The default value is `0`.

**Example:** `0`

**limit** double

Maximum number of items to return. By default there is no limit.

**Example:** `99`

**fields** string

A comma-separated list of fields which should be picked from the items, only these fields will remain in the resulting record objects.
Note that the fields in the outputted items are sorted the same way as they are specified in the `fields` query parameter.
You can use this feature to effectively fix the output format.

**Example:** `myValue,myOtherValue`

**omit** string

A comma-separated list of fields which should be omitted from the items.

**Example:** `myValue,myOtherValue`

**unwind** string

A comma-separated list of fields which should be unwound, in order which they should be processed. Each field should be either an array or an object.
If the field is an array then every element of the array will become a separate record and merged with parent object.
If the unwound field is an object then it is merged with the parent object.
If the unwound field is missing or its value is neither an array nor an object and therefore cannot be merged with a parent object then the item gets preserved as it is.
Note that the unwound items ignore the `desc` parameter.

**Example:** `myValue,myOtherValue`

**flatten** string

A comma-separated list of fields which should transform nested objects into flat structures.

For example, with `flatten="foo"` the object `{"foo":{"bar": "hello"}}` is turned into `{"foo.bar": "hello"}`.

The original object with properties is replaced with the flattened object.

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
`format=csv` files are prefixed with the UTF-8 Byte Order Mark (BOM), while `json`, `jsonl`, `xml`, `html` and `rss` files are not.

If you want to override this default behavior, specify `bom=1` query parameter to include the BOM or `bom=0` to skip it.

**Example:** `false`

**xmlRoot** string

Overrides default root element name of `xml` output. By default the root element is `items`.

**Example:** `items`

**xmlRow** string

Overrides default element name that wraps each page or page function result object in `xml` output. By default the element name is `item`.

**Example:** `item`

**skipHeaderRow** boolean

If `true` or `1` then header row in the `csv` format is skipped.

**Example:** `true`

**skipHidden** boolean

If `true` or `1` then hidden fields are skipped from the output, i.e. fields starting with the `#` character.

**Example:** `false`

**skipEmpty** boolean

If `true` or `1` then empty items are skipped from the output.

Note that if used, the results might contain less items than the limit value.

**Example:** `false`

**simplified** boolean

If `true` or `1` then, the endpoint applies the `fields=url,pageFunctionResult,errorInfo`
and `unwind=pageFunctionResult` query parameters. This feature is used to emulate simplified results provided by the
legacy Apify Crawler product and it's not recommended to use it in new integrations.

**Example:** `false`

**view** string

Defines the view configuration for dataset items based on the schema definition.
This parameter determines how the data will be filtered and presented.
For complete specification details, see the [dataset schema documentation](https://docs.apify.com/platform/actors/development/actor-definition/dataset-schema).

**Example:** `overview`

**skipFailedPages** boolean

If `true` or `1` then, the all the items with errorInfo property will be skipped from the output.

This feature is here to emulate functionality of API version 1 used for the legacy Apify Crawler product and it's not recommended to use it in new integrations.

**Example:** `false`

**signature** string

Signature used to access the items.

**Example:** `2wTI46Bg8qWQrV7tavlPI`

## Responses [Direct link to Responses](https://docs.apify.com/api/v2/dataset-items-get\#responses)

- 200
- 400

### Status 200

**Response Headers**

- **X-Apify-Pagination-Offset**
- **X-Apify-Pagination-Limit**
- **X-Apify-Pagination-Count**
- **X-Apify-Pagination-Total**

- application/json
- application/jsonl
- text/csv
- text/html
- application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
- application/rss+xml
- application/xml

- Example (auto)
- Schema

```json
[\
  {\
    "foo": "bar"\
  },\
  {\
    "foo2": "bar2"\
  }\
]
```

**Schema**

object

- Example
- Schema

```shell
{"foo":"bar"}\n{"foo2":"bar2"}\n
```

**Schema**

- **string** string

- Example
- Schema

```shell
foo,bar\nfoo2,bar2\n
```

**Schema**

- **string** string

- Example
- Schema

```shell
<table><tr><th>foo</th><th>bar</th></tr><tr><td>foo</td><td>bar</td></tr><tr><td>foo2</td><td>bar2</td></tr></table>
```

**Schema**

- **string** string

- Example (auto)
- Schema

```json
"string"
```

**Schema**

- **string** string

- Example
- Schema

```xml
<rss><channel><item><foo>bar</foo></item><item><foo2>bar2</foo2></item></channel></rss>
```

**Schema**

- **string** string

- Example
- Schema

```xml
<items><item><foo>bar</foo></item><item><foo2>bar2</foo2></item></items>
```

**Schema**

- **string** string

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
curl -L 'https://api.apify.com/v2/datasets/:datasetId/items' \
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

datasetId — pathrequired

Show optional parameters

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

view — query

skipFailedPages — query

\-\-\-truefalse

signature — query

Send API Request

ResponseClear

Click the <code>Send API Request</code> button above and see the response here!

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)