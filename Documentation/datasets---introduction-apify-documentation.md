---
title: Datasets - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/storage-datasets
---

[Skip to main content](https://docs.apify.com/api/v2/storage-datasets#__docusaurus_skipToContent_fallback)

This section describes API endpoints to manage Datasets.

Dataset is a storage for structured data, where each record stored has the same attributes,
such as online store products or real estate offers. You can imagine it as a table,
where each object is a row and its attributes are columns. Dataset is an append-only
storage - you can only add new records to it but you cannot modify or remove existing
records. Typically it is used to store crawling results.

For more information, see the [Datasets documentation](https://docs.apify.com/platform/storage/dataset).

note

Some of the endpoints do not require the authentication token, the calls
are authenticated using the hard-to-guess ID of the dataset.

[**Get list of datasets**`/datasets`](https://docs.apify.com/api/v2/datasets-get)[**Create dataset**`/datasets`](https://docs.apify.com/api/v2/datasets-post)[**Get dataset**`/datasets/{datasetId}`](https://docs.apify.com/api/v2/dataset-get)[**Update dataset**`/datasets/{datasetId}`](https://docs.apify.com/api/v2/dataset-put)[**Delete dataset**`/datasets/{datasetId}`](https://docs.apify.com/api/v2/dataset-delete)[**Get dataset items**`/datasets/{datasetId}/items`](https://docs.apify.com/api/v2/dataset-items-get)[**Store items**`/datasets/{datasetId}/items`](https://docs.apify.com/api/v2/dataset-items-post)[**Get dataset statistics**`/datasets/{datasetId}/statistics`](https://docs.apify.com/api/v2/dataset-statistics-get)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)