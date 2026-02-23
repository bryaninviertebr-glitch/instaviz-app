---
title: Request queues - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/storage-request-queues
---

[Skip to main content](https://docs.apify.com/api/v2/storage-request-queues#__docusaurus_skipToContent_fallback)

This section describes API endpoints to create, manage, and delete request queues.

Request queue is a storage for a queue of HTTP URLs to crawl, which is typically
used for deep crawling of websites where you
start with several URLs and then recursively follow links to other pages.
The storage supports both breadth-first and depth-first crawling orders.

For more information, see the [Request queue documentation](https://docs.apify.com/platform/storage/request-queue).

note

Some of the endpoints do not require the authentication token, the calls
are authenticated using the hard-to-guess ID of the queue.

[**Get list of request queues**`/request-queues`](https://docs.apify.com/api/v2/request-queues-get)[**Create request queue**`/request-queues`](https://docs.apify.com/api/v2/request-queues-post)[**Get request queue**`/request-queues/{queueId}`](https://docs.apify.com/api/v2/request-queue-get)[**Update request queue**`/request-queues/{queueId}`](https://docs.apify.com/api/v2/request-queue-put)[**Delete request queue**`/request-queues/{queueId}`](https://docs.apify.com/api/v2/request-queue-delete)[**Add requests**`/request-queues/{queueId}/requests/batch`](https://docs.apify.com/api/v2/request-queue-requests-batch-post)[**Delete requests**`/request-queues/{queueId}/requests/batch`](https://docs.apify.com/api/v2/request-queue-requests-batch-delete)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)