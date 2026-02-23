---
title: Actor tasks - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/actor-tasks
---

[Skip to main content](https://docs.apify.com/api/v2/actor-tasks#__docusaurus_skipToContent_fallback)

The API endpoints described in this section enable you to create, manage, delete, and run Apify Actor tasks.
For more information, see the [Actor tasts documentation](https://docs.apify.com/platform/actors/running/tasks).

note

For all the API endpoints that accept the `actorTaskId` parameter to
specify a task, you can pass either the task ID (e.g. `HG7ML7M8z78YcAPEB`) or a tilde-separated
username of the task's owner and the task's name (e.g. `janedoe~my-task`).

Some of the API endpoints return run objects. If any such run object
contains usage in dollars, your effective unit pricing at the time of query
has been used for computation of this dollar equivalent, and hence it should be
used only for informative purposes.

You can learn more about platform usage in the [documentation](https://docs.apify.com/platform/actors/running/usage-and-resources#usage).

[**Get list of tasks**`/actor-tasks`](https://docs.apify.com/api/v2/actor-tasks-get)[**Create task**`/actor-tasks`](https://docs.apify.com/api/v2/actor-tasks-post)[**Get task**`/actor-tasks/{actorTaskId}`](https://docs.apify.com/api/v2/actor-task-get)[**Update task**`/actor-tasks/{actorTaskId}`](https://docs.apify.com/api/v2/actor-task-put)[**Delete task**`/actor-tasks/{actorTaskId}`](https://docs.apify.com/api/v2/actor-task-delete)[**Get task input**`/actor-tasks/{actorTaskId}/input`](https://docs.apify.com/api/v2/actor-task-input-get)[**Update task input**`/actor-tasks/{actorTaskId}/input`](https://docs.apify.com/api/v2/actor-task-input-put)[**Get list of webhooks**`/actor-tasks/{actorTaskId}/webhooks`](https://docs.apify.com/api/v2/actor-task-webhooks-get)[**Get list of task runs**`/actor-tasks/{actorTaskId}/runs`](https://docs.apify.com/api/v2/actor-task-runs-get)[**Run task**`/actor-tasks/{actorTaskId}/runs`](https://docs.apify.com/api/v2/actor-task-runs-post)[**Run task synchronously**`/actor-tasks/{actorTaskId}/run-sync`](https://docs.apify.com/api/v2/actor-task-run-sync-get)[**Run task synchronously**`/actor-tasks/{actorTaskId}/run-sync`](https://docs.apify.com/api/v2/actor-task-run-sync-post)[**Run task synchronously and get dataset items**`/actor-tasks/{actorTaskId}/run-sync-get-dataset-items`](https://docs.apify.com/api/v2/actor-task-run-sync-get-dataset-items-get)[**Run task synchronously and get dataset items**`/actor-tasks/{actorTaskId}/run-sync-get-dataset-items`](https://docs.apify.com/api/v2/actor-task-run-sync-get-dataset-items-post)[**Get last run**`/actor-tasks/{actorTaskId}/runs/last`](https://docs.apify.com/api/v2/actor-task-runs-last-get)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)