---
title: Key-value stores - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/storage-key-value-stores
---

[Skip to main content](https://docs.apify.com/api/v2/storage-key-value-stores#__docusaurus_skipToContent_fallback)

This section describes API endpoints to manage Key-value stores.
Key-value store is a simple storage for saving and reading data records or files.
Each data record is represented by a unique key and associated with a MIME content type.
Key-value stores are ideal for saving screenshots, Actor inputs and outputs, web pages,
PDFs or to persist the state of crawlers.

For more information, see the [Key-value store documentation](https://docs.apify.com/platform/storage/key-value-store).

note

Some of the endpoints do not require the authentication token, the calls
are authenticated using a hard-to-guess ID of the key-value store.

[**Get list of key-value stores**`/key-value-stores`](https://docs.apify.com/api/v2/key-value-stores-get)[**Create key-value store**`/key-value-stores`](https://docs.apify.com/api/v2/key-value-stores-post)[**Get store**`/key-value-stores/{storeId}`](https://docs.apify.com/api/v2/key-value-store-get)[**Update store**`/key-value-stores/{storeId}`](https://docs.apify.com/api/v2/key-value-store-put)[**Delete store**`/key-value-stores/{storeId}`](https://docs.apify.com/api/v2/key-value-store-delete)[**Get list of keys**`/key-value-stores/{storeId}/keys`](https://docs.apify.com/api/v2/key-value-store-keys-get)[**Get record**`/key-value-stores/{storeId}/records/{recordKey}`](https://docs.apify.com/api/v2/key-value-store-record-get)[**Check if a record exists**`/key-value-stores/{storeId}/records/{recordKey}`](https://docs.apify.com/api/v2/key-value-store-record-head)[**Store record**`/key-value-stores/{storeId}/records/{recordKey}`](https://docs.apify.com/api/v2/key-value-store-record-put)[**Delete record**`/key-value-stores/{storeId}/records/{recordKey}`](https://docs.apify.com/api/v2/key-value-store-record-delete)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)