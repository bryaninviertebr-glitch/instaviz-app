---
title: Requests locks - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/storage-request-queues-requests-locks
---

[Skip to main content](https://docs.apify.com/api/v2/storage-request-queues-requests-locks#__docusaurus_skipToContent_fallback)

This section describes API endpoints to create, manage, and delete request locks within request queues.

Request queue is a storage for a queue of HTTP URLs to crawl, which is typically
used for deep crawling of websites where you
start with several URLs and then recursively follow links to other pages.
The storage supports both breadth-first and depth-first crawling orders.

For more information, see the [Request queue documentation](https://docs.apify.com/platform/storage/request-queue).

note

Some of the endpoints do not require the authentication token, the calls
are authenticated using the hard-to-guess ID of the queue.

[**Unlock requests**`/request-queues/{queueId}/requests/unlock`](https://docs.apify.com/api/v2/request-queue-requests-unlock-post)[**Get head**`/request-queues/{queueId}/head`](https://docs.apify.com/api/v2/request-queue-head-get)[**Get head and lock**`/request-queues/{queueId}/head/lock`](https://docs.apify.com/api/v2/request-queue-head-lock-post)[**Prolong request lock**`/request-queues/{queueId}/requests/{requestId}/lock`](https://docs.apify.com/api/v2/request-queue-request-lock-put)[**Delete request lock**`/request-queues/{queueId}/requests/{requestId}/lock`](https://docs.apify.com/api/v2/request-queue-request-lock-delete)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)