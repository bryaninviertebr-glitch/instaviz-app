---
title: Actor versions - Introduction | Apify Documentation
source: https://docs.apify.com/api/v2/actors-actor-versions
---

[Skip to main content](https://docs.apify.com/api/v2/actors-actor-versions#__docusaurus_skipToContent_fallback)

The API endpoints in this section allow you to manage your Apify Actors versions.

- The version object contains the source code of a specific version of an Actor.
- The `sourceType` property indicates where the source code is hosted, and based
on its value the Version object has the following additional property:

| **Value** | **Description** |
| --- | --- |
| `"SOURCE_FILES"` | Source code is comprised of multiple files specified in the `sourceFiles` array. Each item of the array is an object with the following fields:<br> \- `name`: File path and name<br> \- `format`: Format of the content, can be either `"TEXT"` or `"BASE64"`<br> \- `content`: File content<br>Source files can be shown and edited in the Apify Console's Web IDE. |
| `"GIT_REPO"` | Source code is cloned from a Git repository, whose URL is specified in the `gitRepoUrl` field. |
| `"TARBALL"` | Source code is downloaded using a tarball or Zip file from a URL specified in the `tarballUrl` field. |
| `"GITHUB_GIST"` | Source code is taken from a GitHub Gist, whose URL is specified in the `gitHubGistUrl` field. |

For more information about source code and Actor versions, check out [Source code](https://docs.apify.com/platform/actors/development/actor-definition/source-code)
in Actors documentation.

[**Get list of versions**`/acts/{actorId}/versions`](https://docs.apify.com/api/v2/act-versions-get)[**Create version**`/acts/{actorId}/versions`](https://docs.apify.com/api/v2/act-versions-post)[**Get version**`/acts/{actorId}/versions/{versionNumber}`](https://docs.apify.com/api/v2/act-version-get)[**Update version**`/acts/{actorId}/versions/{versionNumber}`](https://docs.apify.com/api/v2/act-version-put)[**Delete version**`/acts/{actorId}/versions/{versionNumber}`](https://docs.apify.com/api/v2/act-version-delete)[**Get list of environment variables**`/acts/{actorId}/versions/{versionNumber}/env-vars`](https://docs.apify.com/api/v2/act-version-env-vars-get)[**Create environment variable**`/acts/{actorId}/versions/{versionNumber}/env-vars`](https://docs.apify.com/api/v2/act-version-env-vars-post)[**Get environment variable**`/acts/{actorId}/versions/{versionNumber}/env-vars/{envVarName}`](https://docs.apify.com/api/v2/act-version-env-var-get)[**Update environment variable**`/acts/{actorId}/versions/{versionNumber}/env-vars/{envVarName}`](https://docs.apify.com/api/v2/act-version-env-var-put)[**Delete environment variable**`/acts/{actorId}/versions/{versionNumber}/env-vars/{envVarName}`](https://docs.apify.com/api/v2/act-version-env-var-delete)

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)